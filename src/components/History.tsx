import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TxtTlahue from "./icons/TxtTlahue";

import hacienda from "../assets/images/history/hacienda.webp";
import tlahueNoche from "../assets/images/tlahueNoche.webp";
import iglesia from "../assets/images/history/iglesia.webp";
import tlahueAereo from "../assets/images/history/tlahueAereo.webp";
import reloj from "../assets/images/history/reloj.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    tag: "EL ORIGEN",
    image: hacienda,
    paragraphs: [
      "Mucho antes de la llegada española, este fértil valle fue habitado por tribus otomíes. Su nombre náhuatl evoca con orgullo al 'lugar de las aguas rebosantes'.",
      "Desde sus orígenes, esta tierra destacó por su riqueza agrícola y por ser un punto estratégico de encuentro y paso para grandes civilizaciones.",
    ],
  },
  {
    tag: "SAN FRANCISCO",
    image: iglesia,
    paragraphs: [
      "En el año 1560, los españoles fundaron el Templo de San Francisco de Asís, una joya arquitectónica considerada 'única en su género'.",
      "Su diseño plateresco logró fusionar el estilo europeo con sutiles impresiones indigenistas, dando como resultado una fachada de serena belleza.",
    ],
  },
  {
    tag: "EXPLENDOR AGRÍCOLA",
    image: tlahueAereo,
    paragraphs: [
      "A fines del siglo XIX, se consolidó aquí una hacienda tan inmensa que explotaba tierras de Tula, Atitalaquia, Tlaxcoapan, Tezontepec y Mixquiahuala.",
      "Su enorme potencial agrícola convirtió a Tlahuelilpan en un centro de gran riqueza y en el motor económico más importante de toda la región.",
    ],
  },
  {
    tag: "REVOLUCIÓN y CAMBIO",
    image: reloj,
    paragraphs: [
      "Con el movimiento revolucionario de 1910 y la caída del porfiriato, la opulencia de la gran hacienda y su situación económica declinaron por completo.",
      "Aquellas inmensas extensiones de tierra fueron recuperadas por la fuerza de su gente, dividiéndose finalmente en los ejidos y pequeñas propiedades actuales.",
    ],
  },
  {
    tag: "SOBERANÍA LIBRE",
    image: tlahueNoche,
    paragraphs: [
      "Tras pertenecer formalmente al municipio de Tlaxcoapan durante décadas, la justicia histórica llegó en el mes de enero del año 1970.",
      "En esa fecha, Tlahuelilpan fue oficialmente elevado a la categoría de Municipio, consolidando la identidad, orgullo y dinamismo que lo definen hoy.",
    ],
  },
];

export default function History() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // ── MOBILE SLIDER STATE ────────────────────────────────────────
  const [active, setActive] = useState(0);
  const touchStartX = useRef(0);

  const goTo = (index: number) =>
    setActive(Math.max(0, Math.min(slides.length - 1, index)));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goTo(diff > 0 ? active + 1 : active - 1);
  };

  // ── DESKTOP GSAP (sin cambios) ─────────────────────────────────
  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const images = gsap.utils.toArray<HTMLElement>("[data-bg]");
    const texts = gsap.utils.toArray<HTMLElement>("[data-text]");
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.set(images, { opacity: 0, scale: 1.08 });
      gsap.set(images[0], { opacity: 1, scale: 1 });
      gsap.set(texts, { autoAlpha: 0 });
      gsap.set(texts[0], { autoAlpha: 1 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=8000",
          scrub: 2,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      slides.forEach((_, i) => {
        if (i === 0) return;
        const label = `slide-${i}`;
        tl.add(label);
        tl.to(
          images[i - 1],
          { opacity: 0, scale: 1.15, duration: 2.8, ease: "power2.inOut" },
          label,
        );
        tl.fromTo(
          images[i],
          { opacity: 0, scale: 1.12 },
          { opacity: 1, scale: 1, duration: 3.5, ease: "power2.inOut" },
          label,
        );
        tl.to(texts[i - 1], { autoAlpha: 0, duration: 0.8 }, `${label}+=0.8`);
        tl.fromTo(
          texts[i],
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 1, ease: "power2.out" },
          `${label}+=2.3`,
        );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div id="historia">
      {/* MOBILE*/}
      <section
        className="md:hidden bg-dark-charcoal"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Imagen */}
        <div className="relative w-full aspect-video overflow-hidden">
          {slides.map((slide, i) => (
            <div
              key={i}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
              style={{
                backgroundImage: `url(${slide.image})`,
                opacity: i === active ? 1 : 0,
              }}
            >
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ))}

          {/* Tag */}
          <div className="absolute bottom-4 left-4 z-10">
            <span className="text-white text-[10px] tracking-[0.2em] uppercase bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1 rounded-md">
              {slides[active].tag}
            </span>
          </div>

          {/* Logo solo en slide 0 */}
          {active === 0 && (
            <div className="absolute top-4 right-4 z-10">
              <TxtTlahue className="w-36 h-auto text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />
            </div>
          )}
        </div>

        {/* Texto */}
        <div className="px-5 py-6 space-y-3 min-h-40">
          {slides[active].paragraphs.map((p, i) => (
            <p
              key={i}
              className="text-white/80 text-sm leading-relaxed font-body"
            >
              {p}
            </p>
          ))}
        </div>

        {/* Controles */}
        <div className="bg-dark-charcoal pb-8 flex items-center justify-center gap-4">
          <button
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            className="p-2 rounded-full border border-white/20 bg-white/5 text-white disabled:opacity-20 active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === active ? "w-5 h-2 bg-white" : "w-2 h-2 bg-white/30"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goTo(active + 1)}
            disabled={active === slides.length - 1}
            className="p-2 rounded-full border border-white/20 bg-white/5 text-white disabled:opacity-20 active:scale-95 transition-all"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </section>

      {/* DESKTOP  */}
      <section
        ref={sectionRef}
        className="hidden md:block relative h-screen bg-black isolate"
      >
        <div id="historia-desktop" />
        {slides.map((slide, i) => (
          <div
            key={i}
            data-bg
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
        {slides.map((slide, i) => (
          <div
            key={i}
            data-text
            className="absolute inset-0 z-20 p-16 pointer-events-none"
          >
            {i === 0 && (
              <>
                <div className="absolute top-10 right-10 flex flex-col items-end text-right">
                  <span className="inline-block text-white text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1 rounded-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    {slide.tag}
                  </span>
                  <div className="mt-3">
                    <TxtTlahue className="w-130 h-auto text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]" />
                  </div>
                </div>
                <div className="absolute bottom-10 left-10 max-w-md pointer-events-auto z-20">
                  <div className="absolute -inset-10 bg-black/50 blur-3xl -z-10" />
                  <div className="space-y-3 text-white/95 font-body leading-relaxed">
                    {slide.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </>
            )}

            {i > 0 && (
              <div
                className={`absolute top-10 max-w-lg pointer-events-auto flex flex-col
                ${i === 1 || i === 3 ? "right-10 items-end text-right" : "left-10 items-start text-left"}`}
              >
                <span className="inline-block text-white text-[10px] tracking-[0.2em] uppercase bg-white/5 border border-white/10 backdrop-blur-md px-3 py-1 rounded-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                  {slide.tag}
                </span>
                <div className="mt-4 relative">
                  <div className="absolute -inset-10 bg-black/50 blur-3xl -z-10" />
                  <div className="space-y-3 text-white/95 font-body leading-relaxed">
                    {slide.paragraphs.map((p, j) => (
                      <p key={j} className="text-base leading-relaxed">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </section>
    </div>
  );
}
