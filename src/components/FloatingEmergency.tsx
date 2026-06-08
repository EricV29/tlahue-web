import type { SectionId } from "../App";
import FloatingPanel from "./FloatingPanel";
import IconSiren from "./icons/IconSiren";
import IconPhone from "./icons/IconPhone";
import IconLocation from "./icons/IconLocation";
import IconFacebook from "./icons/IconFacebook";

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

export default function FloatingEmergency({
  activeSection,
}: {
  activeSection: SectionId;
}) {
  return (
    <FloatingPanel
      activeSection={activeSection}
      position="left"
      buttonBg="bg-[#9F2241]"
      buttonHover="hover:bg-[#7d1a33]"
      buttonAriaLabel="Emergencias"
      buttonIcon={<IconSiren className="w-6 h-6" />}
    >
      {emergencyServices.map((service, index) => (
        <div
          key={service.name}
          className="bg-off-white border border-[#dee2de]/50 rounded-xl p-4 shadow-lg mb-3 w-72"
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <h4 className="font-display font-medium text-sm text-dark-charcoal mb-3">
            {service.name}
          </h4>

          <div className="space-y-2">
            <a
              href={`tel:${service.phone}`}
              className="flex items-center gap-2 text-tlahu-clay hover:text-tlahu-gold transition-colors"
            >
              <IconPhone className="w-4 h-4" />
              <span className="font-body text-sm font-medium">
                {service.phone}
              </span>
            </a>

            {service.altPhone && (
              <a
                href={`tel:${service.altPhone}`}
                className="flex items-center gap-2 text-tlahu-clay hover:text-tlahu-gold transition-colors"
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
                className="flex items-center gap-2 text-tlahu-blue hover:text-tlahu-clay transition-colors"
              >
                <IconFacebook className="w-4 h-4" />
                <span className="font-body text-sm">Facebook</span>
              </a>
            )}

            <a
              href={service.location}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-gray hover:text-tlahu-clay transition-colors"
            >
              <IconLocation className="w-4 h-4" />
              <span className="font-body text-sm">Ver ubicación</span>
            </a>
          </div>
        </div>
      ))}
    </FloatingPanel>
  );
}
