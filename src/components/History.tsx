import { useEffect, useRef, useState } from "react";
import iglesiaImg from "../assets/images/history/iglesia.webp";

const historySlides = [
  {
    tag: "NUESTRA ESENCIA",
    title: (
      <>
        Historia de
        <br />
        <span className="text-[#D5B35F]">Tlahuelilpan</span>
      </>
    ),
    paragraphs: [
      "Tlahuelilpan, tierra de tradición y herencia prehispánica, debe su nombre al náhuatl que evoca al lugar de las aguas rebosantes. Desde tiempos ancestrales, esta tierra ha sido testigo del paso de civilizaciones.",
      "La parroquia, centro de nuestra identidad comunitaria, representa la fusión de la fe y la tradición que define a nuestro municipio. Cada piedra cuenta una historia.",
    ],
  },
  {
    tag: "EL CORAZÓN FRANCISCANO",
    title: (
      <>
        El Legado del
        <br />
        <span className="text-[#D5B35F]">Siglo XVI</span>
      </>
    ),
    paragraphs: [
      "Al cruzar el umbral del Templo de San Francisco de Asís, nos adentramos en una joya del plateresco novohispano edificado entre 1560 y 1570.",
      "Este complejo no solo transformó el paisaje arquitectónico de la región, sino que se convirtió en el eje central del ordenamiento civil, cultural y social de nuestra comunidad.",
    ],
  },
];

export default function History() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const zoomProgress = progress < 0.25 ? 0 : (progress - 0.25) / 0.75;

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const elementHeight = sectionRef.current.offsetHeight;
      const viewportHeight = window.innerHeight;

      const startScroll = rect.top;
      const totalScrollableDistance = elementHeight - viewportHeight;

      const scrolled = -startScroll;
      const rawProgress = scrolled / totalScrollableDistance;

      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      setProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const image1Scale = 1 + zoomProgress * 3.5;
  const image1Opacity = progress > 0.7 ? 0 : 1;
  const image2Opacity = progress > 0.55 ? 1 : 0;

  const image2Scale = progress > 0.55 ? 1.3 - (progress - 0.55) * 0.6 : 1.3;
  const currentSlideIndex = progress > 0.6 ? 1 : 0;
  const textOpacity = progress > 0.48 && progress < 0.62 ? 0 : 1;

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="relative bg-[#111827]"
      style={{ height: "350vh" }}
    >
      {/* Contenedor Fijo */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* CAPA 1: Imagen Exterior (Iglesia) */}
        <div
          className="absolute inset-0 bg-cover bg-position-[center_15%] origin-[center_15%] will-change-transform"
          style={{
            backgroundImage: `url(${iglesiaImg})`,
            transform: `scale(${image1Scale})`,
            opacity: image1Opacity,
            transition: "opacity 0.2s ease-out, transform 0.05s linear",
          }}
        />

        {/* CAPA 2: Imagen Interior */}
        <div
          className="absolute inset-0 bg-cover bg-center origin-center will-change-transform"
          style={{
            backgroundImage: `url(${iglesiaImg})`,
            transform: `scale(${Math.max(1, image2Scale)})`,
            opacity: image2Opacity,
            transition: "opacity 0.2s ease-in, transform 0.05s linear",
          }}
        />

        {/* Contenedor Global de Interfaz (Ocupa toda la pantalla) */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 max-w-360 mx-auto w-full pointer-events-none">
          {/* 1. SECCIÓN SUPERIOR: Título posicionado arriba a la derecha */}
          <div
            className="w-full flex justify-end pt-16 md:pt-20 transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            {/* Tarjeta Glassmorphism para el Título */}
            <div className="bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-6 md:p-8 text-right max-w-md shadow-lg pointer-events-auto">
              <span className="inline-block text-[10px] font-mono tracking-wider uppercase text-[#AA642A] bg-[#AA642A]/10 px-2.5 py-1 rounded border border-[#AA642A]/20 mb-3">
                {historySlides[currentSlideIndex].tag}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-gray-900 font-normal leading-[1.15]">
                {historySlides[currentSlideIndex].title}
              </h2>
            </div>
          </div>

          {/* 2. SECCIÓN INFERIOR: Párrafos de texto abajo a la izquierda */}
          <div
            className="w-full flex justify-start pb-12 transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            {/* Contenedor con tu efecto Glass del Navbar adaptado a Caja de Lectura */}
            <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg border border-gray-200/50 rounded-[24px] p-6 md:p-8 shadow-[rgba(0,0,0,0.06)_0px_4px_20px_0px] pointer-events-auto">
              <div className="space-y-4 text-gray-700 font-body text-sm md:text-base leading-relaxed">
                {historySlides[currentSlideIndex].paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-2 text-gray-400 text-xs font-mono border-t border-gray-200/40 pt-4">
                <span className="w-2 h-2 rounded-full bg-[#AA642A] animate-pulse" />
                <span>Sigue bajando para avanzar en el tiempo</span>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll inicial */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30"
          style={{
            opacity: progress < 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          <div className="flex flex-col items-center animate-bounce bg-white/80 backdrop-blur-md p-2 rounded-full border border-gray-200/50 shadow-md">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              className="text-gray-600"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
