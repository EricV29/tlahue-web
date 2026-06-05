import { useState, useEffect, useMemo, useCallback } from "react";
import IconCalendar from "./icons/IconCalendar";
import IconLocation from "./icons/IconLocation";
import IconClose from "./icons/IconClose";
import reloj from "../assets/images/reloj.svg";
import carnaval from "../assets/images/events/carnaval.webp";
import cerveza from "../assets/images/events/cerveza.webp";
import feria from "../assets/images/events/feria.webp";
import muertos from "../assets/images/events/muertos.webp";
import navidad from "../assets/images/events/navidad.webp";
import aniversario from "../assets/images/events/aniversario.webp";
import mexico from "../assets/images/events/mexico.webp";
import { getImageUrl } from "../utils/cloudinary";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { getEventsByMonth, type TlaueEvents } from "../services/events.service";

interface MonthOption {
  id: number;
  name: string;
  icon: string | null;
}

const months: MonthOption[] = [
  { id: 1, name: "Enero", icon: aniversario },
  { id: 2, name: "Febrero", icon: carnaval },
  { id: 3, name: "Marzo", icon: null },
  { id: 4, name: "Abril", icon: cerveza },
  { id: 5, name: "Mayo", icon: feria },
  { id: 6, name: "Junio", icon: null },
  { id: 7, name: "Julio", icon: null },
  { id: 8, name: "Agosto", icon: null },
  { id: 9, name: "Septiembre", icon: mexico },
  { id: 10, name: "Octubre", icon: feria },
  { id: 11, name: "Noviembre", icon: muertos },
  { id: 12, name: "Diciembre", icon: navidad },
];

