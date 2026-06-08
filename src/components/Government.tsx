import { useState, useEffect } from "react";
import IconPhone from "./icons/IconPhone";
import IconMail from "./icons/IconMail";
import IconArrowRight from "./icons/IconArrowRight";
import { SkeletonAvatar, SkeletonText, SkeletonBlock } from "./Skeleton";
import txtPresidente from "../assets/images/government/txtPresidente.svg";
import txtProteccion from "../assets/images/government/txtProteccion.svg";
import txtSeguridad from "../assets/images/government/txtSeguridad.svg";
import txtAgua from "../assets/images/government/txtAgua.svg";
import txtObras from "../assets/images/government/txtObras.svg";
import txtSocial from "../assets/images/government/txtSocial.svg";
import presidencia from "../assets/images/presidencia.svg";
import { getOfficials, type Official } from "../services/government.service";
import { getImageUrl } from "../utils/cloudinary";

const svgMap: Record<string, string> = {
  presidente: txtPresidente,
  proteccion_civil: txtProteccion,
  seguridad: txtSeguridad,
  comision_agua: txtAgua,
  obras_publicas: txtObras,
  desarrollo_social: txtSocial,
};

export default function Gobierno() {
  const [officials, setOfficials] = useState<Official[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOfficial, setSelectedOfficial] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    getOfficials()
      .then(setOfficials)
      .catch(() => setError("Servicio no disponible"))
      .finally(() => setLoading(false));
  }, []);

  const handleImgError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  if (loading || error) {
    return (
      <section
        id="gobierno"
        className="py-16 px-6 relative min-h-screen"
        aria-busy={loading}
        aria-live="polite"
      >
        <div className="max-w-7xl mx-auto animate-pulse">
          <div className="text-center mb-8 flex flex-col items-center gap-1.5">
            {error && (
              <span role="alert" className="text-red-500">
                {error}
              </span>
            )}
            <SkeletonText className="h-5 w-32 bg-tlahu-gold/20" />
            <SkeletonText className="h-10 w-64" />
          </div>
          <div className="lg:flex justify-start items-center gap-6">
            <div className="flex pt-3 md:justify-center lg:flex-col gap-6 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex flex-col items-center gap-2">
                  <SkeletonAvatar />
                  <SkeletonText className="h-3 w-16" />
                </div>
              ))}
            </div>
            <div className="w-full flex lg:p-4 items-start md:flex-row flex-col gap-4">
              <SkeletonBlock className="w-full md:w-80 lg:w-130 aspect-square" />
              <div className="w-full space-y-3 p-5">
                <SkeletonText className="h-8 w-64" />
                <SkeletonText className="h-4 w-48" />
                <SkeletonBlock />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (officials.length === 0) {
    return (
      <section id="gobierno" className="py-16 px-6 relative">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-[11px] font-mono tracking-wider uppercase text-tlahu-gold bg-tlahu-gold/10 px-2.5 py-0.5 rounded border border-tlahu-gold/20">
            DIRECTORIO CIUDADANO
          </span>
          <h2 className="font-display font-light text-[40px] text-dark-charcoal tracking-[-0.0200em] leading-[1.1] mt-4">
            Gobierno y Gabinete
          </h2>
          <p className="mt-8 text-slate-gray font-body">
            No hay información disponible.
          </p>
        </div>
      </section>
    );
  }

  const selected = officials[selectedOfficial] ?? officials[0];

  return (
    <section id="gobierno" aria-label="Gobierno y Gabinete" className="py-16 px-6 relative">
      <img
        src={presidencia}
        alt=""
        className="absolute z-0 w-100 lg:w-150 -translate-x-1/2 lg:-translate-x-1/3 md:-translate-y-15 left-0 md:left-20 pointer-events-none opacity-10 select-none"
      />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-tlahu-gold bg-tlahu-gold/10 px-2.5 py-0.5 rounded border border-tlahu-gold/20">
            DIRECTORIO CIUDADANO
          </span>
          <h2 className="font-display font-light text-[40px] text-dark-charcoal tracking-[-0.0200em] leading-[1.1]">
            Gobierno y Gabinete
          </h2>
        </div>

        <div className="lg:flex justify-start items-center">
          <div className="flex pt-3 md:justify-center lg:flex-col gap-6 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {officials.map((official, index) => {
              const isSelected = selectedOfficial === index;
              return (
                <button
                  key={official.name || index}
                  onClick={() => setSelectedOfficial(index)}
                  className={`flex flex-col items-center transition-all duration-300 ease-out outline-none focus-visible:ring-2 focus-visible:ring-tlahu-clay focus-visible:ring-offset-2 rounded-lg cursor-pointer ${
                    isSelected
                      ? "scale-105 drop-shadow-md"
                      : "opacity-40 scale-95 hover:opacity-80"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                      isSelected
                        ? "border-tlahu-clay shadow-md"
                        : "border-transparent"
                    }`}
                  >
                    {imgErrors[index] ? (
                      <div className="w-full h-full bg-ash-gray flex items-center justify-center text-slate-gray text-xs">
                        ?
                      </div>
                    ) : (
                      <img
                        src={getImageUrl(official.image)}
                        alt={official.name}
                        loading="lazy"
                        onError={() => handleImgError(index)}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <span
                    className={`font-body text-xs text-center max-w-30 leading-tight transition-all duration-300 ${
                      isSelected
                        ? "text-dark-charcoal font-semibold"
                        : "text-slate-gray"
                    }`}
                  >
                    {official.title.split(" y ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full flex lg:p-4 relative justify-center lg:justify-start items-start md:flex-row flex-col">
            {imgErrors[-1] ? (
              <div className="w-full md:w-80 lg:w-130 aspect-square bg-ash-gray flex items-center justify-center text-slate-gray">
                Imagen no disponible
              </div>
            ) : (
              <img
                src={getImageUrl(selected.image)}
                alt={selected.name}
                loading="lazy"
                onError={() => handleImgError(-1)}
                className="w-full md:w-80 lg:w-130 object-cover mask-[linear-gradient(to_bottom,black_80%,transparent)]"
              />
            )}

            <img
              src={svgMap[selected.textSvg] ?? ""}
              alt=""
              aria-hidden="true"
              className="absolute z-10 w-100 md:w-150 lg:w-270 text-[10px] bottom-2/5 md:bottom-0 lg:bottom-0 lg:right-20 opacity-40 pointer-events-none select-none"
            />

            <div className="w-full md:w-auto flex flex-col lg:items-start justify-center md:justify-center items-center p-5 lg:gap-5">
              <div className="flex flex-col items-center lg:items-start justify-start">
                <h3
                  className={`font-display font-medium text-sm md:text-[25px] lg:text-3xl text-dark-charcoal mb-2 transition-colors ${
                    selectedOfficial === 0 ? "text-tlahu-clay" : ""
                  }`}
                >
                  {selected.name}
                </h3>

                <span className="inline-block text-xs font-mono tracking-wider uppercase text-tlahu-gold bg-tlahu-gold/10 px-2.5 py-0.5 rounded mb-4 border border-tlahu-gold/20">
                  {selected.degree}
                </span>
              </div>

              <div className="flex flex-col lg:flex-row gap-3 lg:pt-4 border-t border-cool-gray">
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="w-full sm:w-auto min-w-0 bg-tlahu-clay text-white rounded-md px-5 py-3 font-body text-sm font-medium hover:brightness-90 transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                  >
                    <IconPhone className="w-4 h-4 shrink-0" />
                    <span className="min-w-0">
                      {selected.phone}{" "}
                      {selected.ext && (
                        <span className="text-white/70 text-xs ml-1">
                          ext. {selected.ext}
                        </span>
                      )}
                    </span>
                  </a>
                )}

                {selected.email && (
                  <a
                    href={`mailto:${selected.email}`}
                    className="w-full sm:w-auto min-w-0 bg-transparent border-2 border-tlahu-blue text-tlahu-blue rounded-md px-5 py-2.5 font-body text-sm font-medium hover:bg-tlahu-blue/10 transition-all inline-flex items-center justify-center gap-2"
                  >
                    <IconMail className="w-4 h-4 shrink-0" />
                    <span className="min-w-0 break-words">{selected.email}</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://tlahuelilpan.gob.mx/gabinete"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-tlahu-blue text-tlahu-blue rounded-md px-6 py-2.5 font-body text-base font-medium hover:bg-tlahu-blue/5 transition-all"
          >
            Ver más
            <IconArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
