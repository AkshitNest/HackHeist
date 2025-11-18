import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const ParticlesCanvas = lazy(() => import('./ParticlesCanvas'))
const Mask = lazy(() => import('./Mask'))


export default function Hero(){
  return (
    <section className="relative isolate pt-24 md:pt-28 pb-8 overflow-hidden">

      <Suspense fallback={null}>
        <div className="absolute right-[6vw] top-1/2 -translate-y-1/2 
                        w-[45vw] max-w-[600px] h-[60vh] 
                        pointer-events-none hidden md:block z-30">
          <Mask />
        </div>
      </Suspense>
    
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-black" />}>
        <ParticlesCanvas />
      </Suspense>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-r from-[#000]/90 via-transparent to-transparent"
      />

      <div className="container relative z-20">
        <div className="grid md:grid-cols-2 gap-8 items-center" style={{ minHeight: 'calc(100vh - 200px)' }}>
          {/* Left Section - Text Content */}
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Bruno Ace SC', sans-serif",
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              HACK HEIST SEASON 2
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-6 text-lg md:text-xl text-gray-300 font-normal leading-relaxed"
              style={{
                fontFamily: "'Oxanium', sans-serif",
              }}
            >
              Assemble your crew, crack the toughest challenges, and pull off the perfect build in 24 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center gap-3"
            >
              <Link 
                to="/register" 
                className="rounded-full bg-heist-red px-8 py-4 text-white font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-heist-red/60 transition-all duration-300 hover:scale-105 text-base uppercase tracking-wide"
                style={{
                  fontFamily: "'Oxanium', sans-serif",
                  fontWeight: 700,
                }}
              >
                Join the Heist
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline" aria-hidden />
    </section>
    
  )
}


