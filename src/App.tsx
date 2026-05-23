import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Government from "./components/Government";
import History from "./components/History";
import Footer from "./components/Footer";
import FloatingSocial from "./components/FloatingSocial";
import FloatingEmergency from "./components/FloatingEmergency";

function App() {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Navbar />
      <main>
        <Hero />
        <div className="relative z-10 mt-[100vh] bg-canvas-white">
          <Events />
          <Government />
          <History />
        </div>
      </main>
      <Footer />
      <FloatingSocial />
      <FloatingEmergency />
    </div>
  );
}

export default App;
