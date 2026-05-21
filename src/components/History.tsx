import { useEffect, useRef, useState } from "react";
import iglesiaImg from "../assets/images/history/iglesia.webp";

export default function History() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementHeight = containerRef.current.offsetHeight;

      const start = viewportHeight;
      const end = -elementHeight + viewportHeight;
      const rawProgress = (start - rect.top) / (start - end);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));

      setScrollProgress(clampedProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scale = 1 + scrollProgress * 1.2;
  const translateY = scrollProgress * 40;

  return (
    <section
      id="historia"
      className="relative"
      style={{ height: "280vh" }}
    >
      <div
        ref={containerRef}
        className="sticky top-0 h-screen overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center origin-center"
          style={{
            backgroundImage: `url(${iglesiaImg})`,
            transform: `scale(${scale}) translateY(${translateY}px)`,
            transition: "transform 0.05s linear",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-[#111827]/30 to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-8 pb-20">
          <div className="max-w-3xl">
            <span className="inline-block text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/20 px-3 py-1 rounded border border-[#D5B35F]/30 mb-4">
              NUESTRA ESENCIA
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-light leading-tight mb-6">
              Historia de<br />
              <span className="text-[#D5B35F]">Tlahuelilpan</span>
            </h2>

            <div className="space-y-4 text-white/80 font-body text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Tlahuelilpan, tierra de tradición y herencia prehispánica,
                debe su nombre al náhuatl "Tlauelilocan" que significa
                "lugar donde se venera al sol". Desde tiempos ancestrales,
                esta tierra ha sido testigo del paso de civilizaciones que
                dejaron huella imborrable en su cultura.
              </p>
              <p>
                La iglesia, centro de nuestra identidad comunitaria,
                representa la fusión de la fe y la tradición que define
                a nuestro municipio. Cada piedra cuenta una historia,
                cada rincón guarda una memoria de generaciones que
                construyeron el Tlahuelilpan de hoy.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-white/50 text-sm font-mono">
              <span className="w-2 h-2 rounded-full bg-[#D5B35F] animate-pulse" />
              <span>Explora nuestra historia</span>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
          style={{ opacity: scrollProgress < 0.1 ? 1 : 0, transition: "opacity 0.3s" }}
        >
          <div className="flex flex-col items-center animate-bounce">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white/60"
            >
              <path
                d="M12 5v14M5 12l7 7 7-7"
                stroke="currentColor"
                strokeWidth="1.5"
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