import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import ChatBetMock from './ChatBetMock'

export default function Hero() {
  const [prompt, setPrompt] = useState('')

  return (
    <section
      id="create"
      className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 px-6 pb-24 pt-16 md:grid-cols-2 md:pt-24"
    >
      <div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-ink-border bg-ink-raised px-3 py-1 font-mono text-xs text-text-lo"
        >
          Play-money beta · no card required
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl"
        >
          Turn group chat
          <br />
          debates into a{' '}
          <span className="text-coin">market</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-5 max-w-md text-base text-text-lo"
        >
          Someone's always got a hot take. SideBet turns it into a pool in
          seconds — drop the link in the chat, everyone stakes coins, the
          house settles it.
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          onSubmit={(e) => e.preventDefault()}
          className="mt-8 flex items-center gap-2 rounded-2xl border border-ink-border bg-ink-raised p-2 pl-4 focus-within:border-coin/60"
        >
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Will Arsenal win today?"
            className="w-full bg-transparent text-sm text-text-hi placeholder:text-text-faint focus:outline-none"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-coin px-4 py-2.5 text-sm font-semibold text-ink transition hover:brightness-110"
          >
            Create pool
            <ArrowRight size={15} strokeWidth={2.5} />
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-3 font-mono text-xs text-text-faint"
        >
          Coins have no cash value — for now, it's all bragging rights.
        </motion.p>
      </div>

      <div className="flex justify-center md:justify-end">
        <ChatBetMock />
      </div>
    </section>
  )
}
