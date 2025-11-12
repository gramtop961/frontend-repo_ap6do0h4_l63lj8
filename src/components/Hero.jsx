import Spline from '@splinetool/react-spline'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/2fSS9b44gtYBt4RI/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-28 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 text-xs">
            Your AI Dietician & Recipe Builder
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Eat smart. Feel strong. Look sharp.
          </h1>
          <p className="mt-5 text-white/80 text-lg max-w-xl">
            Get personalized nutrition guidance or discover recipes from what you already have. Clean, fast and a little bit futuristic.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#choose" className="px-5 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-orange-500 text-black font-semibold hover:opacity-90 transition">Start now</a>
            <a href="#how" className="px-5 py-3 rounded-lg border border-white/20 hover:bg-white/10 transition">How it works</a>
          </div>
        </motion.div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
    </section>
  )
}
