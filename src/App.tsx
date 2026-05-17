import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Novedades from './components/Novedades'
import Gobierno from './components/Gobierno'

function App() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Navbar />
      <main>
        <Hero />
        <Novedades />
        <Gobierno />
      </main>
    </div>
  )
}

export default App