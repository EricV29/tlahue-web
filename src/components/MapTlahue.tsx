import { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import IconChevronDown from "./icons/IconChevronDown";
import IconReset from "./icons/IconReset";
import modelos3D from "../data/modelos3D.json";
import {
  INITIAL_CENTER,
  INITIAL_ZOOM,
  INITIAL_PITCH,
  INITIAL_BEARING,
  MOBILE_INITIAL_ZOOM,
  MOBILE_ZOOM_OFFSET,
  TERRITORIO_ZOOM,
  TERRITORIO_PITCH,
  TLAHUE_BOUNDS,
  mainCoords,
  createTransform,
  catalogoColonias,
} from "./map/constants";
import { create3DLabel } from "./map/createLabel3D";
import { createModelCardPopup } from "./map/createModelCard";
import {
  mercatorToScenePosition,
  prepareModel,
  raycastFromMouse,
  getLightsConfig,
} from "./map/scene";

function MapTlahue() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const isMobile = window.innerWidth < 768;
  const [center] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom] = useState(isMobile ? MOBILE_INITIAL_ZOOM : INITIAL_ZOOM);
  const [pitch] = useState(INITIAL_PITCH);
  const [bearing] = useState(INITIAL_BEARING);
  const [showTerritorio, setShowTerritorio] = useState(false);
  const cardActiveRef = useRef<string | null>(null);
  const fbScene = useRef<THREE.Scene | null>(null);
  const fbCamera = useRef<THREE.Camera | null>(null);
  const fbRenderer = useRef<THREE.WebGLRenderer | null>(null);
  const fbAmbientLight = useRef<THREE.AmbientLight | null>(null);
  const fbDirectionalLight = useRef<THREE.DirectionalLight | null>(null);
  const fbSpotLight = useRef<THREE.SpotLight | null>(null);
  const [back, setBack] = useState("#fff");
  const [title, setTitle] = useState("text-dark-charcoal");
  const [selectedColoniaId, setSelectedColoniaId] = useState("");
  const [selectedModeloId, setSelectedModeloId] = useState("");
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const fbLabelRenderer = useRef<CSS2DRenderer | null>(null);

  const lastMatrixRef = useRef<THREE.Matrix4 | null>(null);
  const modelosRef = useRef<
    {
      id: string;
      mesh: THREE.Object3D;
      coords: [number, number];
      zoom: number;
      zoomMobile: number;
      bearing?: number;
      zoomCardMin?: number;
      zoomCardMinMobile?: number;
      card?: CSS2DObject;
    }[]
  >([]);
  const modelData = modelos3D.find((m) => m.id === "1");
  if (!modelData) return;

  //* MAPBOX Y TRHEEJS
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: center,
      zoom: zoom,
      pitch: pitch,
      bearing: bearing,
      style: import.meta.env.VITE_MAPBOX_STYLE,
      maxBounds: TLAHUE_BOUNDS,
    });

    mapRef.current = map;

    // Redimension de eiquetas
    mapRef.current.on("resize", () => {
      if (fbLabelRenderer.current && mapRef.current) {
        fbLabelRenderer.current.setSize(
          mapRef.current.getCanvas().clientWidth,
          mapRef.current.getCanvas().clientHeight,
        );
      }
    });

    // Cambio de cursor a pointer cuando pasa sobre un modelo
    mapRef.current.on("mousemove", (e) => {
      if (!lastMatrixRef.current || !fbScene.current) return;
      if (mapRef.current!.getZoom() < 15) return;

      const canvas = mapRef.current!.getCanvas();
      const intersects = raycastFromMouse(
        e.point,
        canvas,
        lastMatrixRef.current,
        modelosRef.current.map((m) => m.mesh),
      );

      canvas.style.cursor = intersects.length > 0 ? "pointer" : "";
    });

    // Manejo de clic sobre los modelos
    mapRef.current.on("click", (e) => {
      if (!lastMatrixRef.current || !fbScene.current) return;
      if (mapRef.current!.getZoom() < 15) return;

      const canvas = mapRef.current!.getCanvas();
      const intersects = raycastFromMouse(
        e.point,
        canvas,
        lastMatrixRef.current,
        modelosRef.current.map((m) => m.mesh),
      );

      if (intersects.length > 0) {
        let obj = intersects[0].object;
        while (obj.parent && obj.parent !== fbScene.current) {
          obj = obj.parent;
        }

        const modelo = modelosRef.current.find((m) => m.mesh === obj);
        if (modelo) {
          modelosRef.current.forEach((m) => {
            if (m.card) m.card.visible = false;
          });

          hideAllTerritories();
          setSelectedColoniaId("");
          setSelectedModeloId(modelo.id);

          mapRef.current?.flyTo({
            center: modelo.coords,
            zoom: isMobile ? modelo.zoomMobile : modelo.zoom,
            pitch: 60,
            bearing: modelo.bearing ?? 0,
            essential: true,
            duration: 1200,
          });

          cardActiveRef.current = modelo.id;
        }
      }
    });

    // Cargar capas MAPBOX y TRHEE
    mapRef.current.on("style.load", () => {
      // Agregar fuente de datos vectoriales
      mapRef.current!.addSource("composite", {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      });

      // Agregar capa de edificos 3D automaticos
      mapRef.current!.addLayer({
        id: "mis-edificios-3d",
        type: "fill-extrusion",
        source: "composite",
        "source-layer": "building",
        minzoom: 15,
        slot: "middle",
        paint: {
          "fill-extrusion-color": "#f3ede4",
          "fill-extrusion-height": ["coalesce", ["get", "height"], 10],
          "fill-extrusion-base": ["coalesce", ["get", "min_height"], 0],
          "fill-extrusion-opacity": 0.95,
        },
      });

      //* OCULTAR OBJETOS MEDIANTE ID
      const hiddenBuildings = [
        1001910979, 550913002, 363840435055045, 348763145096935,
        2255831451438105, 2492612038534085, 550916224,
      ];

      mapRef.current?.setFilter("mis-edificios-3d", [
        "match",
        ["id"],
        hiddenBuildings,
        false,
        true,
      ]);

      //* ILUMICACIÓN DINAMICA
      const currentHour = new Date().getHours();
      let lightPreset = "day";

      if (currentHour >= 5 && currentHour < 10) {
        lightPreset = "dawn";
        setBack("bg-[#f2d4b3]");
        setTitle("text-dark-charcoal");
      } else if (currentHour >= 10 && currentHour < 17) {
        lightPreset = "day";
        setBack("bg-[#f0eadd]");
        setTitle("text-dark-charcoal");
      } else if (currentHour >= 17 && currentHour < 19) {
        lightPreset = "dusk";
        setBack("bg-[#4a434f]");
        setTitle("text-white");
      } else {
        lightPreset = "night";
        setBack("bg-[#262833]");
        setTitle("text-white");
      }

      const threeLightsConfig = getLightsConfig(lightPreset);

      mapRef.current!.setConfigProperty("basemap", "lightPreset", lightPreset);

      //* POLIGONO MUNICIPIO
      mapRef.current!.addSource("tlahue-data", {
        type: "geojson",
        data: catalogoColonias[0].data,
      });
      mapRef.current!.addLayer({
        id: "tlahue-fill",
        type: "fill",
        source: "tlahue-data",
        layout: {
          visibility: "none",
        },
        paint: {
          "fill-color": "#3A85AC",
          "fill-opacity": 0.15,
        },
      });
      mapRef.current!.addLayer({
        id: "tlahue-line",
        type: "line",
        source: "tlahue-data",
        layout: {
          visibility: "none",
        },
        paint: {
          "line-color": "#111827",
          "line-width": 2,
        },
      });

      //* CAPA THREE.JS
      const customLayer: mapboxgl.CustomLayerInterface = {
        id: "objeto-3d-tlahue",
        type: "custom",
        renderingMode: "3d",
        slot: "top",
        onAdd: function (map, gl) {
          fbCamera.current = new THREE.Camera();
          fbScene.current = new THREE.Scene();

          //* LUCES
          fbAmbientLight.current = new THREE.AmbientLight(
            threeLightsConfig.ambientColor,
            threeLightsConfig.ambientIntensity,
          );
          fbScene.current.add(fbAmbientLight.current);

          fbDirectionalLight.current = new THREE.DirectionalLight(
            threeLightsConfig.directionalColor,
            threeLightsConfig.directionalIntensity,
          );
          fbDirectionalLight.current.position.set(-40, -50, 80);
          fbScene.current.add(fbDirectionalLight.current);

          fbSpotLight.current = new THREE.SpotLight(
            0xffffff,
            threeLightsConfig.spotIntensity,
          );
          fbSpotLight.current.position.set(-500, -150, 300);
          fbSpotLight.current.castShadow = true;
          fbSpotLight.current.shadow.camera.near = 1;
          fbSpotLight.current.shadow.camera.far = 800;
          fbSpotLight.current.shadow.focus = 1;
          fbSpotLight.current.shadow.mapSize.width = 4096;
          fbSpotLight.current.shadow.mapSize.height = 4096;
          fbSpotLight.current.shadow.bias = -0.0001;
          fbSpotLight.current.angle = Math.PI / 2.5;
          fbSpotLight.current.penumbra = 0.6;
          fbSpotLight.current.distance = 900;
          fbSpotLight.current.decay = 1.5;
          fbScene.current.add(fbSpotLight.current);

          //* PLANO SOMBRAS
          const shadowPlane = new THREE.Mesh(
            new THREE.PlaneGeometry(2000, 2000),
            new THREE.ShadowMaterial({
              opacity: 0.45,
            }),
          );
          shadowPlane.receiveShadow = true;
          shadowPlane.position.z = -0.001;
          shadowPlane.rotation.x = 0;
          fbScene.current.add(shadowPlane);

          //* CARGAR MODELOS
          const loader = new GLTFLoader();
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("/draco/");
          loader.setDRACOLoader(dracoLoader);

          //* TARGET SPOTLIGHT
          const lightTarget = new THREE.Object3D();
          lightTarget.position.set(0, 0, 0);
          fbScene.current.add(lightTarget);
          fbSpotLight.current.target = lightTarget;

          //* RENDERER DE ETIQUETAS HTML
          fbLabelRenderer.current = new CSS2DRenderer();
          fbLabelRenderer.current.setSize(
            map.getCanvas().clientWidth,
            map.getCanvas().clientHeight,
          );
          fbLabelRenderer.current.domElement.style.position = "absolute";
          fbLabelRenderer.current.domElement.style.top = "0px";
          fbLabelRenderer.current.domElement.style.zIndex = "2";
          fbLabelRenderer.current.domElement.style.pointerEvents = "none";
          map
            .getCanvasContainer()
            .appendChild(fbLabelRenderer.current.domElement);

          //* CARGAR MODELOS
          modelos3D.forEach((modelData) => {
            loader.load(
              modelData.glb,
              (gltf) => {
                const model = gltf.scene;
                prepareModel(model);

                model.scale.set(
                  ...(modelData.scale as [number, number, number]),
                );
                model.rotation.x = modelData.rotation[0];
                model.rotation.y = modelData.rotation[1];
                model.rotation.z = modelData.rotation[2];
                model.position.copy(
                  mercatorToScenePosition(
                    createTransform([modelData.coords[0], modelData.coords[1]]),
                  ),
                );

                fbScene.current?.add(model);

                const etiqueta = create3DLabel(modelData.name, modelData.icon);
                etiqueta.position.set(
                  modelData.labelOffset[0],
                  modelData.labelOffset[1],
                  modelData.labelOffset[2],
                );
                model.add(etiqueta);

                const cardPopup = createModelCardPopup(modelData, () => {
                  cardPopup.visible = false;
                  cardActiveRef.current = null;
                });
                const offset = isMobile
                  ? (modelData.cardOffsetMobile ?? modelData.cardOffset)
                  : modelData.cardOffset;
                cardPopup.position.set(offset[0], offset[1], offset[2]);
                cardPopup.visible = false;
                model.add(cardPopup);

                modelosRef.current.push({
                  id: modelData.id,
                  mesh: model,
                  coords: modelData.coords as [number, number],
                  zoom: modelData.zoomCard,
                  zoomMobile: modelData.zoomCardMobile ?? modelData.zoomCard,
                  zoomCardMin: modelData.zoomCardMin,
                  zoomCardMinMobile: modelData.zoomCardMinMobile ?? modelData.zoomCardMin,
                  bearing: modelData.bearing,
                  card: cardPopup,
                });

                if (mapRef.current) mapRef.current.triggerRepaint();
              },
              undefined,
              (error) =>
                console.error(`Error cargando ${modelData.id}:`, error),
            );
          });

          //* TERRITORIOS
          catalogoColonias.forEach((colonia) => {
            if (colonia.id === "municipio") return;

            const sourceId = `source-${colonia.id}`;
            const fillLayerId = `layer-${colonia.id}`;
            const lineLayerId = `line-${colonia.id}`;

            mapRef.current!.addSource(sourceId, {
              type: "geojson",
              data: colonia.data,
            });

            mapRef.current!.addLayer({
              id: fillLayerId,
              type: "fill",
              source: sourceId,
              layout: { visibility: "none" },
              paint: {
                "fill-color": "#3A85AC",
                "fill-opacity": 0.15,
              },
            });

            mapRef.current!.addLayer({
              id: lineLayerId,
              type: "line",
              source: sourceId,
              layout: { visibility: "none" },
              paint: {
                "line-color": "#111827",
                "line-width": 4,
              },
            });
          });

          //* MOTOR GRAFICO TRHEE PARA MAPBOX
          fbRenderer.current = new THREE.WebGLRenderer({
            canvas: map.getCanvas(),
            context: gl,
            antialias: true,
          });

          fbRenderer.current.toneMapping = THREE.ACESFilmicToneMapping;
          fbRenderer.current.toneMappingExposure = threeLightsConfig.exposure;
          fbRenderer.current.autoClear = false;
          fbRenderer.current.shadowMap.enabled = true;
          fbRenderer.current.shadowMap.type = THREE.PCFSoftShadowMap;
        },
        render: function (_gl: WebGL2RenderingContext, matrix) {
          if (!fbCamera.current || !fbScene.current || !fbRenderer.current)
            return;

          const rotationX = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(1, 0, 0),
            0,
          );
          const rotationY = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 1, 0),
            0,
          );
          const rotationZ = new THREE.Matrix4().makeRotationAxis(
            new THREE.Vector3(0, 0, 1),
            0,
          );

          const m = new THREE.Matrix4().fromArray(matrix);
          const l = new THREE.Matrix4()
            .makeTranslation(
              mainCoords.translateX,
              mainCoords.translateY,
              mainCoords.translateZ,
            )
            .scale(
              new THREE.Vector3(
                mainCoords.scale,
                -mainCoords.scale,
                mainCoords.scale,
              ),
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          const combined = m.multiply(l);

          lastMatrixRef.current = combined.clone();
          fbCamera.current.projectionMatrix = combined;
          fbCamera.current.projectionMatrixInverse
            .copy(fbCamera.current.projectionMatrix)
            .invert();

          fbRenderer.current.resetState();
          fbRenderer.current.render(fbScene.current, fbCamera.current);

          if (fbLabelRenderer.current) {
            const zoom = mapRef.current?.getZoom() ?? 0;
            const ZOOM_MIN_ETIQUETAS = 16;

            fbScene.current.traverse((obj) => {
              if (obj instanceof CSS2DObject) {
                const el = obj.element as HTMLElement;

                if (el.classList.contains("model-card")) {
                  const modelo = modelosRef.current.find((m) => m.card === obj);

                  const ZOOM_CARD_MIN = isMobile
                    ? (modelo?.zoomCardMinMobile ?? modelo?.zoomCardMin ?? 20)
                    : (modelo?.zoomCardMin ?? 20);
                  const wasVisible = obj.visible;
                  const isActive = cardActiveRef.current === modelo?.id;
                  obj.visible = isActive && zoom >= ZOOM_CARD_MIN;
                  if (wasVisible && zoom < ZOOM_CARD_MIN)
                    cardActiveRef.current = null;

                  if (obj.visible) {
                    const cardScale = Math.max(
                      0.4,
                      Math.min(1.0, (zoom - 16) * 0.25),
                    );
                    el.style.transform = `scale(${cardScale})`;
                    el.style.transformOrigin = "center center";
                  }
                  return;
                }

                obj.visible = zoom >= ZOOM_MIN_ETIQUETAS;

                if (obj.element) {
                  const scale = Math.max(
                    0.5,
                    Math.min(1.0, (zoom - 15.5) * 0.6),
                  );
                  (obj.element as HTMLElement).style.transform =
                    `scale(${scale})`;
                  (obj.element as HTMLElement).style.transformOrigin =
                    "center bottom";
                }
              }
            });

            fbLabelRenderer.current.render(fbScene.current, fbCamera.current);
          }
        },
      };

      mapRef.current!.addLayer(customLayer);
    });

    return () => {
      if (mapRef.current) {
        markersRef.current.forEach((marker) => marker.remove());
        markersRef.current = [];

        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, pitch, bearing]);

  //* TERRITORIOS
  useEffect(() => {
    if (!mapRef.current) return;
    if (
      !mapRef.current.isStyleLoaded() ||
      !mapRef.current.getLayer("tlahue-fill")
    )
      return;

    const visibility = showTerritorio ? "visible" : "none";
    mapRef.current.setLayoutProperty("tlahue-fill", "visibility", visibility);
    mapRef.current.setLayoutProperty("tlahue-line", "visibility", visibility);
  }, [showTerritorio]);

  const hideAllTerritories = useCallback(() => {
    if (!mapRef.current) return;
    catalogoColonias.forEach((c) => {
      if (c.id === "municipio") return;
      try {
        mapRef.current!.setLayoutProperty(`layer-${c.id}`, "visibility", "none");
        mapRef.current!.setLayoutProperty(`line-${c.id}`, "visibility", "none");
      } catch {
        // layer may not exist yet
      }
    });
    try {
      mapRef.current.setLayoutProperty("tlahue-fill", "visibility", "none");
      mapRef.current.setLayoutProperty("tlahue-line", "visibility", "none");
    } catch {
      // layer may not exist yet
    }
    setShowTerritorio(false);
  }, []);

  // Boton Reset view
  const handleResetClick = () => {
    if (!mapRef.current) return;

    hideAllTerritories();
    setSelectedColoniaId("");
    setSelectedModeloId("");

    mapRef.current.flyTo({
      center: INITIAL_CENTER,
      zoom: isMobile ? MOBILE_INITIAL_ZOOM : INITIAL_ZOOM,
      pitch: INITIAL_PITCH,
      bearing: INITIAL_BEARING,
      essential: true,
      duration: 1500,
    });
  };

  // Handle select territorio
  const handleTerritorioChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!mapRef.current) return;

    const newColoniaId = event.target.value;
    const targetColonia = catalogoColonias.find((c) => c.id === newColoniaId);
    if (!targetColonia) return;

    setSelectedColoniaId(newColoniaId);

    catalogoColonias.forEach((c) => {
      if (c.id === "municipio") return;
      mapRef.current!.setLayoutProperty(`layer-${c.id}`, "visibility", "none");
      mapRef.current!.setLayoutProperty(`line-${c.id}`, "visibility", "none");
    });
    mapRef.current.setLayoutProperty("tlahue-fill", "visibility", "none");
    mapRef.current.setLayoutProperty("tlahue-line", "visibility", "none");

    if (newColoniaId === "municipio") {
      mapRef.current.setLayoutProperty("tlahue-fill", "visibility", "visible");
      mapRef.current.setLayoutProperty("tlahue-line", "visibility", "visible");
      setShowTerritorio(true);

      mapRef.current.flyTo({
        center: targetColonia.center,
        zoom: isMobile ? TERRITORIO_ZOOM + MOBILE_ZOOM_OFFSET : TERRITORIO_ZOOM,
        pitch: TERRITORIO_PITCH,
        bearing: 0,
        essential: true,
        duration: 1500,
      });
    } else {
      setShowTerritorio(false);
      mapRef.current.setLayoutProperty(
        `layer-${newColoniaId}`,
        "visibility",
        "visible",
      );
      mapRef.current.setLayoutProperty(
        `line-${newColoniaId}`,
        "visibility",
        "visible",
      );
      mapRef.current.flyTo({
        center: targetColonia.center,
        zoom: isMobile
          ? targetColonia.zoom + MOBILE_ZOOM_OFFSET
          : targetColonia.zoom,
        pitch: 0,
        bearing: 0,
        essential: true,
        duration: 1500,
      });
    }
  };

  // Handle select modelo 3D
  const handleModeloChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    if (!mapRef.current) return;

    const newModeloId = event.target.value;
    const targetModelo = modelos3D.find((m) => m.id === newModeloId);
    if (!targetModelo) return;

    setSelectedModeloId(newModeloId);
    setSelectedColoniaId("");

    hideAllTerritories();

    modelosRef.current.forEach((m) => {
      if (m.card) m.card.visible = false;
    });

    const modelo = modelosRef.current.find((m) => m.id === newModeloId);
    if (modelo) {
      cardActiveRef.current = modelo.id;
    }

    const zoom = isMobile
      ? (targetModelo.zoomCardMobile ?? targetModelo.zoomCard)
      : targetModelo.zoomCard;

    mapRef.current.flyTo({
      center: targetModelo.coords as [number, number],
      zoom,
      pitch: 60,
      bearing: targetModelo.bearing ?? 0,
      essential: true,
      duration: 1200,
    });
  };

  return (
    <section
      aria-label="Mapa"
      className={`w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center py-12 md:py-20 ${back} `}
    >
      <div
        id="mapa"
        className="text-center mb-8 flex flex-col items-center gap-1.5"
      >
        <span className="text-[11px] font-mono tracking-wider uppercase text-tlahu-gold bg-tlahu-gold/10 px-2.5 py-0.5 rounded border border-tlahu-gold/20">
          mapa municipal
        </span>
        <h2
          className={`font-display font-light text-2xl md:text-[40px] ${title} tracking-[-0.0200em] leading-[1.1]`}
        >
          Visitanos
        </h2>
      </div>
      {/* Selects solo en Mobile */}
      <div className="w-full max-w-6xl flex md:hidden flex-wrap gap-3 mb-4 px-4">
        <div className="relative flex-1 min-w-0">
          <select
            className="appearance-none w-full px-3 py-2 pr-8 text-sm bg-white text-dark-charcoal font-semibold rounded-md shadow-lg cursor-pointer border-none focus:outline-none focus:ring-0 transition-colors hover:bg-gray-50 truncate"
            value={selectedColoniaId}
            onChange={handleTerritorioChange}
          >
            <option value="" disabled>
              Territorios
            </option>
            {catalogoColonias.map((colonia) => (
              <option
                key={colonia.id}
                value={colonia.id}
                className="text-dark-charcoal"
              >
                {colonia.id === "municipio"
                  ? "Tlahuelilpan"
                  : `${colonia.nombre} (CP ${colonia.cp})`}
              </option>
            ))}
          </select>
          <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-white pl-1 pointer-events-none">
            <IconChevronDown className="text-dark-charcoal w-3 h-3" />
          </span>
        </div>

        <div className="relative flex-1 min-w-0">
          <select
            id="modelosSelect"
            className="appearance-none w-full px-3 py-2 pr-8 text-sm bg-white text-dark-charcoal font-semibold rounded-md shadow-lg cursor-pointer border-none focus:outline-none focus:ring-0 transition-colors hover:bg-gray-50 truncate"
            value={selectedModeloId}
            onChange={handleModeloChange}
          >
            <option value="" disabled>
              Monumentos 3D
            </option>
            {modelos3D.map((modelo) => (
              <option
                key={modelo.id}
                value={modelo.id}
                className="text-dark-charcoal"
              >
                {modelo.name}
              </option>
            ))}
          </select>
          <span className="absolute top-1/2 -translate-y-1/2 right-3 bg-white pl-1 pointer-events-none">
            <IconChevronDown className="text-dark-charcoal w-3 h-3" />
          </span>
        </div>
      </div>
      <div className="relative w-full max-w-6xl h-[65vh] md:h-150 rounded-xl shadow-2xl overflow-hidden">
        {/* Controles dentro del mapa: Desktop: territorios + reset | Mobile: solo reset */}
        <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20 flex flex-row items-center gap-2">
          {/* Selects solo en Desktop */}
          <div className="relative hidden md:block">
            <select
              className="appearance-none px-4 py-2.5 pr-10 text-base min-w-44 bg-white text-dark-charcoal font-bold rounded-md shadow-lg cursor-pointer border-none focus:outline-none focus:ring-0 transition-colors hover:bg-gray-50 truncate"
              value={selectedColoniaId}
              onChange={handleTerritorioChange}
            >
              <option value="" disabled>
                Territorios
              </option>
              {catalogoColonias.map((colonia) => (
                <option
                  key={colonia.id}
                  value={colonia.id}
                  className="text-dark-charcoal"
                >
                  {colonia.id === "municipio"
                    ? "Tlahuelilpan"
                    : `${colonia.nombre} (CP ${colonia.cp})`}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-white pl-1 pointer-events-none">
              <IconChevronDown className="text-dark-charcoal w-4 h-4" />
            </span>
          </div>

          {/* Select Modelos solo en Desktop */}
          <div className="relative hidden md:block">
            <select
              className="appearance-none px-4 py-2.5 pr-10 text-base min-w-44 bg-white text-dark-charcoal font-bold rounded-md shadow-lg cursor-pointer border-none focus:outline-none focus:ring-0 transition-colors hover:bg-gray-50 truncate"
              value={selectedModeloId}
              onChange={handleModeloChange}
            >
              <option value="" disabled>
                Monumentos 3D
              </option>
              {modelos3D.map((modelo) => (
                <option
                  key={modelo.id}
                  value={modelo.id}
                  className="text-dark-charcoal"
                >
                  {modelo.name}
                </option>
              ))}
            </select>
            <span className="absolute top-1/2 -translate-y-1/2 right-4 bg-white pl-1 pointer-events-none">
              <IconChevronDown className="text-dark-charcoal w-4 h-4" />
            </span>
          </div>

          <button
            onClick={handleResetClick}
            className="px-2 py-1.5 md:px-3 md:py-2.5 bg-white text-dark-charcoal rounded-md shadow-lg cursor-pointer hover:bg-gray-50 focus:outline-none transition-colors"
          >
            <IconReset className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </div>

        {/* Mapa */}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </section>
  );
}

export default MapTlahue;
