import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import poligonoTlahuelilpan from "./tlahuelilpan.json";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// Vista MAPA 3D mapbox
const INITIAL_CENTER: [number, number] = [-99.2333, 20.1325];
const INITIAL_ZOOM = 15.93;
const INITIAL_PITCH = 59;
const INITIAL_BEARING = 0;

// Vista "2D" territorio mapbox
const TERRITORIO_ZOOM = 12;
const TERRITORIO_PITCH = 0;

// Limitación de mapa mapbox
const TLAHUE_BOUNDS: [[number, number], [number, number]] = [
  [-99.3, 20.08],
  [-99.15, 20.18],
];

// Coordenadas TRHEE - Reloj
const relojTransform = createTransform([-99.232346, 20.131354]);

//  Coordenadas TRHEE - Iglesia Vieja
const iglesiaVTransform = createTransform([-99.232775, 20.131755]);

//  Coordenadas TRHEE - Iglesia Nueva
const iglesiaNTransform = createTransform([-99.233566, 20.132749]);

//  Coordenadas TRHEE - Casa cultura
const casaculturaTransform = createTransform([-99.23509, 20.130639]);

//  Coordenadas TRHEE - Presidencia Municipal
const presidenciaTransform = createTransform([-99.234655, 20.130599]);

//  Coordenadas TRHEE - Jarron
const jarronTransform = createTransform([-99.234274, 20.13148]);

//  Coordenadas TRHEE - Toril
const torilTransform = createTransform([-99.236034, 20.130934]);

//* HELPER para coordenadas de modelos
function createTransform(coords: [number, number], altitude = 0) {
  const mercator = mapboxgl.MercatorCoordinate.fromLngLat(coords, altitude);

  return {
    translateX: mercator.x,
    translateY: mercator.y,
    translateZ: mercator.z,
    scale: mercator.meterInMercatorCoordinateUnits(),
  };
}

