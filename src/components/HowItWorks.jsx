import { motion } from 'framer-motion'

const steps = [
  {
    n: '01',
    title: 'Create',
    body: 'Type the question everyone in the chat is already arguing about. Set the stake — say, ₦100 to play.',
  },
  {
    n: '02',
    title: 'Share',
    body: 'Drop the link in WhatsApp, Telegram or Discord. No app install, no sign-up wall — people just tap YES or NO.',
  },
  {
    n: '03',
    title: 'Settle',
    body: 'The host confirms the outcome, the group votes, or an automated feed decides for sports and weather. Coins move instantly.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
          The loop
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Three steps, no learning curve.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-3">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="bg-paper-raised p-7"
          >
            <span className="font-mono text-sm text-brand">{s.n}</span>
            <h3 className="mt-3 font-display text-xl font-semibold">
              {s.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-text-lo">
              {s.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
