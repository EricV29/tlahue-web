import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";

export function create3DLabel(name = "", icon = "📍") {
  const div = document.createElement("div");
  div.className = "territory-label";
  div.innerHTML = `
    <span class="territory-icon">${icon}</span>
    <span class="territory-text">${name}</span>
  `;
  const labelObject = new CSS2DObject(div);
  labelObject.position.set(0, 0, 0);
  return labelObject;
}
