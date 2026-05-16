import { useState } from "react";
import IconMenu from "./icons/IconMenu";
import IconClose from "./icons/IconClose";

const navLinks = [
  { label: "Inicio", href: "#" },
  { label: "Novedades", href: "#" },
  { label: "Mapa", href: "#" },
  { label: "Servicios", href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-0">
      <div className="w-full md:w-fit bg-white/10 backdrop-blur-md rounded-[20px] shadow-[rgba(0,0,0,0.04)_0px_2px_12px_0px] border border-white/20 px-5 py-2 flex items-center justify-between md:justify-center gap-6 mx-auto mt-4 transition-all duration-300">
        {/* Logo */}
        <a href="#" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="Tlahuelilpan" className="h-9 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 font-body text-sm font-medium text-white hover:text-[#D5B35F] hover:bg-white/10 rounded-md transition-all whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden p-1.5 text-white hover:text-[#D5B35F] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>

      <div
        className={`md:hidden w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden mt-2 transition-all duration-300 shadow-xl ${
          isOpen
            ? "max-h-64 opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="px-5 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-3 font-body text-sm font-medium text-white hover:text-[#D5B35F] hover:bg-white/10 rounded-lg transition-all text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
