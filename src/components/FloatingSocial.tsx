import { useState } from "react";
import type { SectionId } from "../App";
import IconLink from "./icons/IconLink";
import IconFacebook from "./icons/IconFacebook";
import IconInstagram from "./icons/IconInstagram";
import IconWebsite from "./icons/IconWebsite";
import IconMail from "./icons/IconMail";

export default function FloatingSocial({
  activeSection,
}: {
  activeSection: SectionId;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/HMunicipioTlahuelilpan",
      icon: IconFacebook,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/tlahuelilpan_oficial",
      icon: IconInstagram,
    },
    {
      name: "Página Oficial",
      href: "https://tlahuelilpan.gob.mx",
      icon: IconWebsite,
    },
    {
      name: "Correo Oficial",
      href: "mailto:presidenciamunicipal@tlahuelilpan.gob.mx",
      icon: IconMail,
    },
  ];

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ease-in-out ${
        activeSection === "historia"
          ? "opacity-0 translate-x-5 pointer-events-none"
          : "opacity-100 translate-x-0"
      }`}
    >
      <div className="relative">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "mb-4" : "mb-0"
          }`}
        >
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-12 h-12 rounded-full bg-[#FEFFFC] border border-[#dee2de]/50 shadow-lg text-[#3A85AC] hover:text-[#AA642A] hover:border-[#3A85AC] transition-all duration-300 block ${
                isOpen
                  ? "opacity-100 translate-y-0 mb-3"
                  : "opacity-0 translate-y-4 pointer-events-none"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#AA642A] text-white shadow-lg hover:bg-[#8f5220] transition-all duration-300"
          aria-label="Redes sociales"
        >
          <IconLink className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
        </button>
      </div>
    </div>
  );
}