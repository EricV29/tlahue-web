import * as THREE from "three";
import type { MercatorTransform } from "./constants";
import { mainCoords } from "./constants";

export function mercatorToScenePosition(targetTransform: MercatorTransform) {
  return new THREE.Vector3(
    (targetTransform.translateX - mainCoords.translateX) / mainCoords.scale,
    -(targetTransform.translateY - mainCoords.translateY) / mainCoords.scale,
    (targetTransform.translateZ - mainCoords.translateZ) / mainCoords.scale,
  );
}

export function prepareModel(model: THREE.Object3D) {
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

export function raycastFromMouse(
  point: { x: number; y: number },
  canvas: HTMLCanvasElement,
  projectionMatrix: THREE.Matrix4,
  objects: THREE.Object3D[],
): THREE.Intersection[] {
  const rect = canvas.getBoundingClientRect();
  const ndcX = (point.x / rect.width) * 2 - 1;
  const ndcY = -(point.y / rect.height) * 2 + 1;

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

export interface ThreeLightsConfig {
  ambientColor: number;
  ambientIntensity: number;
  directionalColor: number;
  directionalIntensity: number;
  spotIntensity: number;
  exposure: number;
}

export function getLightsConfig(lightPreset: string): ThreeLightsConfig {
  switch (lightPreset) {
    case "night":
      return {
        ambientColor: 0x3b4d66,
        ambientIntensity: 0.65,
        directionalColor: 0x88aaff,
        directionalIntensity: 1.4,
        spotIntensity: 80,
        exposure: 1.85,
      };
    case "dawn":
      return {
        ambientColor: 0x7d93b5,
        ambientIntensity: 0.75,
        directionalColor: 0xffd6c7,
        directionalIntensity: 1.8,
        spotIntensity: 30,
        exposure: 1.55,
      };
    case "dusk":
      return {
        ambientColor: 0x5b6078,
        ambientIntensity: 0.85,
        directionalColor: 0xffb36b,
        directionalIntensity: 2.2,
        spotIntensity: 45,
        exposure: 1.65,
      };
    default:
      return {
        ambientColor: 0xffffff,
        ambientIntensity: 1.2,
        directionalColor: 0xffffff,
        directionalIntensity: 3,
        spotIntensity: 0,
        exposure: 1.2,
      };
  }
}
