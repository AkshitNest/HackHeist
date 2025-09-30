import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import MaskCanvas from './MaskCanvas'
import ParticlesCanvas from './ParticlesCanvas'
import Countdown from './Countdown'

export default function Hero(){
  return (
    <section className="relative isolate pt-24 md:pt-28 overflow-hidden">
      <ParticlesCanvas />
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ x: '-20%', opacity: 0.6 }}
          animate={{ x: '10%', opacity: 0.8 }}
          transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
          className="pointer-events-none absolute -top-24 -left-24 h-[60vh] w-[60vw] rounded-full bg-heist-red/20 blur-3xl"
        />
      </div>

      <div className="container">
        <div className="max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Hack Heist Season 2
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-5 text-lg md:text-xl text-gray-300"
          >
            Assemble your crew, crack the toughest challenges, and pull off the perfect build in 24 hours.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 flex items-center gap-3"
          >
            <Link to="/register" className="rounded-full bg-heist-red px-6 py-3 text-white font-semibold shadow-soft focus:outline-none focus:ring-2 focus:ring-heist-red/60">Register</Link>
          </motion.div>
        </div>
        <div className="mt-4">
          <MaskCanvas />
        </div>
        <div className="mt-2">
          <Countdown target={new Date('2025-03-29T09:00:00+05:30').getTime()} />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline" aria-hidden />
    </section>
  )
}


