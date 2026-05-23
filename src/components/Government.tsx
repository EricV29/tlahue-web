import { useState } from "react";
import IconPhone from "./icons/IconPhone";
import IconMail from "./icons/IconMail";
import presidenteImg from "../assets/images/government/presidente.webp";
import proteccioncivil from "../assets/images/government/proteccioncivil.webp";
import comisionagua from "../assets/images/government/comisionagua.webp";
import desarrollosocial from "../assets/images/government/desarrollosocial.webp";
import seguridadpublica from "../assets/images/government/seguridadpublica.webp";
import obraspublicas from "../assets/images/government/obraspublicas.webp";
import txtPresidente from "../assets/images/government/txtPresidente.svg";
import txtProteccion from "../assets/images/government/txtProteccion.svg";
import txtSeguridad from "../assets/images/government/txtSeguridad.svg";
import txtAgua from "../assets/images/government/txtAgua.svg";
import txtObras from "../assets/images/government/txtObras.svg";
import txtSocial from "../assets/images/government/txtSocial.svg";
import presidencia from "../assets/presidencia.svg";

interface GovernmentOfficial {
  id: number;
  name: string;
  title: string;
  degree: string;
  phone: string;
  extension: string;
  email: string;
  image: string;
  textSvg: string;
}

const officials: GovernmentOfficial[] = [
  {
    id: 1,
    name: "Mtro. Octavio Granados Hernández",
    title: "Presidente",
    degree: "Maestro en Administración Pública",
    phone: "738 123 4567",
    extension: "101",
    email: "presidente@tlahuelilpan.gob.mx",
    image: presidenteImg,
    textSvg: txtPresidente,
  },
  {
    id: 2,
    name: "Lic. María Elena Sánchez Rivera",
    title: "Protección civil",
    degree: "Lic. en Derecho",
    phone: "738 123 4567",
    extension: "201",
    email: "seguridad@tlahuelilpan.gob.mx",
    image: proteccioncivil,
    textSvg: txtProteccion,
  },
  {
    id: 3,
    name: "Ing. Roberto Carlos Mendoza Torres",
    title: "Seguridad Pública",
    degree: "Ing. Civil",
    phone: "738 123 4567",
    extension: "202",
    email: "proteccion.civil@tlahuelilpan.gob.mx",
    image: seguridadpublica,
    textSvg: txtSeguridad,
  },
  {
    id: 4,
    name: "Lic. Ana Patricia Flores Jiménez",
    title: "Comisión Agua",
    degree: "Lic. en Administración",
    phone: "738 123 4567",
    extension: "203",
    email: "servicios@tlahuelilpan.gob.mx",
    image: comisionagua,
    textSvg: txtAgua,
  },
  {
    id: 5,
    name: "C.P. José Luis Martínez Bautista",
    title: "Desarrollo Social",
    degree: "Contador Público",
    phone: "738 123 4567",
    extension: "204",
    email: "tesoreria@tlahuelilpan.gob.mx",
    image: desarrollosocial,
    textSvg: txtSocial,
  },
  {
    id: 6,
    name: "Dra. Carmen Lucía Herrera Gutiérrez",
    title: "Obras Públicas",
    degree: "Doctora",
    phone: "738 123 4567",
    extension: "205",
    email: "salud@tlahuelilpan.gob.mx",
    image: obraspublicas,
    textSvg: txtObras,
  },
];

export default function Gobierno() {
  const [selectedOfficial, setSelectedOfficial] = useState(0);

  const selected = officials[selectedOfficial];

  return (
    <section id="gobierno" className="py-16 px-6 relative">
      <img
        src={presidencia}
        alt="presidenciaSvg"
        className="absolute z-0 w-100 lg:w-150 -translate-x-1/2 lg:-translate-x-1/3 md:-translate-y-20 left-0 md:left-20 pointer-events-none opacity-10 select-none"
      />

      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8 flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20">
            DIRECTORIO CIUDADANO
          </span>
          <h2 className="font-display font-light text-[40px] text-dark-charcoal tracking-[-0.0200em] leading-[1.1]">
            Gobierno y Gabinete
          </h2>
        </div>

        <div className="lg:flex justify-start items-center">
          {/* Selector */}
          <div className="flex pt-3 md:justify-center lg:flex-col gap-6 overflow-x-auto scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none">
            {officials.map((official, index) => {
              const isSelected = selectedOfficial === index;
              return (
                <button
                  key={official.name || index}
                  onClick={() => setSelectedOfficial(index)}
                  className={`flex flex-col items-center transition-all duration-300 ease-out outline-none cursor-pointer ${
                    isSelected
                      ? "scale-105 drop-shadow-md"
                      : "opacity-40 scale-95 hover:opacity-80"
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-full overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                      isSelected
                        ? "border-[#AA642A] shadow-md"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={official.image}
                      alt={official.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span
                    className={`font-body text-xs text-center max-w-30 leading-tight transition-all duration-300 ${
                      isSelected
                        ? "text-[#111827] font-semibold"
                        : "text-[#4B5563]"
                    }`}
                  >
                    {official.title.split(" de ")[0].split(" y ")[0]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="w-full flex lg:p-4 relative justify-center lg:justify-start items-start md:flex-row flex-col">
            {/* Image avatar */}
            <img
              src={selected.image}
              alt={selected.name}
              className="w-full md:w-80 lg:w-130 object-cover mask-[linear-gradient(to_bottom,black_80%,transparent)]"
            />

            {/* Text avatar */}
            <img
              src={selected.textSvg}
              alt="txtPresidenteSvg"
              className="absolute z-10 w-100 md:w-150 lg:w-270 text-[10px] bottom-2/5 md:bottom-0 lg:bottom-0 lg:right-20 opacity-40 pointer-events-none select-none"
            />

            {/* Information */}
            <div className="w-full md:w-auto flex flex-col lg:items-start justify-center md:justify-center items-center p-5 lg:gap-5">
              {/* Name */}
              <div className="flex flex-col items-center lg:items-start justify-start">
                <h3
                  className={`font-display font-medium text-1xl md:text-25 lg:text-3xl text-[#111827] mb-2 transition-colors ${
                    selectedOfficial === 0 ? "text-[#AA642A]" : ""
                  }`}
                >
                  {selected.name}
                </h3>

                <span className="inline-block text-xs font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded mb-4 border border-[#D5B35F]/20">
                  {selected.degree}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col lg:flex-row gap-3 lg:pt-4 border-t border-[#eef1ed]">
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
