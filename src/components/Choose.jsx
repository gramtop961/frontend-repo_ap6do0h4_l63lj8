import { Link } from 'react-router-dom'
import { Salad, ChefHat } from 'lucide-react'

export default function Choose() {
  return (
    <div id="choose" className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="max-w-3xl w-full grid md:grid-cols-2 gap-6">
        <Link to="/dietician" className="group rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-emerald-500/20 to-orange-500/20" />
          <div className="relative z-10">
            <Salad className="h-10 w-10" />
            <h3 className="mt-3 text-2xl font-bold">Dietician</h3>
            <p className="text-white/70">Share your details and goals to get a tailored plan with sample meals.</p>
          </div>
        </Link>
        <Link to="/recipes" className="group rounded-2xl border border-white/10 p-6 bg-white/5 hover:bg-white/10 transition relative overflow-hidden">
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-emerald-500/20 to-orange-500/20" />
          <div className="relative z-10">
            <ChefHat className="h-10 w-10" />
            <h3 className="mt-3 text-2xl font-bold">Recipe Finder</h3>
            <p className="text-white/70">Search by dish or list ingredients you have to get ideas instantly.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
