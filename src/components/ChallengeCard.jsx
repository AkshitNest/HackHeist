import { motion } from 'framer-motion'

export default function ChallengeCard({ title, description, upvotes=0 }){
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-muted-gray/80 border border-white/10 p-6 shadow-soft hover:shadow-xl hover:-translate-y-1 transition will-change-transform"
    >
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <div className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-sm text-gray-200 border border-white/10" aria-label={`${upvotes} upvotes`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="#b30000" aria-hidden="true"><path d="M12 4l6 8h-4v8h-4v-8H6z"/></svg>
          {upvotes}
        </div>
      </div>
      <p className="mt-3 text-gray-300">{description}</p>
    </motion.div>
  )
}


