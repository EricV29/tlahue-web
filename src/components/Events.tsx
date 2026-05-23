import { useState } from "react";
import IconCalendar from "./icons/IconCalendar";
import IconArrowRight from "./icons/IconArrowRight";
import IconLocation from "./icons/IconLocation";
import reloj from "../assets/reloj.svg";
import carnaval from "../assets/images/carnaval.webp";
import cerveza from "../assets/images/cerveza.webp";
import feria from "../assets/images/feria.webp";
import muertos from "../assets/images/muertos.webp";
import navidad from "../assets/images/navidad.webp";
import aniversario from "../assets/images/aniversario.webp";
import mexico from "../assets/images/mexico.webp";

interface Event {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  location: string;
  link: string;
}

interface MonthOption {
  id: number;
  name: string;
  icon: string | null;
}

const months: MonthOption[] = [
  { id: 0, name: "Enero", icon: aniversario },
  { id: 1, name: "Febrero", icon: carnaval },
  { id: 2, name: "Marzo", icon: null },
  { id: 3, name: "Abril", icon: cerveza },
  { id: 4, name: "Mayo", icon: feria },
  { id: 5, name: "Junio", icon: null },
  { id: 6, name: "Julio", icon: null },
  { id: 7, name: "Agosto", icon: null },
  { id: 8, name: "Septiembre", icon: mexico },
  { id: 9, name: "Octubre", icon: feria },
  { id: 10, name: "Noviembre", icon: muertos },
  { id: 11, name: "Diciembre", icon: navidad },
];

const eventsByMonth: Record<number, Event[]> = {
  0: [
    {
      id: 1,
      title: "Día de Reyes",
      startDate: "2026-01-10T16:00:00",
      endDate: "2026-01-15T20:00:00",
      description:
        "Celebración tradicional con paseo de los Reyes Magos y distribución de regalos a los niños.",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      location: "Parroquia de San Juan Bautista",
      link: "https://www.google.com.mx/maps?hl=es",
    },
    {
      id: 2,
      title: "Feria del Pulque",
      startDate: "2026-01-20T16:00:00",
      endDate: "2026-01-25T20:00:00",
      description:
        "Festival gastronómico celebrate la tradición del pulque hidalguense con muestras y degustaciones.",
      image:
        "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=400&fit=crop",
      location: "Zócalo Municipal",
      link: "https://www.google.com.mx/maps?hl=es",
    },
  ],
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: [],
  9: [],
  10: [],
  11: [],
};

export default function Novedades() {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const monthEvents = eventsByMonth[selectedMonth] || [];

  const formattedEvents = monthEvents.map((event) => {
    const startObj = new Date(event.startDate);
    const endObj = new Date(event.endDate);

    const formatToUiDate = (dateObj: Date) => {
      return dateObj
        .toLocaleDateString("es-MX", {
          day: "numeric",
          month: "short",
        })
        .replace(".", "");
    };

    const formatToCalendarIso = (dateObj: Date) => {
      return dateObj.toISOString().replace(/-|:|\.\d\d\d/g, "");
    };

    return {
      ...event,
      uiStartDate: formatToUiDate(startObj),
      uiEndDate: formatToUiDate(endObj),
      calendarDates: `${formatToCalendarIso(startObj)}/${formatToCalendarIso(endObj)}`,
    };
  });

  return (
    <section id="eventos" className="relative py-16 px-6">
      <img
        src={reloj}
        alt="relojSvg"
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
        {formattedEvents.length === 0 ? (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F9FAF7] mb-4">
              <IconCalendar className="text-[#4B5563]" />
            </div>
            <p className="font-body text-lg text-[#4B5563] mb-2">
              No hay eventos programados
            </p>
            <p className="font-body text-sm text-[#4B5563]/70">
              Explora otros meses para descubrir las actividades de Tlahuelilpan
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
                  <div className="h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
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
                      </span>
                    </a>
                    <h3 className="font-display font-medium text-lg text-dark-charcoal mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-[#4B5563] line-clamp-2 mb-2">
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
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-120"
                    />
                  </div>
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
                      </span>
                    </a>
                    <h3 className="font-display font-medium text-xl text-dark-charcoal mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-[#4B5563] mb-4 line-clamp-2">
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
                      </a>

                      <button className="font-body text-sm font-medium text-[#AA642A] hover:text-[#D5B35F] transition-colors inline-flex items-center gap-1 cursor-pointer">
                        Ver más
                        <IconArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
