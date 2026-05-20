import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Events from "./components/Events";
import Government from "./components/Government";
import FloatingSocial from "./components/FloatingSocial";
import FloatingEmergency from "./components/FloatingEmergency";

function App() {
  return (
    <div className="min-h-screen bg-canvas-white">
      <Navbar />
      <main>
        <Hero />
        <Events />
        <Government />
      </main>
      <FloatingSocial />
      <FloatingEmergency />
    </div>
  );
}

export default App;
