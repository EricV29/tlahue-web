import { useEffect, useRef, useState } from "react";
import iglesiaImg from "../assets/images/history/iglesia.webp";
import tlahueAereoImg from "../assets/images/history/tlahueAereo.webp";
import TxtTlahue from "./icons/TxtTlahue";
import tlahueNocheImg from "../assets/images/tlahueNoche.webp";

const historySlides = [
  {
    tag: "EL ORIGEN",
    title: TxtTlahue,
    paragraphs: [
      "Mucho antes de la llegada española, este fértil valle fue habitado por tribus otomíes. Su nombre náhuatl evoca con orgullo al 'lugar de las aguas rebosantes'.",
      "Desde sus orígenes, esta tierra destacó por su riqueza agrícola y por ser un punto estratégico de encuentro y paso para grandes civilizaciones.",
    ],
  },
  {
    tag: "SAN FRANCISCO",
    title: TxtTlahue,
    paragraphs: [
      "En el año 1560, los españoles fundaron el Templo de San Francisco de Asís, una joya arquitectónica considerada 'única en su género'.",
      "Su diseño plateresco logró fusionar el estilo europeo con sutiles impresiones indigenistas, dando como resultado una fachada de serena belleza.",
    ],
  },

  {
    tag: "EXPLENDOR AGRÍCOLA",
    title: TxtTlahue,
    paragraphs: [
      "A fines del siglo XIX, se consolidó aquí una hacienda tan inmensa que explotaba tierras de Tula, Atitalaquia, Tlaxcoapan, Tezontepec y Mixquiahuala.",
      "Su enorme potencial agrícola convirtió a Tlahuelilpan en un centro de gran riqueza y en el motor económico más importante de toda la región.",
    ],
  },
  {
    tag: "REVOLUCIÓN y CAMBIO",
    title: TxtTlahue,
    paragraphs: [
      "Con el movimiento revolucionario de 1910 y la caída del porfiriato, la opulencia de la gran hacienda y su situación económica declinaron por completo.",
      "Aquellas inmensas extensiones de tierra fueron recuperadas por la fuerza de su gente, dividiéndose finalmente en los ejidos y pequeñas propiedades actuales.",
    ],
  },
  {
    tag: "SOBERANÍA LIBRE",
    title: TxtTlahue,
    paragraphs: [
      "Tras pertenecer formalmente al municipio de Tlaxcoapan durante décadas, la justicia histórica llegó en el mes de enero del año 1970.",
      "En esa fecha, Tlahuelilpan fue oficialmente elevado a la categoría de Municipio, consolidando la identidad, orgullo y dinamismo que lo definen hoy.",
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
  const TitleComponent = historySlides[currentSlideIndex].title;

  return (
    <section
      ref={sectionRef}
      id="historia"
      className="relative scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none"
      style={{ height: "350vh" }}
    >
      <div
        id="target-historia"
        className="absolute top-[20vh] left-0 w-full h-0 pointer-events-none"
      />
      {/* Contenedor Fijo */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* CAPA 1: Imagen Exterior (Iglesia) */}
        <div
          className="absolute inset-0 bg-cover bg-position-[center_15%] origin-[center_15%] will-change-transform"
          style={{
            backgroundImage: `url(${tlahueNocheImg})`,
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

        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 md:p-12 max-w-360 mx-auto w-full pointer-events-none">
          {/* Título */}
          <div
            className="w-full flex justify-end transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            <div className="flex flex-col items-end">
              <span className="inline-block text-[10px] font-mono tracking-wider uppercase text-white bg-[#3A85AC]/40 px-2.5 py-1 rounded border border-gray/70 mb-3">
                {historySlides[currentSlideIndex].tag}
              </span>
              <TitleComponent className="md:w-187 text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] select-none pointer-events-none" />
            </div>
          </div>

          {/* Párrafos */}
          <div
            className="w-80 flex justify-start pb-12 transition-opacity duration-300"
            style={{ opacity: textOpacity }}
          >
            <div className="w-full max-w-xl bg-[#3A85AC]/30 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-6 md:p-8 shadow-[rgba(0,0,0,0.06)_0px_4px_20px_0px] pointer-events-auto">
              <div className="space-y-4 text-white font-body text-sm md:text-base leading-relaxed text-justify">
                {historySlides[currentSlideIndex].paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
