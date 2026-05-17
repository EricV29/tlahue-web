import IconPhone from "./icons/IconPhone";
import IconMail from "./icons/IconMail";
import IconFacebook from "./icons/IconFacebook";
import IconInstagram from "./icons/IconInstagram";
import IconWebsite from "./icons/IconWebsite";

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

const president: GovernmentOfficial = {
  id: 1,
  name: "Mtro. Octavio Granados Hernández",
  title: "Presidente Municipal",
  degree: "Maestro en Administración Pública",
  phone: "738 123 4567",
  extension: "101",
  email: "presidente@tlahuelilpan.gob.mx",
  image:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop",
};

const cabinet: GovernmentOfficial[] = [
  {
    id: 2,
    name: "Lic. María Elena Sánchez Rivera",
    title: "Secretaria de Seguridad Pública",
    degree: "Lic. en Derecho",
    phone: "738 123 4567",
    extension: "201",
    email: "seguridad@tlahuelilpan.gob.mx",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
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
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
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
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
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
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
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
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=500&fit=crop",
  },
];

export default function Gobierno() {
  return (
    <section id="gobierno" className="py-16 px-6 bg-[#ffffff]">
      <div className="max-w-[1280px] mx-auto">
        <h2 className="font-display font-medium text-[40px] text-[#111827] tracking-[-0.0200em] leading-[1.1] text-center mb-2">
          Gobierno y Gabinete
        </h2>
        <p className="font-body text-base text-[#4B5563] text-center mb-12">
          Directorio Ciudadano de Atención Municipal
        </p>

        <div className="flex justify-center mb-16">
          <div className="max-w-2xl w-full bg-[#FEFFFC] rounded-2xl p-6 shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#AA642A]/20">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={president.image}
                  alt={president.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-display font-medium text-xl text-[#111827] mb-1">
                  {president.name}
                </h3>
                <p className="font-body text-sm text-[#AA642A] font-medium mb-1">
                  {president.title}
                </p>
                <p className="font-body text-sm text-[#4B5563]">
                  {president.degree}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
                  <a
                    href={`tel:${president.phone}`}
                    className="font-body text-sm text-[#3A85AC] hover:text-[#AA642A] transition-colors inline-flex items-center gap-1"
                  >
                    <IconPhone className="w-4 h-4" />
                    {president.phone} ext. {president.extension}
                  </a>
                  <a
                    href={`mailto:${president.email}`}
                    className="font-body text-sm text-[#3A85AC] hover:text-[#AA642A] transition-colors inline-flex items-center gap-1"
                  >
                    <IconMail className="w-4 h-4" />
                    {president.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cabinet.map((official) => (
            <div
              key={official.id}
              className="bg-[#FEFFFC] rounded-xl p-4 shadow-[rgba(17,24,39,0.03)_0px_8px_24px_0px] border border-[#dee2de]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:bg-[#F9FAF7] group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={official.image}
                    alt={official.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-[#111827]">
                    {official.name}
                  </h3>
                  <p className="font-body text-xs text-[#4B5563]">
                    {official.degree}
                  </p>
                  <p className="font-body text-sm text-[#AA642A] font-medium">
                    {official.title}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#EEF1ED] pt-3 mt-3">
                <div className="flex items-center gap-2 text-[#4B5563] mb-2">
                  <IconPhone className="w-4 h-4" />
                  <span className="font-body text-xs">
                    {official.phone} ext. {official.extension}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#4B5563] mb-3">
                  <IconMail className="w-4 h-4" />
                  <span className="font-body text-xs truncate">
                    {official.email}
                  </span>
                </div>

                <div className="flex gap-2">
                  <a
                    href={`tel:${official.phone}`}
                    className="flex-1 bg-transparent border-2 border-[#3A85AC] text-[#3A85AC] rounded-md px-3 py-1.5 font-body text-xs font-medium hover:bg-[#3A85AC]/5 transition-all text-center"
                  >
                    Llamar
                  </a>
                  <a
                    href={`mailto:${official.email}`}
                    className="flex-1 bg-transparent border-2 border-[#3A85AC] text-[#3A85AC] rounded-md px-3 py-1.5 font-body text-xs font-medium hover:bg-[#3A85AC]/5 transition-all text-center"
                  >
                    Correo
                  </a>
                </div>
              </div>
            </div>
          ))}
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

        <div className="mt-16">
          <h3 className="font-display font-medium text-2xl text-[#111827] tracking-[-0.0200em] leading-[1.1] text-center mb-2">
            Redes Sociales
          </h3>
          <p className="font-body text-base text-[#4B5563] text-center mb-8">
            Síguenos en nuestras plataformas oficiales
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="https://www.facebook.com/profile.php?id=61565068632771"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEFFFC] border border-[#dee2de]/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-[#3A85AC]">
                <IconFacebook className="w-7 h-7 text-[#3A85AC]" />
              </div>
              <span className="font-body text-sm text-[#4B5563] group-hover:text-[#AA642A] transition-colors">
                Facebook
              </span>
            </a>

            <a
              href="https://www.instagram.com/gobiernotlahuelilpan?brid=YWdncwElCUxIIymqdby9WZjaKz0C"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEFFFC] border border-[#dee2de]/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-[#3A85AC]">
                <IconInstagram className="w-7 h-7 text-[#3A85AC]" />
              </div>
              <span className="font-body text-sm text-[#4B5563] group-hover:text-[#AA642A] transition-colors">
                Instagram
              </span>
            </a>

            <a
              href="https://tlahuelilpan.gob.mx"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEFFFC] border border-[#dee2de]/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-[#3A85AC]">
                <IconWebsite className="w-7 h-7 text-[#3A85AC]" />
              </div>
              <span className="font-body text-sm text-[#4B5563] group-hover:text-[#AA642A] transition-colors">
                Página Oficial
              </span>
            </a>

            <a
              href="mailto:presidenciamunicipal@tlahuelilpan.gob.mx"
              className="flex flex-col items-center gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#FEFFFC] border border-[#dee2de]/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-[#3A85AC]">
                <IconMail className="w-7 h-7 text-[#3A85AC]" />
              </div>
              <span className="font-body text-sm text-[#4B5563] group-hover:text-[#AA642A] transition-colors">
                Correo Oficial
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
