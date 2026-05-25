import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Government from "./components/Government";
import History from "./components/History";
import Footer from "./components/Footer";
import FloatingSocial from "./components/FloatingSocial";
import FloatingEmergency from "./components/FloatingEmergency";
import GalleryPage from "./components/GalleryPage";

const sectionIds = ["eventos", "gobierno", "historia"] as const;
export type SectionId = (typeof sectionIds)[number] | "inicio";

function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");

  useEffect(() => {
    const handleScroll = () => {
      const offsets: Record<string, number> = {};
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          offsets[id] =
            el.getBoundingClientRect().top + window.scrollY - 120;
        }
      }

      const scrollY = window.scrollY;
      const sortedSections = [...sectionIds]
        .filter((id) => offsets[id] !== undefined)
        .sort((a, b) => offsets[b] - offsets[a]);
      let current: SectionId = "inicio";
      for (const id of sortedSections) {
        if (scrollY >= offsets[id]) {
          current = id;
          break;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-canvas-white">
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <div className="relative z-10 mt-[100vh] bg-canvas-white">
          <Events />
          <Government />
          <History />
        </div>
      </main>
      <Footer />
      <FloatingSocial activeSection={activeSection} />
      <FloatingEmergency activeSection={activeSection} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/galeria" element={<GalleryPage />} />
    </Routes>
  );
}

export default App;
