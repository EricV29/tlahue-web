import { useState } from "react";
import IconPhone from "./icons/IconPhone";
import IconMail from "./icons/IconMail";
import presidenteImg from "../assets/images/presidente.webp";

interface GovernmentOfficial {
  id: number;
  name: string;
  title: string;
  degree: string;
  phone: string;
  extension: string;
  email: string;
  image: string;
}

const officials: GovernmentOfficial[] = [
  {
    id: 1,
    name: "Mtro. Octavio Granados Hernández",
    title: "Presidente Municipal",
    degree: "Maestro en Administración Pública",
    phone: "738 123 4567",
    extension: "101",
    email: "presidente@tlahuelilpan.gob.mx",
    image: presidenteImg,
  },
  {
    id: 2,
    name: "Lic. María Elena Sánchez Rivera",
    title: "Secretaria de Seguridad Pública",
    degree: "Lic. en Derecho",
    phone: "738 123 4567",
    extension: "201",
    email: "seguridad@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    name: "Ing. Roberto Carlos Mendoza Torres",
    title: "Director de Protección Civil",
    degree: "Ing. Civil",
    phone: "738 123 4567",
    extension: "202",
    email: "proteccion.civil@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop",
  },
  {
    id: 4,
    name: "Lic. Ana Patricia Flores Jiménez",
    title: "Directora de Servicios Municipales",
    degree: "Lic. en Administración",
    phone: "738 123 4567",
    extension: "203",
    email: "servicios@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop",
  },
  {
    id: 5,
    name: "C.P. José Luis Martínez Bautista",
    title: "Tesorero Municipal",
    degree: "Contador Público",
    phone: "738 123 4567",
    extension: "204",
    email: "tesoreria@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop",
  },
  {
    id: 6,
    name: "Dra. Carmen Lucía Herrera Gutiérrez",
    title: "Directora de Salud Pública",
    degree: "Doctora en Medicina",
    phone: "738 123 4567",
    extension: "205",
    email: "salud@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=800&fit=crop",
  },
];

export default function Gobierno() {
  const [selectedOfficial, setSelectedOfficial] = useState(0);

  const selected = officials[selectedOfficial];

  return (
    <section id="gobierno" className="py-16 px-6 bg-[#ffffff]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-medium text-[40px] text-[#111827] tracking-[-0.0200em] leading-[1.1] text-center mb-2">
          Gobierno y Gabinete
        </h2>
        <p className="font-body text-base text-[#4B5563] text-center mb-12">
          Directorio Ciudadano de Atención Municipal
        </p>

        <div className="flex justify-start md:justify-center gap-4 md:gap-6 mb-6 overflow-x-auto pt-3 pb-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {officials.map((official, index) => {
            const isSelected = selectedOfficial === index;

            return (
              <div
                key={official.id}
                className="flex flex-col items-center flex-shrink-0"
              >
                <button
                  onClick={() => setSelectedOfficial(index)}
                  className={`transition-all duration-300 ease-out ${
                    isSelected
                      ? "scale-100 drop-shadow-md"
                      : "scale-90 opacity-40 hover:opacity-80 hover:scale-95"
                  }`}
                >
                  <div
                    className={`w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-4 transition-all duration-300 ${
                      isSelected ? "border-[#AA642A]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={official.image}
                      alt={official.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </button>
                <span
                  className={`mt-2 font-body text-xs text-center max-w-[90px] leading-tight transition-all duration-300 ${
                    isSelected
                      ? "text-[#111827] font-semibold scale-100"
                      : "text-[#4B5563] opacity-40 scale-95"
                  }`}
                >
                  {official.title.split(" de ")[0].split(" y ")[0]}
                </span>
              </div>
            );
          })}
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-2xl overflow-hidden shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50 transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-12 items-center">
            <div className="relative w-full h-[350px] md:h-[450px] md:col-span-5 bg-[#f9faf7]">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-white/10" />
            </div>
            <div className="p-6 md:p-10 md:col-span-7 bg-white flex flex-col justify-between h-full">
              <div className="text-left mb-6 md:mb-8">
                <h3
                  className={`font-display font-medium text-2xl md:text-3xl text-[#111827] mb-2 transition-colors ${
                    selectedOfficial === 0 ? "text-[#AA642A]" : ""
                  }`}
                >
                  {selected.name}
                </h3>

                <span className="inline-block text-xs font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded mb-4 border border-[#D5B35F]/20">
                  {selected.degree}
                </span>

                <p className="font-body text-base md:text-lg text-[#4B5563] font-medium leading-relaxed">
                  {selected.title}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#eef1ed]">
                {/* Teléfono: Acción principal (Jarros Barro) */}
                <a
                  href={`tel:${selected.phone}`}
                  className="w-full sm:w-auto bg-[#AA642A] text-white rounded-md px-5 py-3 font-body text-sm font-medium hover:bg-[#8f5220] transition-all inline-flex items-center justify-center gap-2 shadow-sm"
                >
                  <IconPhone className="w-4 h-4" />
                  <span>
                    {selected.phone}{" "}
                    <span className="text-white/70 text-xs ml-1">
                      ext. {selected.extension}
                    </span>
                  </span>
                </a>

                <a
                  href={`mailto:${selected.email}`}
                  className="w-full sm:w-auto bg-transparent border-2 border-[#3A85AC] text-[#3A85AC] rounded-md px-5 py-2.5 font-body text-sm font-medium hover:bg-[#3A85AC]/10 transition-all inline-flex items-center justify-center gap-2"
                >
                  <IconMail className="w-4 h-4" />
                  <span>{selected.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href="https://tlahuelilpan.gob.mx/gabinete"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-transparent border-2 border-[#3A85AC] text-[#3A85AC] rounded-md px-6 py-2.5 font-body text-base font-medium hover:bg-[#3A85AC]/5 transition-all"
          >
            Ver más
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
