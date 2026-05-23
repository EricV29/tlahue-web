import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TxtTlahue from "./icons/TxtTlahue";

import tlahueNoche from "../assets/images/tlahueNoche.webp";
import iglesia from "../assets/images/history/iglesia.webp";
import tlahueAereo from "../assets/images/history/tlahueAereo.webp";
import tlahueDia from "../assets/images/tlahueDia.webp";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    tag: "EL ORIGEN",
    image: tlahueNoche,
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
    image: tlahueDia,
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

  useGSAP(() => {
    const section = sectionRef.current;
    if (!section) return;

    const images = gsap.utils.toArray<HTMLElement>("[data-bg]");
    const texts = gsap.utils.toArray<HTMLElement>("[data-text]");

    gsap.set(images, {
      opacity: 0,
      scale: 1.08,
    });

    gsap.set(images[0], {
      opacity: 1,
      scale: 1,
    });

    gsap.set(texts, {
      autoAlpha: 0,
    });

    gsap.set(texts[0], {
      autoAlpha: 1,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=8000",
        scrub: 2,
        pin: true,
      },
    });

    slides.forEach((_, i) => {
      if (i === 0) return;

      const prevImage = images[i - 1];
      const currentImage = images[i];

      const prevText = texts[i - 1];
      const currentText = texts[i];

      const label = `slide-${i}`;

      tl.add(label);

      // IMAGE TRANSITION

      tl.to(
        prevImage,
        {
          opacity: 0,
          scale: 1.15,
          duration: 2.8,
          ease: "power2.inOut",
        },
        label,
      );

      tl.fromTo(
        currentImage,
        {
          opacity: 0,
          scale: 1.12,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 3.5,
          ease: "power2.inOut",
        },
        label,
      );

      // TEXT OUT

      tl.to(
        prevText,
        {
          autoAlpha: 0,
          duration: 0.8,
        },
        `${label}+=0.8`,
      );

      // TEXT IN (más tarde)

      tl.fromTo(
        currentText,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        },
        `${label}+=2.3`,
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const renderParagraphs = (paragraphs: string[]) => (
    <div className="space-y-3 max-w-lg">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className="text-white/85 text-sm md:text-base leading-relaxed"
        >
          {p}
        </p>
      ))}
    </div>
  );

  return (
    <section
      id="historia"
      ref={sectionRef}
      className="relative h-screen overflow-hidden bg-black"
    >
      {/* IMAGES */}

      {slides.map((slide, i) => (
        <div
          id="target-historia"
          key={i}
          data-bg
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      ))}

      {/* DARK OVERLAY */}

      <div className="absolute inset-0 z-10" />

      {/* TEXT LAYERS */}

      {slides.map((slide, i) => (
        <div key={i} data-text className="absolute inset-0 z-20 p-8 md:p-16">
          {/* SLIDE 1 */}

          {i === 0 && (
            <>
              <div className="absolute top-10 right-10 text-right">
                <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                  {slide.tag}
                </span>

                <div className="mt-3">
                  <TxtTlahue className="w-65 md:w-130 text-white" />
                </div>
              </div>

              <div className="absolute bottom-10 left-10">
                {renderParagraphs(slide.paragraphs)}
              </div>
            </>
          )}

          {/* SLIDE 2 */}

          {i === 1 && (
            <div className="absolute top-10 right-10 text-right">
              <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                {slide.tag}
              </span>

              <div className="mt-4">{renderParagraphs(slide.paragraphs)}</div>
            </div>
          )}

          {/* SLIDE 3 */}

          {i === 2 && (
            <div className="absolute top-10 left-10">
              <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                {slide.tag}
              </span>

              <div className="mt-4">{renderParagraphs(slide.paragraphs)}</div>
            </div>
          )}

          {/* SLIDE 4 */}

          {i === 3 && (
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
              <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                {slide.tag}
              </span>

              <div className="mt-4">{renderParagraphs(slide.paragraphs)}</div>
            </div>
          )}

          {/* SLIDE 5 */}

          {i === 4 && (
            <div className="absolute bottom-10 right-10 text-right">
              <span className="text-white/70 text-[10px] tracking-[0.2em] uppercase">
                {slide.tag}
              </span>

              <div className="mt-4">{renderParagraphs(slide.paragraphs)}</div>
            </div>
          )}
        </div>
      ))}
    </section>
  );
}
