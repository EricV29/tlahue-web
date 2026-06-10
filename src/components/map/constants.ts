import mapboxgl from "mapbox-gl";
import type { Feature, FeatureCollection, Point } from "geojson";
import geoTlahuelilpan from "../../../public/assets/3D/geo/tlahuelilpan.json";
import geoColCerroCruz from "../../../public/assets/3D/geo/colCerroCruz.json";
import geoColCuauhtemoc from "../../../public/assets/3D/geo/colCuauhtemoc.json";
import geoColMiravalle from "../../../public/assets/3D/geo/colMiravalle.json";
import geoColRancheria from "../../../public/assets/3D/geo/colRancheria.json";
import geoColSalitre from "../../../public/assets/3D/geo/colSalitre.json";
import geoColSanFrancisco from "../../../public/assets/3D/geo/colSanFrancisco.json";
import geoColSanPrimitivo from "../../../public/assets/3D/geo/colSanPrimitivo.json";
import geoDeposito from "../../../public/assets/3D/geo/deposito.json";
import geoDexhe from "../../../public/assets/3D/geo/dexhe.json";
import geoEjidoMediaLuna from "../../../public/assets/3D/geo/ejidoMediaLuna.json";
import geoMunitepec from "../../../public/assets/3D/geo/munitepec.json";
import geoColCentro from "../../../public/assets/3D/geo/colCentro.json";

export interface MercatorTransform {
  translateX: number;
  translateY: number;
  translateZ: number;
  scale: number;
}

export const INITIAL_CENTER: [number, number] = [-99.2333, 20.1325];
export const INITIAL_ZOOM = 15.93;
export const INITIAL_PITCH = 59;
export const INITIAL_BEARING = 0;

export const MOBILE_INITIAL_ZOOM = 15;
export const MOBILE_ZOOM_OFFSET = -0.8;

export const TERRITORIO_ZOOM = 12;
export const TERRITORIO_PITCH = 0;

export const TLAHUE_BOUNDS: [[number, number], [number, number]] = [
  [-99.33, 20.05],
  [-99.12, 20.21],
];

export function createTransform(coords: [number, number], altitude = 0): MercatorTransform {
  const mercator = mapboxgl.MercatorCoordinate.fromLngLat(coords, altitude);
  return {
    translateX: mercator.x,
    translateY: mercator.y,
    translateZ: mercator.z,
    scale: mercator.meterInMercatorCoordinateUnits(),
  };
}

export const mainCoords = createTransform([-99.232346, 20.131354]);

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

export interface ColoniaEntry {
  id: string;
  nombre: string;
  cp: string;
  data: FeatureCollection;
  center: [number, number];
  zoom: number;
}

export const catalogoColonias: ColoniaEntry[] = [
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