export default function Novedades() {
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [events, setEvents] = useState<TlaueEvents[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

  const closeLightbox = useCallback(() => setLightboxUrl(null), []);
  const lightboxRef = useFocusTrap(!!lightboxUrl);

  useEffect(() => {
    document.dispatchEvent(
      new CustomEvent(lightboxUrl ? "lightbox:open" : "lightbox:close"),
    );
  }, [lightboxUrl]);

  useEffect(() => {
    if (!lightboxUrl) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxUrl, closeLightbox]);

  useEffect(() => {
    getEventsByMonth(now.getFullYear(), selectedMonth)
      .then(setEvents)
      .catch(() => {
        setEvents([]);
        setError("Error get events");
      })
      .finally(() => setLoading(false));
  }, [selectedMonth]);

  const formattedEvents = useMemo(() => {
    return events.map((event) => {
      const startObj = new Date(event.startDate);
      const endObj = new Date(event.endDate);

      const formatToUiDate = (dateObj: Date) =>
        dateObj
          .toLocaleDateString("es-MX", { day: "numeric", month: "short" })
          .replace(".", "");

      const formatToCalendarIso = (dateObj: Date) =>
        dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");

      return {
        ...event,
        uiStartDate: formatToUiDate(startObj),
        uiEndDate: formatToUiDate(endObj),
        calendarDates: `${formatToCalendarIso(startObj)}/${formatToCalendarIso(endObj)}`,
      };
    });
  }, [events]);

  return (
    <section id="eventos" aria-label="Eventos" className="relative py-16 px-6">
      <img
        src={reloj}
        alt=""
        className="absolute z-0 w-50 md:w-[20rem] top-1/2 -translate-y-1/2 right-0 md:right-20 opacity-10 pointer-events-none select-none"
      />

      <div className="relative max-w-7xl mx-auto z-10">
        {/* Title */}
        <div className="text-center mb-8 flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20">
            Actualidad Local
          </span>
          <h2 className="font-display font-light text-[40px] text-dark-charcoal tracking-[-0.0200em] leading-[1.1]">
            Eventos
          </h2>
        </div>

        {/* Months */}
        <div className="flex md:justify-center gap-2 overflow-x-auto py-4 mb-8 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
          {months.map((month) => {
            const isSelected = selectedMonth === month.id;

            return (
              <button
                key={month.name}
                onClick={() => setSelectedMonth(month.id)}
                className={`relative shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#AA642A] text-white"
                    : "bg-[#F9FAF7] text-[#374151] border border-[#fff5dd] hover:bg-tlahu-gold/20"
                } ${month.icon ? "pr-7" : ""}`}
              >
                {month.icon && (
                  <img
                    src={month.icon}
                    alt={`Icono ${month.name}`}
                    className="absolute -top-1 -right-1 w-6 rotate-15 drop-shadow-sm pointer-events-none"
                  />
                )}
                {month.name}
              </button>
            );
          })}
        </div>

        {/* Events */}
        {loading || error ? (
          <div className="min-h-125 animate-pulse" aria-busy={loading ? "true" : undefined}>
                <span role="alert" className="text-red-500">{error}</span>
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="shrink-0 w-70 bg-white rounded-xl overflow-hidden border border-[#dee2de]/50"
                >
                  <div className="h-40 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                    <div className="h-5 w-48 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden border border-[#dee2de]/50"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-4 space-y-3">
                    <div className="h-3 w-32 bg-gray-200 rounded" />
                    <div className="h-6 w-48 bg-gray-200 rounded" />
                    <div className="h-10 w-full bg-gray-200 rounded" />
                    <div className="h-3 w-24 bg-gray-200 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="min-h-125">
            {events.length === 0 ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F9FAF7] mb-4">
                  <IconCalendar className="text-[#4B5563]" />
                </div>
                <p className="font-body text-lg text-[#4B5563] mb-2">
                  No hay eventos programados
                </p>
                <p className="font-body text-sm text-[#4B5563]/70">
                  Explora otros meses para descubrir las actividades de
                  Tlahuelilpan
                </p>
              </div>
            ) : (
              <>
                {/* Events Mobile */}
                <div className="flex md:hidden gap-4 overflow-x-auto pb-4 -mx-6 px-6">
                  {formattedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="shrink-0 w-70 bg-white rounded-xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50"
                    >
                      <button
                        type="button"
                        className="h-40 w-full overflow-hidden cursor-pointer appearance-none bg-transparent border-none p-0 text-left"
                        onClick={() => setLightboxUrl(getImageUrl(event.image))}
                      >
                        <img
                          src={getImageUrl(event.image)}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </button>
                      <div className="p-4">
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.calendarDates}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location + ", Tlahuelilpan Hidalgo")}`}
                          className="flex items-center gap-2 text-[#4B5563] mb-2"
                        >
                          <IconCalendar className="w-4 h-4" />
                          <span className="font-body text-xs hover:text-[#D5B35F] hover:underline transition-colors min-w-0">
                            {event.uiStartDate}{" "}
                            {event.uiStartDate !== event.uiEndDate
                              ? `- ${event.uiEndDate}`
                              : ""}{" "}
                            | agendar
                            <span className="sr-only"> (se abre en nueva ventana)</span>
                          </span>
                        </a>
                        <h3 className="font-display font-medium text-lg text-dark-charcoal mb-2">
                          {event.title}
                        </h3>
                        <p className="font-body text-sm text-[#4B5563] mb-2">
                          {event.description}
                        </p>
                        <a
                          href={event.link}
                          target="_blank"
                          rel="noopener noreferrer"
                           className="flex items-center gap-1 text-[#4B5563] hover:text-[#3A85AC] hover:underline transition-colors min-w-0"
                        >
                          <IconLocation className="w-3.5 h-3.5" />
                          <span className="font-body text-xs truncate">
                            {event.location}
                          </span>
                          <span className="sr-only"> (se abre en nueva ventana)</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Events PC */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {formattedEvents.map((event) => (
                    <div
                      key={event.id}
                      className="bg-white rounded-xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50 transition-all duration-300 hover:shadow-lg"
                    >
                      <button
                        type="button"
                        className="h-48 w-full overflow-hidden cursor-pointer appearance-none bg-transparent border-none p-0 text-left"
                        onClick={() => setLightboxUrl(getImageUrl(event.image))}
                      >
                        <img
                          src={getImageUrl(event.image)}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-120"
                        />
                      </button>
                      <div className="p-4">
                        <a
                          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${event.calendarDates}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location + ", Tlahuelilpan Hidalgo")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[#4B5563] w-fit mb-2"
                        >
                          <IconCalendar className="w-4 h-4" />
                          <span className="font-body text-xs hover:text-[#D5B35F] hover:underline transition-colors min-w-0">
                            {event.uiStartDate}{" "}
                            {event.uiStartDate !== event.uiEndDate
                              ? `- ${event.uiEndDate}`
                              : ""}{" "}
                            | agendar
                            <span className="sr-only"> (se abre en nueva ventana)</span>
                          </span>
                        </a>
                        <h3 className="font-display font-medium text-xl text-dark-charcoal mb-2">
                          {event.title}
                        </h3>
                        <p className="font-body text-sm text-[#4B5563] mb-4">
                          {event.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <a
                            href={event.link}
                            target="_blank"
                            rel="noopener noreferrer"
                             className="flex items-center gap-1 text-[#3A85AC] hover:text-[#D5B35F] hover:underline transition-colors min-w-0"
                          >
                            <IconLocation className="w-3.5 h-3.5" />
                            <span className="font-body text-xs truncate">
                              {event.location}
                            </span>
                            <span className="sr-only"> (se abre en nueva ventana)</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {lightboxUrl && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <IconClose className="w-8 h-8" />
          </button>
          <img
            src={lightboxUrl}
            alt="Evento"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
