import IconLocation from "./icons/IconLocation";
import IconExternalLink from "./icons/IconExternalLink";
import { type GalleryItem } from "../services/gallery.service";
import { getImageUrl } from "../utils/cloudinary";

interface GalleryCardProps {
  item: GalleryItem;
  onImageClick: () => void;
}

export default function GalleryCard({ item, onImageClick }: GalleryCardProps) {
  const formattedDate = item.captureAt
    ? (() => {
        const [y, m, d] = item.captureAt.split("T")[0].split("-").map(Number);
        return new Date(y, m - 1, d).toLocaleDateString("es-MX", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      })()
    : "";

  return (
    <article className="group flex flex-col gap-2 rounded-xl">
      <div className="relative overflow-hidden rounded-xl transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_48px_rgba(255,255,255,0.25)]">
        <button onClick={onImageClick} className="block w-full cursor-pointer">
          <img
            src={getImageUrl(item.url)}
            alt={item.title}
            loading="lazy"
            className="w-full aspect-3/2 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </button>

        <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md text-white border border-white/30">
          {item.categories[0]}
        </span>
      </div>

      <div className="flex items-start justify-between gap-2">
        <h3 className="text-base md:text-lg font-display font-semibold text-white group-hover:text-tlahu-gold leading-tight transition-colors duration-300">
          {item.title}
        </h3>

        <a
          href={item.locationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-gray-400 hover:text-tlahu-gold transition-colors shrink-0"
          aria-label={`Ubicación: ${item.location}`}
        >
          <IconLocation className="w-4 h-4" />
          <span className="text-[11px] hidden xs:inline">{item.location}</span>
        </a>
      </div>

      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
        {item.description}
      </p>

      <time dateTime={item.captureAt ? item.captureAt.split("T")[0] : ""} className="text-xs text-gray-500">{formattedDate}</time>

      <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/10">
        <span className="text-xs text-gray-500">{item.nameCreator}</span>
        <a
          href={item.linkOrigin}
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
