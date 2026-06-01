import type { GalleryItem } from "../data/gallery";
import IconLocation from "./icons/IconLocation";
import IconExternalLink from "./icons/IconExternalLink";

interface GalleryCardProps {
  item: GalleryItem;
  onImageClick: () => void;
}

export default function GalleryCard({ item, onImageClick }: GalleryCardProps) {
  const formattedDate = new Date(item.fecha_captura).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col gap-2 rounded-xl">
      <div className="relative overflow-hidden rounded-xl transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_48px_rgba(255,255,255,0.25)]">
        <button
          onClick={onImageClick}
          className="block w-full cursor-pointer"
        >
          <img
            src={item.imagen_url}
            alt={item.titulo}
            loading="lazy"
            className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
          {item.categoria}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base md:text-lg font-display font-semibold text-white group-hover:text-tlahu-gold leading-tight transition-colors duration-300">
          {item.titulo}
        </h3>

        <a
          href={item.lugar_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-400 hover:text-tlahu-gold transition-colors shrink-0"
          aria-label={`Ubicación: ${item.lugar}`}
        >
          <IconLocation className="w-4 h-4" />
          <span className="text-[11px] hidden xs:inline">{item.lugar}</span>
        </a>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
        {item.descripcion}
      </p>

      <time className="text-xs text-gray-500">{formattedDate}</time>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
        <span className="text-xs text-gray-500">{item.fotografo}</span>
        <a
          href={item.enlace_portfolio}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs font-medium text-tlahu-gold hover:text-white transition-colors"
        >
          Publicación original
          <IconExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </article>
  );
}
