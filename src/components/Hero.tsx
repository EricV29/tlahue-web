import tlahueDia from "../assets/images/tlahueDia.webp";
import IconChevronDown from "./icons/IconChevronDown";
import IconExternalLink from "./icons/IconExternalLink";

export default function Hero() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url(${tlahueDia})`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-[#FEFFFC]/20" />

      <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-center pt-32">
        <div className="inline-block backdrop-blur-sm bg-black/20 rounded-lg px-3 py-1 mb-4">
          <p className="font-body text-sm font-medium tracking-[-0.0120em] text-[#D5B35F] uppercase">
            Bienvenido a Tlahuelilpan
          </p>
        </div>

        <h1 className="font-display font-light text-[40px] md:text-[48px] lg:text-[54px] text-white tracking-[-0.0200em] leading-[1.1] mb-6 drop-shadow-xl">
          Descubre el corazón
          <br />
          <span className="text-[#D5B35F]">de Hidalgo</span>
        </h1>

        <p className="font-body text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
          Explora la riqueza cultural, historia y tradiciones del municipio de
          Tlahuelilpan. Una experiencia única en el Valle del Mezquital.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#explorar"
            className="bg-[#AA642A] text-white border border-[#AA642A] rounded-md px-5 py-2.5 font-body text-base font-medium hover:bg-[#D5B35F] transition-all"
          >
            Explorar mapa
          </a>
          <a
            href="https://tlahuelilpan.gob.mx/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent border-2 border-[#AA642A] text-white rounded-md px-4 py-2 font-body text-base font-medium hover:bg-[#D5B35F]/10 transition-all inline-flex items-center gap-2"
          >
            <IconExternalLink className="w-5 h-5" />
            Página Oficial
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <IconChevronDown className="text-white/60" />
      </div>
    </div>
  );
}
