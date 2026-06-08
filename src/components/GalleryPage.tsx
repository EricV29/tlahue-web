import { useState, useMemo, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "./GalleryLightbox";
import Navbar from "./Navbar";
import { SkeletonCard } from "./Skeleton";
import SkipToContent from "./SkipToContent";
import { useScrollEvent } from "../hooks/useScroll";
import IconSearch from "./icons/IconSearch";
import IconChevronDown from "./icons/IconChevronDown";
import galeriaBg from "../assets/images/galeria.webp";
import {
  getImages,
  getImagesByCategory,
  type GalleryItem,
} from "../services/gallery.service";
import {
  getCategories,
  type CategoryItem,
} from "../services/categories.service";

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | "Todas">(
    "Todas",
  );
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 12;
  const loadingRef = useRef(false);

  useEffect(() => {
    document.title = "Galería - Tlahuelilpan";
    return () => { document.title = "Tlahuelilpan - Guia Local & Perspectiva"; };
  }, []);
  const heroRef = useRef(null);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [fetchKey, setFetchKey] = useState(0);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchQuery), 400);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Reset cambio de categoría
  useEffect(() => {
    setImages([]);
    setOffset(0);
    setHasMore(true);
    loadingRef.current = false;
    setFetchKey((k) => k + 1);
  }, [selectedCategory, debouncedSearch]);

  // Carga de imágenes
  useEffect(() => {
    if (!hasMore || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    const fetch =
      selectedCategory === "Todas"
        ? getImages(LIMIT, offset)
        : getImagesByCategory(
            Number(selectedCategory),
            LIMIT,
            offset,
            debouncedSearch,
          );

    fetch
      .then((data) => {
        setImages((prev) => {
          const ids = new Set(prev.map((i) => i.id));
          return [...prev, ...data.filter((i) => !ids.has(i.id))];
        });
        if (data.length < LIMIT) setHasMore(false);
      })
      .catch(() => setError("Servicio no disponible"))
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });
  }, [fetchKey, offset]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

  // Scroll infinito
  useScrollEvent(() => {
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
    if (nearBottom && !loadingRef.current && hasMore) {
      setOffset((prev) => prev + LIMIT);
    }
  }, [hasMore]);

  // Navbar
  useScrollEvent(() => {
    setShowNavbar(window.scrollY < window.innerHeight * 0.5);
  }, []);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: 40,
      duration: 1,
      ease: "power3.out",
    });
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + filtered.length) % filtered.length : null,
    );
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % filtered.length : null,
    );
  };

  const filtered = useMemo(() => {
    return images.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    });
  }, [searchQuery, selectedCategory, images]);

  return (
    <div className="min-h-screen bg-black">
      <SkipToContent targetId="galeria-content" />
      <Navbar activeSection="inicio" isHidden={!showNavbar} />
      <main id="galeria-content">

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-40 md:h-56 bg-[radial-gradient(ellipse_60%_80px_at_50%_0px,rgba(255,255,255,0.30),transparent)] pointer-events-none" />
        <section
          ref={heroRef}
          aria-label="Galería - encabezado"
          className="flex flex-col items-center justify-center min-h-[70vh] md:min-h-[80vh] px-4 text-center overflow-hidden"
        >
          <h1
            className="font-display font-bold leading-none tracking-tight select-none bg-clip-text text-transparent bg-cover bg-center px-4"
            style={{
              fontSize: "clamp(5rem, 22vw, 17rem)",
              backgroundImage: `url(${galeriaBg})`,
            }}
          >
            GALERÍA
          </h1>
          <p className="mt-2 md:mt-4 font-display font-light text-gray-500 text-lg md:text-2xl tracking-[0.3em] uppercase">
            Tlahuelilpan
          </p>
        </section>
      </div>

      <section className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
          <div className="relative flex-2">
            <IconSearch className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Buscar imagen"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-0 border-b-2 border-white/15 pl-8 pb-2 pt-1 text-base text-white placeholder-gray-500 focus:outline-none focus:border-tlahu-gold/60 transition-colors"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedCategory(val === "Todas" ? "Todas" : Number(val));
              }}
              className="px-3.5 py-2 pr-8 rounded-xl text-xs font-medium bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white transition-all outline-none cursor-pointer appearance-none"
            >
              <option value="Todas" className="bg-black text-gray-300">
                Todas
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-black text-gray-300"
                >
                  {cat.name}
                </option>
              ))}
            </select>
            <IconChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </section>

      <section aria-label="Galería de imágenes" className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {error ? (
          <div role="alert" className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="font-display text-2xl text-gray-400">Error al cargar las imágenes</p>
            <p className="font-body text-sm text-gray-600">No se pudo conectar con el servidor. Verifica tu conexión o intenta más tarde.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 rounded-md bg-tlahu-clay px-5 py-2 font-body text-sm font-medium text-white transition-colors hover:brightness-90"
            >
              Reintentar
            </button>
          </div>
        ) : filtered.length === 0 && !loading ? (
          <p className="text-center text-gray-500 py-20">
            No se encontraron resultados.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-14 lg:gap-16">
            {filtered.map((item, index) => (
              <GalleryCard
                key={item.id}
                item={item}
                onImageClick={() => openLightbox(index)}
              />
            ))}
          </div>
        )}
        {loading && images.length === 0 && (
          <div aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-14 lg:gap-16">
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </div>
        )}
        {loading && images.length > 0 && (
          <p aria-live="polite" className="text-center text-gray-500 py-8">Cargando...</p>
        )}
        {!hasMore && !loading && (
          <p className="text-center text-gray-500 py-8">No hay más imágenes</p>
        )}
      </section>

      {lightboxIndex !== null && (
        <GalleryLightbox
          items={filtered}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}
      </main>
    </div>
  );
}
