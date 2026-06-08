import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import { LightboxProvider } from "./context/LightboxContext";
import { useScrollEvent } from "./hooks/useScroll";
import SkipToContent from "./components/SkipToContent";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Government from "./components/Government";
import History from "./components/History";
import Footer from "./components/Footer";
import FloatingSocial from "./components/FloatingSocial";
import FloatingEmergency from "./components/FloatingEmergency";
import GalleryPage from "./components/GalleryPage";
import MapTlahue from "./components/MapTlahue";

const sectionIds = ["eventos", "mapa", "gobierno", "historia"] as const;
export type SectionId = (typeof sectionIds)[number] | "inicio";

function HomePage() {
  const [activeSection, setActiveSection] = useState<SectionId>("inicio");

  useScrollEvent(() => {
    const offsets: Record<string, number> = {};
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) {
        offsets[id] = el.getBoundingClientRect().top + window.scrollY - 120;
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
  }, []);

  return (
    <div className="min-h-screen bg-canvas-white">
      <SkipToContent targetId="main-content" />
      <Navbar activeSection={activeSection} />
      <main id="main-content">
        <Hero />
        <div className="relative z-10 mt-[100vh] bg-canvas-white">
          <Events />
          <MapTlahue />
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
    <ErrorBoundary>
      <LightboxProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/galeria" element={<GalleryPage />} />
        </Routes>
      </LightboxProvider>
    </ErrorBoundary>
  );
}

export default App;
