import { motion } from 'framer-motion'
import { formatNaira } from '../lib/currency'

const markets = [
  {
    tag: 'Sports',
    prompt: 'Will Osimhen score before halftime vs Chelsea?',
    pot: '3,120',
    size: 'md:col-span-2',
  },
  {
    tag: 'Friend group',
    prompt: 'Does Tayo actually show up to the wedding on time?',
    pot: '480',
    size: '',
  },
  {
    tag: 'Weather',
    prompt: 'Rain before the owambe ends tonight?',
    pot: '260',
    size: '',
  },
  {
    tag: 'Pop culture',
    prompt: 'Who gets evicted from BBN this Sunday?',
    pot: '2,050',
    size: 'md:col-span-2',
  },
]

export default function MarketBento() {
  return (
    <section id="markets" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-xl">
        <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
          What people bet on
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          If there's a group chat, there's a market.
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {markets.map((m, i) => (
          <motion.div
            key={m.prompt}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`${m.size} rounded-2xl border border-line bg-paper-raised p-6`}
          >
            <span className="font-mono text-xs text-stake">{m.tag}</span>
            <p className="mt-3 font-display text-lg font-medium leading-snug text-text-hi">
              {m.prompt}
            </p>
            <p className="mt-4 font-mono text-xs text-text-lo">
              {formatNaira(m.pot)} staked
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
