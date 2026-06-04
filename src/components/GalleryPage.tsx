import { useState, useMemo, useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import GalleryCard from "./GalleryCard";
import GalleryLightbox from "./GalleryLightbox";
import Navbar from "./Navbar";
import IconSearch from "./icons/IconSearch";
import galeriaBg from "../assets/images/galeria.webp";
import { getImages, type GalleryItem } from "../services/gallery.service";

const ALL_KEY = "Todas";

const filterOptions = [
  ALL_KEY,
  "Arquitectura",
  "Naturaleza",
  "Paisaje",
  "Centro Histórico",
  "Plaza Principal",
  "Parque Municipal",
];

const categorySet = new Set(["Arquitectura", "Naturaleza", "Paisaje"]);
const placeSet = new Set([
  "Centro Histórico",
  "Plaza Principal",
  "Parque Municipal",
]);

export default function GalleryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState(ALL_KEY);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showNavbar, setShowNavbar] = useState(true);
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const LIMIT = 10;
  const loadingRef = useRef(false);
  const heroRef = useRef(null);

  // Carga de imágenes
  useEffect(() => {
    if (!hasMore || loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);

    getImages(LIMIT, offset)
      .then((data) => {
        setImages((prev) => {
          const ids = new Set(prev.map((i) => i.id));
          const newData = data.filter((i) => !ids.has(i.id));
          return [...prev, ...newData];
        });
        if (data.length < LIMIT) setHasMore(false);
      })
      .catch(() => setError("Error get images"))
      .finally(() => {
        setLoading(false);
        loadingRef.current = false;
      });
  }, [offset]);

  // Scroll infinito
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom && !loadingRef.current && hasMore) {
        setOffset((prev) => prev + LIMIT);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore]);

  // Navbar
  useEffect(() => {
    const handleScroll = () => {
      setShowNavbar(window.scrollY < window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
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

      if (activeFilter === ALL_KEY) return matchesSearch;

      const matchesTag = categorySet.has(activeFilter)
        ? item.categories?.includes(activeFilter)
        : placeSet.has(activeFilter)
          ? item.location === activeFilter
          : true;

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, activeFilter, images]);

  if (error) return <p className="text-white text-center py-20">{error}</p>;

  return (
    <div className="min-h-screen bg-black">
      <Navbar activeSection="inicio" isHidden={!showNavbar} />

      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-40 md:h-56 bg-[radial-gradient(ellipse_60%_80px_at_50%_0px,rgba(255,255,255,0.30),transparent)] pointer-events-none" />
        <section
          ref={heroRef}
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
          <div className="flex items-center gap-2 overflow-x-auto flex-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {filterOptions.map((option) => (
              <button
                key={option}
                onClick={() => setActiveFilter(option)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  activeFilter === option
                    ? "bg-tlahu-gold/20 text-tlahu-gold border border-tlahu-gold/40"
                    : "bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:py-12">
        {filtered.length === 0 && !loading ? (
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
        {loading && (
          <p className="text-center text-gray-500 py-8">Cargando...</p>
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
    </div>
  );
}
