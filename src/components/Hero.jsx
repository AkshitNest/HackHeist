import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react'

const ParticlesCanvas = lazy(() => import('./ParticlesCanvas'))
const Mask = lazy(() => import('./Mask'))

function HeistButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link to="/register">
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative rounded-full bg-heist-red px-8 py-4 text-white font-bold shadow-lg focus:outline-none overflow-hidden cursor-pointer text-base uppercase tracking-wide"
        style={{
          fontFamily: "'Oxanium', sans-serif",
          fontWeight: 700,
        }}
      >
        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          animate={{
            x: isHovered ? ['0%', '200%'] : '0%',
          }}
          transition={{
            duration: 0.8,
            ease: 'linear',
            repeat: isHovered ? Infinity : 0,
          }}
        />

        {/* Text with letter animation */}
        <span className="relative z-10 flex items-center justify-center">
          {['J', 'o', 'i', 'n', ' ', 't', 'h', 'e', ' ', 'H', 'e', 'i', 's', 't'].map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 0 }}
              animate={{
                y: isHovered ? [0, -4, 0] : 0,
              }}
              transition={{
                delay: i * 0.04,
                duration: 0.5,
                repeat: isHovered ? Infinity : 0,
                repeatDelay: 0.6,
                ease: 'easeInOut',
              }}
              style={{ display: 'inline-block' }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </span>
      </motion.div>
    </Link>
  )
}

export default function Hero(){
  return (
    <section className="relative isolate pt-24 md:pt-28 pb-8 overflow-hidden">

      <Suspense fallback={null}>
        <div className="absolute right-[2vw] top-1/2 -translate-y-1/2 
                        w-[48vw] max-w-[700px] h-[68vh] 
                        pointer-events-none hidden md:block z-30">
          {/* Black radial glow shadow for blending */}
          <div className="absolute inset-0 -inset-y-[20%] -z-10">
            <div className="absolute inset-0" 
                 style={{
                   background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.55) 25%, rgba(0,0,0,0.35) 45%, rgba(0,0,0,0.15) 65%, transparent 85%)',
                   filter: 'blur(50px)'
                 }} 
            />
            <div className="absolute inset-0" 
                 style={{
                   background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.25) 35%, transparent 65%)'
                 }} 
            />
          </div>
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
              className="text-4xl md:text-7xl font-black tracking-tight leading-[0.9]"
              style={{
                fontFamily: "'Bruno Ace SC', sans-serif",
                fontWeight: 900,
                letterSpacing: '-0.03em',
              }}
            >
              {['HACK', ' ', 'HEIST', ' ', 'SEASON', ' ', '2'].map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  initial={{ opacity: 0, y: 30, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    delay: wordIndex * 0.1,
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{
                    y: -5,
                    textShadow: '0 0 20px rgba(255, 0, 0, 0.8)',
                    transition: { duration: 0.3, ease: 'easeOut' }
                  }}
                  style={{ display: 'inline-block' }}
                >
                  {word === ' ' ? '\u00A0' : word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.02,
                        duration: 0.4,
                        ease: 'easeOut'
                      }}
                      whileHover={{
                        scale: 1.1,
                        color: '#ff4444',
                        transition: { duration: 0.15, ease: 'easeOut' }
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                </motion.span>
              ))}
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
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8 flex items-center gap-3"
            >
              <HeistButton />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom horizontal gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10 pointer-events-none" aria-hidden />
      
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.08] animate-scanline" aria-hidden />
    </section>
    
  )
}


