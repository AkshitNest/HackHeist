import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'Who can participate?',
    a: 'Anyone from beginners to pros! Whether you’re a developer, designer, or innovator—Hack Heist welcomes all.',
  },
  {
    q: 'Is it free?',
    a: 'Yes! Participation is 100% free, including access to mentors, sessions, and the venue.',
  },
  {
    q: 'Do I need a team?',
    a: 'Teams of 1–4 members are allowed.\nYou can register solo and we’ll help you form a team at the venue if needed.',
  },
  {
    q: 'What should I bring?',
    a: 'A laptop, charger, valid student ID, and lots of energy. We’ll handle the rest.',
  },
  {
    q: "What's the judging criteria?",
    a: 'Innovation, Impact, Technical Strength, UI/UX, and Presentation.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section id="faq" className="relative py-20 md:py-24" aria-label="FAQ">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0d0d0d]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at top, rgba(179,0,0,0.3) 0%, transparent 55%), radial-gradient(circle at bottom, rgba(179,0,0,0.3) 0%, transparent 55%)',
        }}
      />
      {/* Faint blueprint grid */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-[0.18em] uppercase"
            style={{ fontFamily: 'Oxanium, sans-serif' }}
          >
            FAQ
          </h2>
          <p className="mt-3 text-sm md:text-base text-gray-400">
            Laser-scanned intel for your heist questions.
          </p>
        </motion.div>

        <div className="relative max-w-3xl mx-auto space-y-4">
          {faqs.map((item, idx) => {
            const open = openIndex === idx
            return (
              <div
                key={item.q}
                className={`relative rounded-2xl bg-white/5 border overflow-hidden group transition-colors duration-150 ease-out ${
                  open ? 'border-heist-red/70 shadow-[0_0_18px_rgba(255,0,0,0.4)]' : 'border-white/10'
                }`}
              >
                {/* Glass highlight */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-transparent to-white/5 opacity-40 pointer-events-none" />

                {/* Blueprint dotted overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-screen pointer-events-none"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                    backgroundSize: '10px 10px',
                  }}
                />

                <button
                  type="button"
                  className="relative z-10 w-full flex items-center justify-between text-left px-5 py-4 md:px-6 md:py-5 focus:outline-none"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : idx)}
                >
                  <span className="text-sm md:text-base font-semibold text-gray-100">
                    {item.q}
                  </span>

                  {/* Icon: plus -> rotating lock-open */}
                  <motion.span
                    className="ml-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-xs"
                    aria-hidden
                    animate={open ? { rotate: 180 } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {open ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-heist-red"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M7 11V8a5 5 0 0 1 10 0v3" />
                        <rect x="5" y="11" width="14" height="10" rx="2" />
                        <circle cx="12" cy="16" r="1.5" />
                      </svg>
                    ) : (
                      <span className="text-lg leading-none text-gray-200">+</span>
                    )}
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="relative z-10 px-5 md:px-6 pb-4 md:pb-5 text-sm text-gray-300"
                    >
                      {/* Static laser bar for subtle effect */}
                      <div className="mb-3 h-[2px] w-full bg-gradient-to-r from-transparent via-heist-red to-transparent opacity-80" />
                      <p className="whitespace-pre-line leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


