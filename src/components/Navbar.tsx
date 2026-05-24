import { useState, useEffect } from "react";
import type { SectionId } from "../App";
import IconMenu from "./icons/IconMenu";
import IconClose from "./icons/IconClose";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Eventos", href: "#eventos" },
  { label: "Mapa", href: "#" },
  { label: "Gobierno", href: "#gobierno" },
  { label: "Historia", href: "#historia" },
  { label: "Recursos", href: "#" },
];

const sectionMap: Record<string, SectionId> = {
  Inicio: "inicio",
  Eventos: "eventos",
  Gobierno: "gobierno",
  Historia: "historia",
};

function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (href !== "#historia") return;
  e.preventDefault();

  const targetId = window.innerWidth >= 768 ? "historia-desktop" : "historia";
  const el = document.getElementById(targetId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar({
  activeSection,
}: {
  activeSection: SectionId;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isHistory = activeSection === "historia" && isDesktop;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-0 transition-all duration-500 ease-in-out ${
        isHistory
          ? "opacity-0 -translate-y-5 pointer-events-none"
          : "opacity-100 translate-y-0"
      }`}
    >
      <div
        className={`w-full md:w-fit rounded-[20px] shadow-[rgba(0,0,0,0.04)_0px_2px_12px_0px] px-5 py-2 flex items-center justify-between md:justify-center gap-6 mx-auto mt-4 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-lg border border-gray-200/50"
            : "bg-white/10 backdrop-blur-md border border-white/20"
        }`}
      >
        <a href="#" className="flex items-center shrink-0">
          <img
            src="/logo.svg"
            alt="Tlahuelilpan"
            className={`h-9 w-auto transition-all duration-300 hover:scale-110 active:scale-95 ${
              isScrolled ? "invert-0 brightness-100" : ""
            }`}
          />
        </a>

        {/* Links desktop */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const isActive = sectionMap[link.label] === activeSection;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`px-4 py-1.5 font-body text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                  isActive
                    ? "text-[#3A85AC]"
                    : isScrolled
                      ? "text-dark-charcoal hover:text-[#3A85AC] hover:bg-gray-100"
                      : "text-white hover:text-[#D5B35F] hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Botón menú móvil */}
        <button
          className={`md:hidden p-1.5 transition-colors rounded-md ${
            isScrolled
              ? "text-dark-charcoal hover:text-[#3A85AC] hover:bg-gray-100"
              : "text-white hover:text-[#D5B35F] hover:bg-white/10"
          }`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      {/* Menú desplegable móvil */}
      <div
        className={`md:hidden w-full border rounded-2xl overflow-hidden mt-2 transition-all duration-300 shadow-xl ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-gray-200/60"
            : "bg-white/10 backdrop-blur-md border-white/20"
        } ${
          isOpen
            ? "max-h-64 opacity-100 mt-2"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = sectionMap[link.label] === activeSection;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 font-body text-sm font-medium rounded-lg transition-all text-center ${
                  isActive
                    ? "text-[#3A85AC]"
                    : isScrolled
                      ? "text-dark-charcoal hover:text-[#3A85AC] hover:bg-gray-100"
                      : "text-white hover:text-[#D5B35F] hover:bg-white/10"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
