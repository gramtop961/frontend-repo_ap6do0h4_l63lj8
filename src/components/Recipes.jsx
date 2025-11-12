import { useEffect, useState } from 'react'

export default function Recipes() {
  const [query, setQuery] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [foodType, setFoodType] = useState('any')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)

  const search = async () => {
    setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const payload = query ? { query, food_type: foodType } : { ingredients: ingredients.split(',').map(s=>s.trim()).filter(Boolean), food_type: foodType }
      const res = await fetch(`${base}/recipes/search`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      const data = await res.json()
      setResults(data.results || [])
    } finally { setLoading(false) }
  }

  useEffect(()=>{ /* initial no-op */ }, [])

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
          <div className="grid md:grid-cols-4 gap-3">
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-emerald-500" placeholder="Search recipe by name" value={query} onChange={e=>setQuery(e.target.value)} />
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10 focus:ring-2 focus:ring-emerald-500" placeholder="Or list ingredients, comma separated" value={ingredients} onChange={e=>setIngredients(e.target.value)} />
            <select className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" value={foodType} onChange={e=>setFoodType(e.target.value)}>
              <option value="any">Any</option>
              <option value="veg">Veg</option>
              <option value="non-veg">Non Veg</option>
              <option value="vegan">Vegan</option>
              <option value="lactose-intolerant">Lactose intolerant</option>
            </select>
            <button onClick={search} className="px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-orange-500 text-black font-semibold hover:opacity-90 transition">{loading ? 'Searching...' : 'Search'}</button>
          </div>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map(r => (
            <div key={r.id} className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:bg-white/10 transition">
              <div className="aspect-video overflow-hidden">
                <img src={r.thumbnail} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold">{r.title}</h4>
                <p className="text-sm text-white/60">{r.category || 'Recipe'} {r.area ? `• ${r.area}` : ''}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
