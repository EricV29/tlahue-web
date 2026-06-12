import type { SectionId } from "../App";
import FloatingPanel from "./FloatingPanel";
import IconLink from "./icons/IconLink";
import IconFacebook from "./icons/IconFacebook";
import IconInstagram from "./icons/IconInstagram";
import IconWebsite from "./icons/IconWebsite";
import IconMail from "./icons/IconMail";

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

export default function FloatingSocial({
  activeSection,
}: {
  activeSection: SectionId;
}) {
  return (
    <FloatingPanel
      activeSection={activeSection}
      position="right"
      buttonBg="bg-tlahu-clay"
      buttonHover="hover:brightness-90"
      buttonAriaLabel="Redes sociales"
      buttonIcon={<IconLink className="w-6 h-6" />}
    >
      <div className="flex flex-col items-center">
        {socialLinks.map((social, index) => (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${social.name} (se abre en nueva ventana)`}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-off-white border border-[#dee2de]/50 shadow-lg text-tlahu-blue hover:text-tlahu-clay hover:border-tlahu-blue transition-all duration-300 mb-3"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <social.icon className="w-5 h-5" aria-hidden="true" />
          </a>
        ))}
      </div>
    </FloatingPanel>
  );
}