function MapTlahue() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [center] = useState(INITIAL_CENTER);
  const [zoom] = useState(INITIAL_ZOOM);
  const [pitch] = useState(INITIAL_PITCH);
  const [bearing] = useState(INITIAL_BEARING);
  const [showTerritorio, setShowTerritorio] = useState(false);
  const fbScene = useRef<THREE.Scene | null>(null);
  const fbCamera = useRef<THREE.Camera | null>(null);
  const fbRenderer = useRef<THREE.WebGLRenderer | null>(null);
  const fbAmbientLight = useRef<THREE.AmbientLight | null>(null);
  const fbDirectionalLight = useRef<THREE.DirectionalLight | null>(null);
  const fbSpotLight = useRef<THREE.SpotLight | null>(null);
  const [back, setBack] = useState("#fff");
  const [title, setTitle] = useState("text-dark-charcoal");

  //* HELPER para posición de modelos
  function mercatorToScenePosition(targetTransform: any) {
    return new THREE.Vector3(
      (targetTransform.translateX - relojTransform.translateX) /
        relojTransform.scale,

      -(targetTransform.translateY - relojTransform.translateY) /
        relojTransform.scale,

      (targetTransform.translateZ - relojTransform.translateZ) /
        relojTransform.scale,
    );
  }

  //* HELPER para preparar modelo
  function prepareModel(model: any) {
    model.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.envMapIntensity = 0;
          child.material.needsUpdate = true;
        }
      }
    });
  }

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    if (mapRef.current) return;

    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
        pitch: pitch,
        bearing: bearing,
        style: "mapbox://styles/jared29x/cmpq9y56o004z01s07k57aqbq",
        // style: "mapbox://styles/mapbox/standard",
        maxBounds: TLAHUE_BOUNDS,
      });
    }

    mapRef.current.on("style.load", () => {
      //!dddddddddddddddddddddddddddddddd
      mapRef.current.addSource("composite", {
        type: "vector",
        url: "mapbox://mapbox.mapbox-streets-v8",
      });

      mapRef.current.addLayer({
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

      // console.log(mapRef.current.getStyle().sources);

      // //* OCULTAR OBJETOS MEDIANTE ID
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

      //* VISUALIZADOR DE OBJETOS
      // mapRef.current.on("click", (e) => {
      //   const features = mapRef.current?.queryRenderedFeatures(e.point, {
      //     layers: ["3d-buildings"],
      //   });

      //   console.log(features);
      // });

      //!dddddddddddddddddddddddddddddddddd

      if (!mapRef.current) return;

      // Iluminación dinámica
      const currentHour = new Date().getHours();
      let lightPreset = "day";
      let threeLightsConfig;

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

      if (lightPreset === "night") {
        threeLightsConfig = {
          ambientColor: 0x3b4d66,
          ambientIntensity: 0.65,

          directionalColor: 0x88aaff,
          directionalIntensity: 1.4,

          spotIntensity: 80,

          exposure: 1.85,
        };
      } else if (lightPreset === "day") {
        threeLightsConfig = {
          ambientColor: 0xffffff,
          ambientIntensity: 1.2,

          directionalColor: 0xffffff,
          directionalIntensity: 3,

          spotIntensity: 0,

          exposure: 1.2,
        };
      } else if (lightPreset === "dawn") {
        threeLightsConfig = {
          ambientColor: 0x7d93b5,
          ambientIntensity: 0.75,

          directionalColor: 0xffd6c7,
          directionalIntensity: 1.8,

          spotIntensity: 30,

          exposure: 1.55,
        };
      } else if (lightPreset === "dusk") {
        threeLightsConfig = {
          ambientColor: 0x5b6078,
          ambientIntensity: 0.85,

          directionalColor: 0xffb36b,
          directionalIntensity: 2.2,

          spotIntensity: 45,

          exposure: 1.65,
        };
      }

      mapRef.current.setConfigProperty("basemap", "lightPreset", lightPreset);
      // mapRef.current.setConfigProperty("basemap", "show3dObjects", true);

      //* POLIGONO MUNICIPIO
      mapRef.current.addSource("tlahue-data", {
        type: "geojson",
        data: poligonoTlahuelilpan as any,
      });
      mapRef.current.addLayer({
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
      mapRef.current.addLayer({
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
        slot: "middle",
        onAdd: function (map, gl) {
          fbCamera.current = new THREE.Camera();
          fbScene.current = new THREE.Scene();

          //* LUCES
          // Ambiente de Noche
          fbAmbientLight.current = new THREE.AmbientLight(
            threeLightsConfig.ambientColor,
            threeLightsConfig.ambientIntensity,
          );

          fbScene.current.add(fbAmbientLight.current);

          // Luz de luna
          fbDirectionalLight.current = new THREE.DirectionalLight(
            threeLightsConfig.directionalColor,
            threeLightsConfig.directionalIntensity,
          );
          fbDirectionalLight.current.position.set(-40, -50, 80);

          fbScene.current.add(fbDirectionalLight.current);

          // Luz de Reloj artificial
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

          //* CAMARA HELPER
          // const shadowHelper = new THREE.CameraHelper(
          //   fbSpotLight.current.shadow.camera,
          // );
          // fbScene.current.add(shadowHelper);

          // Características
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

          //* CARGAR LUCES
          const lightTarget = new THREE.Object3D();
          lightTarget.position.set(0, 0, 0);
          fbScene.current.add(lightTarget);
          fbSpotLight.current.target = lightTarget;

          //* MODELOS

          //* MODELO RELOJ
          loader.load(
            "/assets/3D/reloj.glb",
            (gltf) => {
              const modelReloj = gltf.scene;

              prepareModel(modelReloj);

              // Características de visualización
              modelReloj.scale.set(10, 10, 10);
              modelReloj.rotation.x = Math.PI / 2;
              modelReloj.position.copy(mercatorToScenePosition(relojTransform));

              fbScene.current?.add(modelReloj);

              if (mapRef.current) {
                mapRef.current.triggerRepaint();
              }
            },
            undefined,
            (error) => {
              console.error("Error cargando reloj:", error);
            },
          );

          //* MODELO IGLESIA VIEJA
          loader.load(
            "/assets/3D/iglesiaV.glb",
            (gltf) => {
              const modelIglesiaV = gltf.scene;

              prepareModel(modelIglesiaV);

              // Características de visualización
              modelIglesiaV.scale.set(45, 40, 45);
              modelIglesiaV.rotation.x = Math.PI / 2;
              modelIglesiaV.rotation.y = Math.PI;
              modelIglesiaV.position.copy(
                mercatorToScenePosition(iglesiaVTransform),
              );

              fbScene.current?.add(modelIglesiaV);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesiav:", error);
            },
          );

          //* MODELO IGLESIA NUEVA
          loader.load(
            "/assets/3D/iglesiaN.glb",
            (gltf) => {
              const modelIglesiaN = gltf.scene;

              prepareModel(modelIglesiaN);

              // Características de visualización
              modelIglesiaN.scale.set(60, 60, 60);
              modelIglesiaN.rotation.x = Math.PI / 2;
              modelIglesiaN.rotation.y = Math.PI / -3;
              modelIglesiaN.position.copy(
                mercatorToScenePosition(iglesiaNTransform),
              );

              fbScene.current?.add(modelIglesiaN);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesian:", error);
            },
          );

          //* MODELO CASA DE LA CULTURA
          loader.load(
            "/assets/3D/casacultura.glb",
            (gltf) => {
              const modelCasacultura = gltf.scene;

              prepareModel(modelCasacultura);

              // Características de visualización
              modelCasacultura.scale.set(20, 20, 20);
              modelCasacultura.rotation.x = Math.PI / 2;
              modelCasacultura.rotation.y = Math.PI / 1.6;
              modelCasacultura.position.copy(
                mercatorToScenePosition(casaculturaTransform),
              );

              fbScene.current?.add(modelCasacultura);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesian:", error);
            },
          );

          //* MODELO PRESIDENCIA
          loader.load(
            "/assets/3D/presidencia.glb",
            (gltf) => {
              const modelPresidencia = gltf.scene;

              prepareModel(modelPresidencia);

              // Características de visualización
              modelPresidencia.scale.set(20, 20, 20);
              modelPresidencia.rotation.x = Math.PI / 2;
              modelPresidencia.rotation.y = Math.PI / 1.8;
              modelPresidencia.position.copy(
                mercatorToScenePosition(presidenciaTransform),
              );

              fbScene.current?.add(modelPresidencia);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesian:", error);
            },
          );

          //* MODELO JARRON
          loader.load(
            "/assets/3D/jarron.glb",
            (gltf) => {
              const modelJarron = gltf.scene;

              prepareModel(modelJarron);

              // Características de visualización
              modelJarron.scale.set(8, 8, 8);
              modelJarron.rotation.x = Math.PI / 2;
              modelJarron.rotation.y = Math.PI;
              modelJarron.position.copy(
                mercatorToScenePosition(jarronTransform),
              );

              fbScene.current?.add(modelJarron);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesian:", error);
            },
          );

          //* MODELO TORIL
          loader.load(
            "/assets/3D/toril.glb",
            (gltf) => {
              const modelToril = gltf.scene;

              prepareModel(modelToril);

              // Características de visualización
              modelToril.scale.set(60, 60, 60);
              modelToril.rotation.x = Math.PI / 2;
              modelToril.rotation.y = Math.PI;
              modelToril.position.copy(mercatorToScenePosition(torilTransform));

              fbScene.current?.add(modelToril);

              if (mapRef.current) mapRef.current.triggerRepaint();
            },
            undefined,
            (error) => {
              console.error("Error cargando iglesian:", error);
            },
          );

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
        render: function (gl, matrix) {
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
              relojTransform.translateX,
              relojTransform.translateY,
              relojTransform.translateZ,
            )
            .scale(
              new THREE.Vector3(
                relojTransform.scale,
                -relojTransform.scale,
                relojTransform.scale,
              ),
            )
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ);

          fbCamera.current.projectionMatrix = m.multiply(l);
          fbRenderer.current.resetState();
          fbRenderer.current.render(fbScene.current, fbCamera.current);
        },
      };

      mapRef.current.addLayer(customLayer);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [center, zoom, pitch, bearing]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (
      mapRef.current.isStyleLoaded() &&
      mapRef.current.getLayer("tlahue-fill")
    ) {
      const visibility = showTerritorio ? "visible" : "none";
      mapRef.current.setLayoutProperty("tlahue-fill", "visibility", visibility);
      mapRef.current.setLayoutProperty("tlahue-line", "visibility", visibility);

      if (showTerritorio) {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: TERRITORIO_ZOOM,
          pitch: TERRITORIO_PITCH,
          bearing: 0,
          essential: true,
          duration: 1500,
        });
      } else {
        mapRef.current.flyTo({
          center: INITIAL_CENTER,
          zoom: INITIAL_ZOOM,
          pitch: INITIAL_PITCH,
          bearing: INITIAL_BEARING,
          essential: true,
          duration: 1500,
        });
      }
    }
  }, [showTerritorio]);

  //* Boton reseteo de vista
  const handleResetClick = () => {
    if (mapRef.current) {
      setShowTerritorio(false);

      mapRef.current.flyTo({
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
        pitch: INITIAL_PITCH,
        bearing: INITIAL_BEARING,
        essential: true,
      });
    }
  };

  return (
    <section
      id="mapa"
      className={`w-full min-h-screen overflow-x-hidden flex flex-col items-center justify-center py-20 ${back}`}
    >
      <div className="text-center mb-8 flex flex-col items-center gap-1.5">
        <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20">
          mapa municipal
        </span>
        <h2
          className={`font-display font-light text-[40px] ${title} tracking-[-0.0200em] leading-[1.1]`}
        >
          Visitanos
        </h2>
      </div>
      <div className="relative w-full max-w-4xl h-150 rounded-xl shadow-2xl overflow-hidden">
        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          <button
            className={`px-6 py-2 font-bold rounded-md shadow-md cursor-pointer transition-colors text-white ${
              showTerritorio
                ? "bg-[#AA642A]"
                : "bg-[#AA642A] hover:bg-[#D5B35F]"
            }`}
            onClick={() => setShowTerritorio(!showTerritorio)}
          >
            {showTerritorio ? "Ocultar Territorio" : "Ver Territorio"}
          </button>

          <button
            className="px-6 py-2 bg-white text-black font-bold rounded-md shadow-md cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={handleResetClick}
          >
            Reiniciar Vista
          </button>
        </div>

        {/* Mapa */}
        <div ref={mapContainerRef} className="w-full h-full" />
      </div>
    </section>
  );
}

export default MapTlahue;
