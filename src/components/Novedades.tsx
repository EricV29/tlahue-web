import { useState } from "react";
import IconCalendar from "./icons/IconCalendar";
import IconArrowRight from "./icons/IconArrowRight";
import IconLocation from "./icons/IconLocation";

interface Event {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
  location: string;
}

const months = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const eventsByMonth: Record<number, Event[]> = {
  0: [
    {
      id: 1,
      title: "Día de Reyes",
      startDate: "6 ene",
      endDate: "6 ene",
      description: "Celebración tradicional con paseo de los Reyes Magos y distribución de regalos a los niños.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      location: "Parroquia de San Juan Bautista"
    },
    {
      id: 2,
      title: "Feria del Pulque",
      startDate: "15 ene",
      endDate: "20 ene",
      description: "Festival gastronómico celebrate la tradición del pulque hidalguense con muestras y degustaciones.",
      image: "https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?w=600&h=400&fit=crop",
      location: "Zócalo Municipal"
    }
  ],
  1: [
    {
      id: 3,
      title: "Carnaval Tlahuelilpan",
      startDate: "10 feb",
      endDate: "14 feb",
      description: "El carnival más colorful del Valle del Mezquital con desfiles, música y baile tradicional.",
      image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop",
      location: "Avenida Principal"
    }
  ],
  2: [
    {
      id: 4,
      title: "Semana Santa",
      startDate: "10 abr",
      endDate: "17 abr",
      description: "Representaciones religiosas y procesiones tradicionales por las calles del municipio.",
      image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&h=400&fit=crop",
      location: "Parroquia de San Juan Bautista"
    },
    {
      id: 5,
      title: "Festival de la Primavera",
      startDate: "21 mar",
      endDate: "25 mar",
      description: "Celebración del equinoccio de primavera con actividades al aire libre y música tradicional.",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&h=400&fit=crop",
      location: "Parque Municipal"
    }
  ],
  3: [
    {
      id: 6,
      title: "Feria Municipal",
      startDate: "1 may",
      endDate: "10 may",
      description: "La feria más importante del año con exposiciones ganaderas, juegos mecánicos y puestos tradicionales.",
      image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=600&h=400&fit=crop",
      location: "Explanada de la Feria"
    }
  ],
  4: [],
  5: [
    {
      id: 7,
      title: "Fiesta de San Juan",
      startDate: "24 jun",
      endDate: "29 jun",
      description: "Honores al santo patrono con misas, procesiones y festividades populares.",
      image: "https://images.unsplash.com/photo-1548625361-e88c60eb355c?w=600&h=400&fit=crop",
      location: "Parroquia de San Juan Bautista"
    }
  ],
  6: [],
  7: [
    {
      id: 8,
      title: "Festival del Mezquite",
      startDate: "15 ago",
      endDate: "20 ago",
      description: "Celebración de la flora local con exposiciones, gastronomía y actividades culturales.",
      image: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&h=400&fit=crop",
      location: "Centro de Convenciones"
    }
  ],
  8: [
    {
      id: 9,
      title: "Grito de Independencia",
      startDate: "15 sep",
      endDate: "16 sep",
      description: "Celebración patriótica con Verbena Popular, fuegos artificiales y presentación del escudo local.",
      image: "https://images.unsplash.com/photo-1569929470868-52f8a3615013?w=600&h=400&fit=crop",
      location: "Zócalo Municipal"
    },
    {
      id: 10,
      title: "Expo Artesanal",
      startDate: "20 sep",
      endDate: "25 sep",
      description: "Exposición de artesanías locales: Talavera, bordados y productos de obsidiana.",
      image: "https://images.unsplash.com/photo-1459909633680-206dc5c67abb?w=600&h=400&fit=crop",
      location: "Casa de la Cultura"
    }
  ],
  9: [
    {
      id: 11,
      title: "Festival de la Calabaza",
      startDate: "1 oct",
      endDate: "5 oct",
      description: "Celebración otoñal con plats typique de la región y competencias culinarias.",
      image: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?w=600&h=400&fit=crop",
      location: "Plaza de la Revolución"
    }
  ],
  10: [
    {
      id: 12,
      title: "Día de Muertos",
      startDate: "1 nov",
      endDate: "2 nov",
      description: "Tradición centenaria con altares, recorrido de catrinas y música de盼乐队.",
      image: "https://images.unsplash.com/photo-1509622905150-fa66d3906e09?w=600&h=400&fit=crop",
      location: "Zócalo Municipal"
    },
    {
      id: 13,
      title: "Expo Ganadera",
      startDate: "15 nov",
      endDate: "20 nov",
      description: "Exposición de ganado ovino y caprino con subastas y competencias.",
      image: "https://images.unsplash.com/photo-1500043357865-c6b88277108f?w=600&h=400&fit=crop",
      location: "Expo Ganadera Tlahuelilpan"
    }
  ],
  11: [
    {
      id: 14,
      title: "Posada Navideña",
      startDate: "16 dic",
      endDate: "24 dic",
      description: "Posadas tradicionales en el zócalo con villancicos, piñatas y ponche.",
      image: "https://images.unsplash.com/photo-1512909006721-3d6018887383?w=600&h=400&fit=crop",
      location: "Zócalo Municipal"
    },
    {
      id: 15,
      title: "Noche de Rábanos",
      startDate: "23 dic",
      endDate: "23 dic",
      description: "Competencia de arte en rábanos, figuras deiflora y pasteles tradicionales.",
      image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=600&h=400&fit=crop",
      location: "Mercado Municipal"
    }
  ]
};

export default function Novedades() {
  const currentMonth = new Date().getMonth();
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const events = eventsByMonth[selectedMonth] || [];

  return (
    <section id="novedades" className="py-16 px-6 bg-[#FEFFFC]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-light text-[40px] text-[#111827] tracking-[-0.0200em] leading-[1.1] text-center mb-8">
          Novedades
        </h2>

        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {months.map((month, index) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-full font-body text-sm font-medium transition-all duration-300 ${
                selectedMonth === index
                  ? "bg-[#AA642A] text-white"
                  : "bg-[#F9FAF7] text-[#374151] border border-[#EEF1ED] hover:bg-[#EEF1ED]"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {events.length === 0 ? (
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
            <div className="flex md:hidden gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-6 px-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-[280px] bg-white rounded-xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50"
                >
                  <div className="h-40 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[#4B5563] mb-2">
                      <IconCalendar className="w-4 h-4" />
                      <span className="font-body text-xs">
                        {event.startDate} - {event.endDate}
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-lg text-[#111827] mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-[#4B5563] line-clamp-2 mb-2">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-1 text-[#4B5563]">
                      <IconLocation className="w-3.5 h-3.5" />
                      <span className="font-body text-xs truncate">
                        {event.location}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-[#4B5563] mb-2">
                      <IconCalendar className="w-4 h-4" />
                      <span className="font-body text-xs">
                        {event.startDate} - {event.endDate}
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-xl text-[#111827] mb-2">
                      {event.title}
                    </h3>
                    <p className="font-body text-sm text-[#4B5563] mb-4 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[#4B5563]">
                        <IconLocation className="w-3.5 h-3.5" />
                        <span className="font-body text-xs truncate">
                          {event.location}
                        </span>
                      </div>
                      <button className="font-body text-sm font-medium text-[#AA642A] hover:text-[#D5B35F] transition-colors inline-flex items-center gap-1">
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