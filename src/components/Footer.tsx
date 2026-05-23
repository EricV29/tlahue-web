import IconFacebook from "./icons/IconFacebook";
import IconInstagram from "./icons/IconInstagram";
import IconPhone from "./icons/IconPhone";
import IconLocation from "./icons/IconLocation";
import IconWebsite from "./icons/IconWebsite";
import IconGitHub from "./icons/IconGitHub";
import IconLinkedIn from "./icons/IconLinkedIn";
import IconChevronDown from "./icons/IconChevronDown";

const quickLinks = [
  { label: "Inicio", href: "#" },
  { label: "Eventos", href: "#novedades" },
  { label: "Gobierno", href: "#gobierno" },
];

const contactInfo = [
  {
    label: "Teléfono",
    href: "tel:7637860010",
    icon: IconPhone,
    value: "763 78 60010",
  },
  {
    label: "Ubicación",
    href: "https://maps.app.goo.gl/8uagW9wy9oKXcvuH7",
    icon: IconLocation,
    value: "Tlahuelilpan, Hgo.",
  },
];

const contactSocials = [
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
];

const developerIcons = [
  { name: "GitHub", href: "https://github.com/EricV29", icon: IconGitHub },
  {
    name: "Instagram",
    href: "https://www.instagram.com/Jared29x",
    icon: IconInstagram,
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/eric.villedareyes",
    icon: IconFacebook,
  },
  { name: "Web", href: "https://ericvilleda.netlify.app/", icon: IconWebsite },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/eric-villeda-reyes-584856281",
    icon: IconLinkedIn,
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 bg-dark-charcoal">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Logo + Description */}
          <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
            <img
              src="/logo.svg"
              alt="Tlahuelilpan"
              className="h-10 w-auto brightness-0 invert mb-5"
            />
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              Municipio de Tlahuelilpan, Hidalgo. Descubre el corazón del Valle
              del Mezquital y su riqueza cultural, historia y tradiciones.
            </p>
          </div>

          {/* Navegación */}
          <div className="hidden md:flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20 mb-5">
              Navegación
            </span>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-[#3A85AC] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20 mb-5">
              Contacto
            </span>
            <ul className="flex flex-col gap-3.5 mb-5">
              {contactInfo.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      item.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex items-center gap-2.5 group"
                  >
                    <item.icon className="w-4 h-4 shrink-0 text-[#D5B35F]" />
                    <span className="font-body text-sm text-white/60 group-hover:text-[#3A85AC] transition-colors leading-tight">
                      {item.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3">
              {contactSocials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/60 hover:bg-[#3A85AC] hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Desarrollador */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <span className="text-[11px] font-mono tracking-wider uppercase text-[#D5B35F] bg-[#D5B35F]/10 px-2.5 py-0.5 rounded border border-[#D5B35F]/20 mb-5">
              Desarrollador
            </span>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 max-w-39 mb-3">
              {developerIcons.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-white/60 hover:bg-[#3A85AC] hover:text-white transition-all duration-300"
                  aria-label={link.name}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
            <a
              href="mailto:ericjared29@gmail.com"
              className="font-body text-sm text-white/60 hover:text-[#3A85AC] transition-colors"
            >
              ericjared29@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-white/40 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Municipio de Tlahuelilpan. Sitio
            desarrollado por{" "}
            <a
              href="https://ericvilleda.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D5B35F] hover:text-[#3A85AC] transition-colors"
            >
              Eric Villeda
            </a>
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-body text-xs text-white/40 hover:text-[#D5B35F] transition-colors cursor-pointer"
          >
            Volver arriba
            <IconChevronDown className="w-3.5 h-3.5 rotate-180" />
          </button>
        </div>
      </div>
    </footer>
  );
}
