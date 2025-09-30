import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Timeline from '../components/Timeline'
import FAQ from '../components/FAQ'
import Footer from '../components/Footer'

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
    <div className="bg-black text-white">
      <Navbar />
      <main>
        <Hero />
        <SectionShell id="about" title="About" subtitle="Add your organization blurb here." >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-muted-gray/80 border border-white/10 h-56" />
            <div className="rounded-2xl bg-muted-gray/80 border border-white/10 h-56" />
          </div>
        </SectionShell>

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

        <SectionShell id="partners" title="Partners" subtitle="Add sponsor logos and links.">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({length:8}).map((_,i)=>(<div key={i} className="h-24 rounded-2xl bg-white/5 border border-white/10" />))}
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

        <SectionShell id="join" title="Join Us" subtitle="Add volunteer/mentor/sponsor CTA.">
          <div className="rounded-2xl bg-muted-gray/80 border border-white/10 p-6 flex items-center justify-between">
            <div className="text-gray-300">Tell people how to get involved.</div>
            <a href="#" className="rounded-full bg-heist-red px-5 py-2 font-semibold">Get in touch</a>
          </div>
        </SectionShell>
        <Timeline />
        <FAQ />
      </main>
      <Footer />
    </div>
  )
}


