import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { getImageUrl } from "../../utils/cloudinary";

export interface ModeloData {
  id: string;
  name: string;
  icon: string;
  glb: string;
  coords: number[];
  scale: number[];
  rotation: number[];
  labelOffset: number[];
  cardOffset: number[];
  cardOffsetMobile?: number[];
  zoomCard: number;
  zoomCardMobile?: number;
  zoomCardMin?: number;
  zoomCardMinMobile?: number;
  bearing?: number;
  card: {
    image: string;
    date: string;
    style: string;
    description: string;
    mapsUrl: string;
    galleryUrl: string;
  };
}

export function createModelCardPopup(
  data: ModeloData,
  onClose: () => void,
) {
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
}
