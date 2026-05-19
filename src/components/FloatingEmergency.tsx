import { useState } from "react";
import IconSiren from "./icons/IconSiren";
import IconPhone from "./icons/IconPhone";
import IconLocation from "./icons/IconLocation";

export default function FloatingEmergency() {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyServices = [
    {
      name: "Seguridad Pública y Tránsito",
      facebook:
        "https://www.facebook.com/p/Seguridad-P%C3%BAblica-y-Tr%C3%A1nsito-Municipal-de-Tlahuelilpan-Hgo-100068893222611/",
      phone: "763 786 0650",
      altPhone: "911",
      location: "https://maps.app.goo.gl/8NRq8hVRUo5JXz9e8",
    },
    {
      name: "Protección Civil y Bomberos",
      phone: "773 124 3152",
      location: "https://maps.app.goo.gl/Te5wxUtumFebPJvbA",
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <div className="relative flex flex-col items-start">
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "mb-4 opacity-100 pointer-events-auto" : "mb-0 opacity-0"
          }`}
        >
          {emergencyServices.map((service, index) => (
            <div
              key={service.name}
              className={`bg-[#FEFFFC] border border-[#dee2de]/50 rounded-xl p-4 shadow-lg mb-3 w-72 transition-all duration-300 ${
                isOpen
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h4 className="font-display font-medium text-sm text-[#111827] mb-3">
                {service.name}
              </h4>

              <div className="space-y-2">
                <a
                  href={`tel:${service.phone}`}
                  className="flex items-center gap-2 text-[#AA642A] hover:text-[#D5B35F] transition-colors"
                >
                  <IconPhone className="w-4 h-4" />
                  <span className="font-body text-sm font-medium">
                    {service.phone}
                  </span>
                </a>

                {service.altPhone && (
                  <a
                    href={`tel:${service.altPhone}`}
                    className="flex items-center gap-2 text-[#AA642A] hover:text-[#D5B35F] transition-colors"
                  >
                    <IconPhone className="w-4 h-4" />
                    <span className="font-body text-sm font-medium">
                      {service.altPhone}
                    </span>
                  </a>
                )}

                {service.facebook && (
                  <a
                    href={service.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-[#3A85AC] hover:text-[#AA642A] transition-colors"
                  >
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M17 2H14C12.6739 2 11.4021 2.52678 10.4645 3.46447C9.52678 4.40215 9 5.67392 9 7V10H6V14H9V22H13V14H16L17 10H13V7C13 6.73478 13.1054 6.48043 13.2929 6.29289C13.4804 6.10536 13.7348 6 14 6H17V2Z"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    </svg>
                    <span className="font-body text-sm">Facebook</span>
                  </a>
                )}

                <a
                  href={service.location}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-[#4B5563] hover:text-[#AA642A] transition-colors"
                >
                  <IconLocation className="w-4 h-4" />
                  <span className="font-body text-sm">Ver ubicación</span>
                </a>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-[#9F2241] text-white shadow-lg hover:bg-[#7d1a33] transition-all duration-300 pointer-events-auto"
          aria-label="Emergencias"
        >
          <IconSiren
            className={`w-6 h-6 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
          />
        </button>
      </div>
    </div>
  );
}
