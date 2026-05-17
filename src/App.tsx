import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Novedades from './components/Novedades'
import Gobierno from './components/Gobierno'
import FloatingSocial from './components/FloatingSocial'
import FloatingEmergency from './components/FloatingEmergency'

function App() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Navbar />
      <main>
        <Hero />
        <Novedades />
        <Gobierno />
      </main>
      <FloatingSocial />
      <FloatingEmergency />
    </div>
  )
}

export default App