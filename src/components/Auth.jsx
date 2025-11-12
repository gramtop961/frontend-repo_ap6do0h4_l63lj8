import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Auth() {
  const [search] = useSearchParams()
  const navigate = useNavigate()
  const [mode, setMode] = useState(search.get('mode') === 'signup' ? 'signup' : 'login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { setMode(search.get('mode') === 'signup' ? 'signup' : 'login') }, [search])

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      if (!email || !password || (mode==='signup' && !name)) {
        throw new Error('Please fill all required fields')
      }
      const base = import.meta.env.VITE_BACKEND_URL
      if (!base) throw new Error('Backend URL is not configured')
      const res = await fetch(`${base}/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json().catch(()=>({}))
      if (!res.ok) throw new Error(data?.detail || 'Authentication failed')
      // Save simple session marker
      localStorage.setItem('diet_app_user', JSON.stringify({ email: data.email || email, name: data.name || name }))
      navigate('/choose')
    } catch (err) {
      setError(err.message)
    } finally { setLoading(false) }
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h2 className="text-2xl font-bold mb-1">{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
        <p className="text-white/70 mb-6">Access your AI dietician and recipe finder.</p>
        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <input className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
          )}
          <input className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:ring-2 focus:ring-emerald-500" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-orange-500 text-black font-semibold hover:opacity-90 transition disabled:opacity-50">{loading ? 'Please wait...' : (mode==='signup'?'Sign up':'Log in')}</button>
        </form>
        <div className="mt-4 text-sm text-white/70">
          {mode==='login' ? (
            <button onClick={()=>setMode('signup')} className="underline hover:text-white">No account? Create one</button>
          ) : (
            <button onClick={()=>setMode('login')} className="underline hover:text-white">Have an account? Log in</button>
          )}
        </div>
      </div>
    </div>
  )
}
