import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'
import Mask from '../components/Mask'
import Countdown from '../components/Countdown'
import AboutHeist from '../components/AboutHeist'

import { motion } from 'framer-motion'

function SectionShell({ id, title, subtitle, children }){
  return (
    <section id={id} className="container my-16">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold"
      >{title}</motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-gray-300 mt-2"
        >{subtitle}</motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, delay: 0.05 }}
        className="mt-6"
      >{children}</motion.div>
    </section>
  )
}

export default function Landing(){
  return (
    <div className="bg-black text-white relative">
      <Navbar />
      <Mask />
      <main>
        <Hero />
        
        {/* Countdown Section - Moved below Hero */}
        <section className="container my-16">
          <Countdown target={new Date('2025-03-29T09:00:00+05:30').getTime()} />
        </section>

        <AboutHeist />

        <SectionShell id="prizes" title="The Loot" subtitle="Describe your prize pool and goodies.">
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({length:3}).map((_,i)=> (
              <div key={i} className="rounded-2xl bg-gradient-to-b from-heist-red/70 to-heist-red/30 border border-white/10 p-6 shadow-soft">
                <div className="text-2xl font-bold">Tier {i+1}</div>
                <div className="text-gray-200 mt-2">Add prize details</div>
              </div>
            ))}
          </div>
        </SectionShell>

        <SectionShell id="partners" title="Partners" subtitle="Our trusted allies in this heist.">
          <div className="relative">
            {/* Revealing Soon Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.div
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-heist-red/30 bg-gradient-to-r from-heist-red/10 via-heist-red/5 to-heist-red/10 backdrop-blur-sm"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(179, 0, 0, 0.2)',
                    '0 0 30px rgba(179, 0, 0, 0.4)',
                    '0 0 20px rgba(179, 0, 0, 0.2)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <motion.span
                  className="text-heist-red text-sm md:text-base font-semibold uppercase tracking-wider"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  Revealing Very Soon
                </motion.span>
                <motion.div
                  className="flex gap-1"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                  <span className="w-1.5 h-1.5 rounded-full bg-heist-red" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Animated Placeholder Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.5, 
                    delay: i * 0.1,
                    ease: 'easeOut'
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative h-32 rounded-2xl overflow-hidden"
                >
                  {/* Animated Background */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-transparent border border-white/10 rounded-2xl"
                    animate={{
                      background: [
                        'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
                        'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.03) 50%, transparent 100%)',
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
                  />

                  {/* Glowing Border Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-heist-red/20"
                    animate={{
                      borderColor: [
                        'rgba(179, 0, 0, 0.2)',
                        'rgba(179, 0, 0, 0.4)',
                        'rgba(179, 0, 0, 0.2)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                  />

                  {/* Pulsing Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/5 blur-xl"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                  />

                  {/* Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: i * 0.3,
                    }}
                  />

                  {/* Center Icon/Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                      animate={{
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.2,
                      }}
                    >
                      <motion.div
                        className="w-6 h-6 rounded bg-heist-red/30"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 0.8, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: i * 0.15,
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Hover Glow */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-heist-red/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </SectionShell>

        <SectionShell id="tracks" title="Our Tracks" subtitle="List your hackathon tracks.">
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({length:6}).map((_,i)=>(<div key={i} className="rounded-2xl bg-muted-gray/80 border border-white/10 p-6 text-center">Track {i+1}</div>))}
          </div>
        </SectionShell>

        <SectionShell id="past" title="Our Past Heists" subtitle="Add gallery or highlights.">
          <div className="grid md:grid-cols-3 gap-4">
            {Array.from({length:3}).map((_,i)=>(<div key={i} className="h-48 rounded-2xl bg-white/5 border border-white/10" />))}
          </div>
        </SectionShell>

        <SectionShell id="team" title="Our Team" subtitle="Introduce your organizers.">
          <div className="grid md:grid-cols-4 gap-6">
            {Array.from({length:8}).map((_,i)=>(
              <div key={i} className="text-center">
                <div className="mx-auto h-24 w-24 rounded-full bg-white/5 border border-white/10" />
                <div className="mt-2 text-sm text-gray-300">Name</div>
              </div>
            ))}
          </div>
        </SectionShell>

        <section id="timeline">
          <Timeline />
        </section>
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}


