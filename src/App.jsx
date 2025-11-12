import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Auth from './components/Auth'
import Choose from './components/Choose'
import Dietician from './components/Dietician'
import Recipes from './components/Recipes'

function Home() {
  return (
    <>
      <Hero />
      <section id="how" className="bg-black text-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="grid md:grid-cols-3 gap-6">
            {[{t:'Create an account',d:'Sign up to save preferences and unlock your personalized dietician.'},{t:'Pick your path',d:'Choose between AI Dietician for guidance or Recipe Finder for ideas.'},{t:'Enjoy the results',d:'Get smooth UI, subtle animations and clean visuals in dark neon style.'}].map((x,i)=> (
              <div key={i} className="rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition">
                <h3 className="text-xl font-bold">{x.t}</h3>
                <p className="text-white/70">{x.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/choose" element={<Choose />} />
        <Route path="/dietician" element={<Dietician />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
      <footer className="bg-black border-t border-white/10 text-white/60 py-8 text-center">Made with care • Black, Green and Orange vibes</footer>
    </div>
  )
}
