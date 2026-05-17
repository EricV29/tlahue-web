import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Novedades from './components/Novedades'

function App() {
  return (
    <div className="min-h-screen bg-[#ffffff]">
      <Navbar />
      <main>
        <Hero />
        <Novedades />
      </main>
    </div>
  )
}

export default App