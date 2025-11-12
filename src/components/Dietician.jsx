import { useState } from 'react'

export default function Dietician() {
  const [form, setForm] = useState({
    name: '', age: '', height_cm: '', weight_kg: '',
    gender: 'male',
    health_issues: '', medical_history: '', food_type: 'veg',
    goal: 'lose-weight', extra_notes: ''
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const update = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const submit = async (e) => {
    e.preventDefault(); setLoading(true)
    try {
      const base = import.meta.env.VITE_BACKEND_URL
      const res = await fetch(`${base}/diet/plan`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: Number(form.age), height_cm: Number(form.height_cm), weight_kg: Number(form.weight_kg)
        })
      })
      const data = await res.json()
      setResult(data)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pt-28">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <form onSubmit={submit} className="space-y-4 rounded-2xl border border-white/10 p-6 bg-white/5">
          <h2 className="text-2xl font-bold">Tell us about you</h2>
          <div className="grid grid-cols-2 gap-3">
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Name" value={form.name} onChange={e=>update('name', e.target.value)} />
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Age" value={form.age} onChange={e=>update('age', e.target.value)} />
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Height (cm)" value={form.height_cm} onChange={e=>update('height_cm', e.target.value)} />
            <input className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Weight (kg)" value={form.weight_kg} onChange={e=>update('weight_kg', e.target.value)} />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition ${form.gender==='male'?'bg-emerald-500/20 border-emerald-500/50':'bg-white/10 border-white/10 hover:border-white/20'}`}> 
              <input type="radio" name="gender" className="hidden" checked={form.gender==='male'} onChange={()=>update('gender','male')} />
              <span>Male</span>
            </label>
            <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition ${form.gender==='female'?'bg-emerald-500/20 border-emerald-500/50':'bg-white/10 border-white/10 hover:border-white/20'}`}>
              <input type="radio" name="gender" className="hidden" checked={form.gender==='female'} onChange={()=>update('gender','female')} />
              <span>Female</span>
            </label>
            <label className={`flex items-center gap-2 px-4 py-3 rounded-lg border cursor-pointer transition ${form.gender==='transgender'?'bg-emerald-500/20 border-emerald-500/50':'bg-white/10 border-white/10 hover:border-white/20'}`}>
              <input type="radio" name="gender" className="hidden" checked={form.gender==='transgender'} onChange={()=>update('gender','transgender')} />
              <span>Transgender</span>
            </label>
          </div>

          <textarea className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Any health issues" value={form.health_issues} onChange={e=>update('health_issues', e.target.value)} />
          <textarea className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="Past medical experience" value={form.medical_history} onChange={e=>update('medical_history', e.target.value)} />

          <div className="grid grid-cols-2 gap-3">
            <select className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" value={form.food_type} onChange={e=>update('food_type', e.target.value)}>
              <option value="veg">Veg</option>
              <option value="non-veg">Non Veg</option>
              <option value="vegan">Vegan</option>
              <option value="lactose-intolerant">Lactose intolerant</option>
              <option value="gluten-free">Gluten free</option>
              <option value="keto">Keto</option>
              <option value="paleo">Paleo</option>
              <option value="other">Other</option>
            </select>
            <select className="px-4 py-3 rounded-lg bg-white/10 border border-white/10" value={form.goal} onChange={e=>update('goal', e.target.value)}>
              <option value="lose-weight">Lose weight</option>
              <option value="gain-weight">Gain weight</option>
              <option value="maintain">Maintain</option>
              <option value="post-surgery-guidance">Post surgery guidance</option>
              <option value="improve-performance">Improve performance</option>
              <option value="other">Other</option>
            </select>
          </div>
          <textarea className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10" placeholder="How can we help you?" value={form.extra_notes} onChange={e=>update('extra_notes', e.target.value)} />
          <button className="px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-orange-500 text-black font-semibold hover:opacity-90 transition">{loading? 'Generating...' : 'Generate plan'}</button>
        </form>

        <div className="rounded-2xl border border-white/10 p-6 bg-white/5">
          {!result ? (
            <p className="text-white/70">Your plan will appear here after submission.</p>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Your Summary</h3>
                <span className="text-sm text-white/70">BMI: <b>{result.bmi}</b> ({result.bmi_category})</span>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Guidelines</h4>
                <ul className="list-disc list-inside space-y-1 text-white/80">
                  {result.guidelines.map((g, i) => (<li key={i}>{g}</li>))}
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Sample Day</h4>
                <div className="grid sm:grid-cols-3 gap-3">
                  {result.sample_day.map((m, i) => (
                    <div key={i} className="rounded-lg border border-white/10 p-3 bg-white/5">
                      <p className="text-sm text-white/60">{m.meal}</p>
                      <ul className="mt-1 text-sm list-disc list-inside text-white/80">
                        {m.ideas.map((x, idx) => (<li key={idx}>{x}</li>))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
