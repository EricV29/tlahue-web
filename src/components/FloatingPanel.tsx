import { useState, useRef, useEffect, type ReactNode } from "react";
import type { SectionId } from "../App";

export default function FloatingPanel({
  activeSection,
  position,
  buttonBg,
  buttonHover,
  buttonAriaLabel,
  buttonIcon,
  children,
}: {
  activeSection: SectionId;
  position: "left" | "right";
  buttonBg: string;
  buttonHover: string;
  buttonAriaLabel: string;
  buttonIcon: ReactNode;
  children: ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (panelRef.current) {
      (panelRef.current as unknown as Record<string, boolean>).inert = !isOpen;
    }
  }, [isOpen]);

  const isHidden = ["historia", "mapa"].includes(activeSection);

  return (
    <div
      className={`fixed bottom-6 z-50 pointer-events-none transition-all duration-500 ease-in-out ${
        position === "right" ? "right-6" : "left-6"
      } ${
        isHidden
          ? `opacity-0 ${position === "right" ? "translate-x-5" : "-translate-x-5"}`
          : "opacity-100 translate-x-0"
      }`}
    >
      <div className={`relative ${position === "left" ? "flex flex-col items-start" : ""}`}>
        <div
          ref={panelRef}
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen
              ? "mb-4 opacity-100 pointer-events-auto"
              : "mb-0 opacity-0 pointer-events-none"
          }`}
        >
          {children}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center w-14 h-14 rounded-full ${buttonBg} text-white shadow-lg ${buttonHover} transition-all duration-300 cursor-pointer pointer-events-auto`}
          aria-label={buttonAriaLabel}
        >
          <div
            className={`transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          >
            {buttonIcon}
          </div>
        </button>
      </div>
    </div>
  );
}
