import { useState } from 'react'

const faqs = [
  { q: 'Who can participate?', a: 'College students of all years and majors.' },
  { q: 'Is it free?', a: 'Yes, attendance and participation are free.' },
  { q: 'Do I need a team?', a: 'Teams of up to 4. Solo welcome; we host team formation.' },
]

export default function FAQ(){
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <section className="container my-16" aria-label="FAQ">
      <h2 className="text-3xl font-bold">FAQ & Rules</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((item, idx) => {
          const open = openIndex === idx
          return (
            <div key={idx} className="rounded-2xl bg-muted-gray/80 border border-white/10">
              <button
                className="w-full flex items-center justify-between text-left px-5 py-4 focus:outline-none focus:ring-2 focus:ring-heist-red rounded-2xl"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : idx)}
              >
                <span className="text-white font-medium">{item.q}</span>
                <span className="text-gray-300" aria-hidden>{open ? '−' : '+'}</span>
              </button>
              {open && (
                <div className="px-5 pb-5 text-gray-300">{item.a}</div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}


