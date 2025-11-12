import { Link, useLocation } from 'react-router-dom'
import { Dumbbell, Salad, UserRound, ChefHat } from 'lucide-react'

export default function Navbar() {
  const location = useLocation()
  const active = (path) => location.pathname === path

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur bg-black/40 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-white group">
          <div className="h-9 w-9 grid place-items-center rounded-lg bg-gradient-to-br from-emerald-400 to-orange-500 shadow-lg shadow-orange-500/20">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span className="font-semibold tracking-wide">VitaBlend</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/dietician" className={`text-white/80 hover:text-white transition ${active('/dietician') ? 'text-white' : ''} flex items-center gap-1`}>
            <Salad className="h-4 w-4" /> Dietician
          </Link>
          <Link to="/recipes" className={`text-white/80 hover:text-white transition ${active('/recipes') ? 'text-white' : ''} flex items-center gap-1`}>
            <ChefHat className="h-4 w-4" /> Recipes
          </Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="hidden sm:inline-flex items-center gap-2 text-white/90 hover:text-white transition">
            <UserRound className="h-4 w-4" /> Login
          </Link>
          <Link to="/auth?mode=signup" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-orange-500 text-black font-semibold hover:opacity-90 transition">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  )
}
