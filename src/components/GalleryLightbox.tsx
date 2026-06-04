import { useEffect, useCallback } from "react";
import type { GalleryItem } from "../services/gallery.service";
import IconChevronLeft from "./icons/IconChevronLeft";
import IconChevronRight from "./icons/IconChevronRight";
import IconClose from "./icons/IconClose";
import { getImageUrl } from "../utils/cloudinary";

interface GalleryLightboxProps {
  items: GalleryItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function GalleryLightbox({
  items,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: GalleryLightboxProps) {
  const item = items[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrev();
          break;
        case "ArrowRight":
          onNext();
          break;
      }
    },
    [onClose, onPrev, onNext],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Cerrar"
      >
        <IconClose className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center gap-4 w-full px-4 md:px-16 max-w-5xl">
        <div className="relative w-full flex items-center">
          <button
            onClick={onPrev}
            className="hidden md:flex absolute left-0 z-10 p-3 -translate-x-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Anterior"
          >
            <IconChevronLeft className="w-6 h-6" />
          </button>

          <img
            src={getImageUrl(item.url)}
            alt={item.title}
            className="max-h-[70vh] md:max-h-[80vh] w-full object-contain rounded-lg"
          />

          <button
            onClick={onNext}
            className="hidden md:flex absolute right-0 z-10 p-3 translate-x-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Siguiente"
          >
            <IconChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 md:hidden">
          <button
            onClick={onPrev}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Anterior"
          >
            <IconChevronLeft className="w-5 h-5" />
          </button>

          <p className="text-sm text-gray-400">
            {currentIndex + 1} / {items.length}
          </p>

          <button
            onClick={onNext}
            className="p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Siguiente"
          >
            <IconChevronRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-gray-500 hidden md:block">
          {currentIndex + 1} / {items.length} &mdash; {item.title}
        </p>
      </div>
    </div>
  );
}
