import { useRef, useEffect, useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
import geoTlahuelilpan from "../../public/assets/3D/geo/tlahuelilpan.json";
import geoColCerroCruz from "../../public/assets/3D/geo/colCerroCruz.json";
import geoColCuauhtemoc from "../../public/assets/3D/geo/colCuauhtemoc.json";
import geoColMiravalle from "../../public/assets/3D/geo/colMiravalle.json";
import geoColRancheria from "../../public/assets/3D/geo/colRancheria.json";
import geoColSalitre from "../../public/assets/3D/geo/colSalitre.json";
import geoColSanFrancisco from "../../public/assets/3D/geo/colSanFrancisco.json";
import geoColSanPrimitivo from "../../public/assets/3D/geo/colSanPrimitivo.json";
import geoDeposito from "../../public/assets/3D/geo/deposito.json";
import geoDexhe from "../../public/assets/3D/geo/dexhe.json";
import geoEjidoMediaLuna from "../../public/assets/3D/geo/ejidoMediaLuna.json";
import geoMunitepec from "../../public/assets/3D/geo/munitepec.json";
import geoColCentro from "../../public/assets/3D/geo/colCentro.json";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import IconChevronDown from "./icons/IconChevronDown";
import IconReset from "./icons/IconReset";
import modelos3D from "../data/modelos3D.json";
import { getImageUrl } from "../utils/cloudinary";
import type { Feature, FeatureCollection, Point } from "geojson";

interface MercatorTransform {
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
}

// Vista MAPA 3D mapbox
const INITIAL_CENTER: [number, number] = [-99.2333, 20.1325];
const INITIAL_ZOOM = 15.93;
const INITIAL_PITCH = 59;
const INITIAL_BEARING = 0;

// Vista MOBILE
const MOBILE_INITIAL_ZOOM = 15;
const MOBILE_ZOOM_OFFSET = -0.8;

// Vista "2D" territorio mapbox
const TERRITORIO_ZOOM = 12;
const TERRITORIO_PITCH = 0;

// Limitación de mapa mapbox
const TLAHUE_BOUNDS: [[number, number], [number, number]] = [
  [-99.33, 20.05],
  [-99.12, 20.21],
];

// Coordenadas principales
const mainCoords = createTransform([-99.232346, 20.131354]);

//* HELPER para coordenadas de modelos
function createTransform(coords: [number, number], altitude = 0): MercatorTransform {
  const mercator = mapboxgl.MercatorCoordinate.fromLngLat(coords, altitude);

  return {
    translateX: mercator.x,
    translateY: mercator.y,
    translateZ: mercator.z,
    scale: mercator.meterInMercatorCoordinateUnits(),
  };
}

function getColoniaCenter(geoData: FeatureCollection): [number, number] {
  const centerFeature = geoData.features?.find(
    (f: Feature) => f.geometry?.type === "Point",
  );
  const coords = (centerFeature?.geometry as Point)?.coordinates;
  return coords ? (coords as [number, number]) : INITIAL_CENTER;
}

function getColoniaCP(geoData: FeatureCollection): string {
  const polygonFeature = geoData.features?.find(
    (f: Feature) =>
      f.geometry?.type === "Polygon" || f.geometry?.type === "MultiPolygon",
  );
  return polygonFeature?.properties?.cp ?? "";
}

const catalogoColonias: {
  id: string;
  nombre: string;
  cp: string;
  data: FeatureCollection;
  center: [number, number];
  zoom: number;
}[] = [
  {
    id: "municipio",
    nombre: "Tlahuelilpan",
    cp: getColoniaCP(geoTlahuelilpan as FeatureCollection),
    data: geoTlahuelilpan as FeatureCollection,
    center: getColoniaCenter(geoTlahuelilpan as FeatureCollection),
    zoom: 14,
  },
  {
    id: "centro",
    nombre: "Colonia Centro",
    cp: getColoniaCP(geoColCentro as FeatureCollection),
    data: geoColCentro as FeatureCollection,
    center: getColoniaCenter(geoColCentro as FeatureCollection),
    zoom: 15,
  },
  {
    id: "cerroCruz",
    nombre: "Cerro de la Cruz",
    cp: getColoniaCP(geoColCerroCruz as FeatureCollection),
    data: geoColCerroCruz as FeatureCollection,
    center: getColoniaCenter(geoColCerroCruz as FeatureCollection),
    zoom: 15.4,
  },
  {
    id: "cuauhtemoc",
    nombre: "Colonia Cuauhtémoc",
    cp: getColoniaCP(geoColCuauhtemoc as FeatureCollection),
    data: geoColCuauhtemoc as FeatureCollection,
    center: getColoniaCenter(geoColCuauhtemoc as FeatureCollection),
    zoom: 15.4,
  },
  {
    id: "miravalle",
    nombre: "Fracc. Miravalle",
    cp: getColoniaCP(geoColMiravalle as FeatureCollection),
    data: geoColMiravalle as FeatureCollection,
    center: getColoniaCenter(geoColMiravalle as FeatureCollection),
    zoom: 15.2,
  },
  {
    id: "rancheria",
    nombre: "Ranchería",
    cp: getColoniaCP(geoColRancheria as FeatureCollection),
    data: geoColRancheria as FeatureCollection,
    center: getColoniaCenter(geoColRancheria as FeatureCollection),
    zoom: 15,
  },
  {
    id: "salitre",
    nombre: "El Salitre",
    cp: getColoniaCP(geoColSalitre as FeatureCollection),
    data: geoColSalitre as FeatureCollection,
    center: getColoniaCenter(geoColSalitre as FeatureCollection),
    zoom: 16,
  },
  {
    id: "sanFrancisco",
    nombre: "San Francisco",
    cp: getColoniaCP(geoColSanFrancisco as FeatureCollection),
    data: geoColSanFrancisco as FeatureCollection,
    center: getColoniaCenter(geoColSanFrancisco as FeatureCollection),
    zoom: 15.4,
  },
  {
    id: "sanPrimitivo",
    nombre: "San Primitivo",
    cp: getColoniaCP(geoColSanPrimitivo as FeatureCollection),
    data: geoColSanPrimitivo as FeatureCollection,
    center: getColoniaCenter(geoColSanPrimitivo as FeatureCollection),
    zoom: 15.5,
  },
  {
    id: "deposito",
    nombre: "El Depósito",
    cp: getColoniaCP(geoDeposito as FeatureCollection),
    data: geoDeposito as FeatureCollection,
    center: getColoniaCenter(geoDeposito as FeatureCollection),
    zoom: 15,
  },
  {
    id: "dexhe",
    nombre: "El Dexhe",
    cp: getColoniaCP(geoDexhe as FeatureCollection),
    data: geoDexhe as FeatureCollection,
    center: getColoniaCenter(geoDexhe as FeatureCollection),
    zoom: 16,
  },
  {
    id: "ejidoMediaLuna",
    nombre: "Ejido Media Luna",
    cp: getColoniaCP(geoEjidoMediaLuna as FeatureCollection),
    data: geoEjidoMediaLuna as FeatureCollection,
    center: getColoniaCenter(geoEjidoMediaLuna as FeatureCollection),
    zoom: 15,
  },
  {
    id: "munitepec",
    nombre: "Munitepec",
    cp: getColoniaCP(geoMunitepec as FeatureCollection),
    data: geoMunitepec as FeatureCollection,
    center: getColoniaCenter(geoMunitepec as FeatureCollection),
    zoom: 14.5,
  },
];

// Función crear etiqueta
const create3DLabel = (name = "", icon = "📍") => {
  const div = document.createElement("div");
  div.className = "territory-label";
  div.innerHTML = `
    <span class="territory-icon">${icon}</span>
    <span class="territory-text">${name}</span>
  `;
  const labelObject = new CSS2DObject(div);
  labelObject.position.set(0, 0, 0);
  return labelObject;
};

// Función crear card
const createModelCardPopup = (
  data: (typeof modelos3D)[number],
  onClose: () => void,
) => {
  const div = document.createElement("div");
  div.className = "model-card";

  div.innerHTML = `
    <div class="model-card-img-wrap">
      <img class="model-card-img" src="${getImageUrl(data.card.image)}" alt="${data.name}" />
    </div>
    <button class="model-card-close" aria-label="Cerrar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426"/>
      </svg>
    </button>
    <div class="model-card-header-text">
      <h3 class="model-card-title">${data.name}</h3>
    </div>
    <div class="model-card-meta">
        <span class="model-card-date">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 4V2M15 4V6M15 4H10.5M3 10V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V10H3Z"/>
            <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7"/>
            <path d="M7 2V6"/>
            <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5"/>
          </svg>
          ${data.card.date}
        </span>
        <span class="model-card-style">${data.card.style}</span>
      </div>
    <p class="model-card-desc">${data.card.description}</p>
    <div class="model-card-actions">
      <a class="model-card-link" href="${data.card.mapsUrl}" target="_blank" rel="noopener noreferrer">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10C20 14.4183 12 22 12 22C12 22 4 14.4183 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10Z"/>
          <path d="M12 11C12.5523 11 13 10.5523 13 10C13 9.44772 12.5523 9 12 9C11.4477 9 11 9.44772 11 10C11 10.5523 11.4477 11 12 11Z"/>
        </svg>
        Visitar
      </a>
      <a class="model-card-link" href="${data.card.galleryUrl}">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12.6V20.4C22 20.7314 21.7314 21 21.4 21H13.6C13.2686 21 13 20.7314 13 20.4V12.6C13 12.2686 13.2686 12 13.6 12H21.4C21.7314 12 22 12.2686 22 12.6Z"/>
          <path d="M19.5 14.51L19.51 14.4989"/>
          <path d="M13 18.2L16.5 17L22 19"/>
          <path d="M2 10V3.6C2 3.26863 2.26863 3 2.6 3H8.77805C8.92127 3 9.05977 3.05124 9.16852 3.14445L12.3315 5.85555C12.4402 5.94876 12.5787 6 12.722 6H21.4C21.7314 6 22 6.26863 22 6.6V9M2 10V18.4C2 18.7314 2.26863 19 2.6 19H10M2 10H10"/>
        </svg>
        Galería
      </a>
    </div>
  `;

  const closeBtn = div.querySelector(".model-card-close")!;
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    onClose();
  });

  return new CSS2DObject(div);
};

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

  //* HELPER para posición de modelos
  function mercatorToScenePosition(targetTransform: MercatorTransform) {
    return new THREE.Vector3(
      (targetTransform.translateX - mainCoords.translateX) / mainCoords.scale,

      -(targetTransform.translateY - mainCoords.translateY) / mainCoords.scale,

      (targetTransform.translateZ - mainCoords.translateZ) / mainCoords.scale,
    );
  }

  //* HELPER para preparar modelo
  function prepareModel(model: THREE.Object3D) {
    model.traverse((child: THREE.Object3D) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.envMapIntensity = 0;
          mat.needsUpdate = true;
        }
      }
    });
  }

  // Helper seleccionar modelos
  function raycastFromMouse(
    point: { x: number; y: number },
    canvas: HTMLCanvasElement,
    projectionMatrix: THREE.Matrix4,
    objects: THREE.Object3D[],
  ): THREE.Intersection[] {
    const rect = canvas.getBoundingClientRect();
    const ndcX = (point.x / rect.width) * 2 - 1;
    const ndcY = -(point.y / rect.height) * 2 + 1;

    // Reconstruir rayo manualmente desde NDC
    const origin = new THREE.Vector3(ndcX, ndcY, -1).applyMatrix4(
      projectionMatrix.clone().invert(),
    );
    const target = new THREE.Vector3(ndcX, ndcY, 1).applyMatrix4(
      projectionMatrix.clone().invert(),
    );
    const direction = target.sub(origin).normalize();

    const raycaster = new THREE.Raycaster();
    raycaster.set(origin, direction);

    return raycaster.intersectObjects(objects, true);
  }

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

      // Log capas
      // console.log(mapRef.current.getStyle().sources);

      //* OCULTAR OBJETOS MEDIANTE ID

      // ID de objetos a ocultar
      const hiddenBuildings = [
        1001910979, 550913002, 363840435055045, 348763145096935,
        2255831451438105, 2492612038534085, 550916224,
      ];

      // Ocultar objetos
      mapRef.current?.setFilter("mis-edificios-3d", [
        "match",
        ["id"],
        hiddenBuildings,
        false,
        true,
      ]);

      //* LOG VISUALIZADOR DE OBJETOS
      // mapRef.current.on("click", (e) => {
      //   const features = mapRef.current?.queryRenderedFeatures(e.point, {
      //     layers: ["3d-buildings"],
      //   });

      //   console.log(features);
      // });

      //* ILUMICACIÓN DINAMICA
      const currentHour = new Date().getHours();
      let lightPreset = "day";
      let threeLightsConfig = {
        ambientColor: 0xffffff,
        ambientIntensity: 1.2,

        directionalColor: 0xffffff,
        directionalIntensity: 3,

        spotIntensity: 0,

        exposure: 1.2,
      };

      // Iluminación de mapbox
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

      // Iluminación de modelos glb
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

      mapRef.current!.setConfigProperty("basemap", "lightPreset", lightPreset);
      // mapRef.current.setConfigProperty("basemap", "show3dObjects", true);

      //* POLIGONO MUNICIPIO
      mapRef.current!.addSource("tlahue-data", {
        type: "geojson",
        data: geoTlahuelilpan as FeatureCollection,
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

          // Luz ambiente — ilumina toda la escena de forma uniforme según el preset del horario
          fbAmbientLight.current = new THREE.AmbientLight(
            threeLightsConfig.ambientColor,
            threeLightsConfig.ambientIntensity,
          );

          fbScene.current.add(fbAmbientLight.current);

          // Luz direccional — simula el sol o la luna según el horario, genera sombras suaves
          fbDirectionalLight.current = new THREE.DirectionalLight(
            threeLightsConfig.directionalColor,
            threeLightsConfig.directionalIntensity,
          );
          fbDirectionalLight.current.position.set(-40, -50, 80);

          fbScene.current.add(fbDirectionalLight.current);

          // Luz spot — foco artificial concentrado, activo principalmente en noche y amanecer
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

          // Helper camara de luces
          // const shadowHelper = new THREE.CameraHelper(
          //   fbSpotLight.current.shadow.camera,
          // );
          // fbScene.current.add(shadowHelper);

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

          //* TARGET SPOTLIGHT — punto hacia donde apunta el foco artificial
          const lightTarget = new THREE.Object3D();
          lightTarget.position.set(0, 0, 0);
          fbScene.current.add(lightTarget);
          fbSpotLight.current.target = lightTarget;

          //* RENDERER DE ETIQUETAS HTML — capa CSS2D superpuesta al canvas para etiquetas y cards
          fbLabelRenderer.current = new CSS2DRenderer();
          fbLabelRenderer.current.setSize(
            map.getCanvas().clientWidth,
            map.getCanvas().clientHeight,
          );
          // Se posiciona encima del canvas sin interferir con los eventos del mapa
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

    // Volar de vuelta a vista 3D principal
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

    // Ocultar siempre todo
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
        center: getColoniaCenter(geoTlahuelilpan as FeatureCollection),
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
        center: targetColonia.center as [number, number],
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

    // Ocultar capas de territorio
    hideAllTerritories();

    // Mostrar card del modelo
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
