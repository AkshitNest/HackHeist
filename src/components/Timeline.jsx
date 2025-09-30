import { motion } from 'framer-motion'

const events = [
  { time: '09:00', title: 'Doors Open', detail: 'Check-in and coffee' },
  { time: '10:00', title: 'Opening Heist Brief', detail: 'Rules and challenges' },
  { time: '11:00', title: 'Hacking Starts', detail: '24-hour countdown' },
  { time: '18:00', title: 'Midway Review', detail: 'Mentor rounds' },
  { time: '09:00+1', title: 'Submission', detail: 'Code freeze and demos' },
]

export default function Timeline(){
  return (
    <section className="container my-16" aria-label="Schedule timeline">
      <h2 className="text-3xl font-bold">Schedule</h2>
      <div className="mt-8 md:flex md:overflow-x-auto md:space-x-6 space-y-6 md:space-y-0">
        {events.map((e, i) => (
          <motion.div
            key={e.time}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="flex-shrink-0 rounded-2xl bg-muted-gray/80 border border-white/10 p-5 w-full md:w-64"
          >
            <div className="text-heist-red font-semibold">{e.time}</div>
            <div className="mt-2 text-white font-medium">{e.title}</div>
            <div className="text-gray-300">{e.detail}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


