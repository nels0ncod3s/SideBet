import { motion } from 'framer-motion'

const bubbleVariants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: 0.3 + i * 0.45, duration: 0.35, ease: 'easeOut' },
  }),
}

export default function ChatBetMock() {
  return (
    <div className="w-full max-w-sm rounded-[28px] border border-ink-border bg-ink-raised p-3 shadow-2xl shadow-black/40">
      {/* fake chat header */}
      <div className="flex items-center gap-2 border-b border-ink-border/70 px-2 pb-3">
        <div className="flex -space-x-2">
          {['bg-coin', 'bg-stake', 'bg-text-lo'].map((c, i) => (
            <span
              key={i}
              className={`h-6 w-6 rounded-full border-2 border-ink-raised ${c}`}
            />
          ))}
        </div>
        <div className="text-xs text-text-lo">
          <span className="font-medium text-text-hi">The Squad</span> · 4 online
        </div>
      </div>

      {/* thread */}
      <div className="flex flex-col gap-2 px-1 py-3">
        <motion.div
          custom={0}
          variants={bubbleVariants}
          initial="hidden"
          animate="show"
          className="max-w-[80%] self-start rounded-2xl rounded-bl-sm bg-ink-card px-3 py-2 text-sm text-text-hi"
        >
          nah Arsenal are NOT winning today 💀
        </motion.div>

        <motion.div
          custom={1}
          variants={bubbleVariants}
          initial="hidden"
          animate="show"
          className="max-w-[80%] self-end rounded-2xl rounded-br-sm bg-coin-dim/40 px-3 py-2 text-sm text-text-hi"
        >
          bet. put your coins where your mouth is
        </motion.div>

        <motion.div
          custom={2}
          variants={bubbleVariants}
          initial="hidden"
          animate="show"
          className="self-center"
        >
          <span className="rounded-full bg-ink-card px-3 py-1 text-[11px] text-text-faint">
            Pool created from this chat
          </span>
        </motion.div>

        {/* bet slip */}
        <motion.div
          custom={3}
          variants={bubbleVariants}
          initial="hidden"
          animate="show"
          className="mt-1 rounded-2xl border border-ink-border bg-ink-card p-4"
        >
          <p className="font-display text-sm font-semibold text-text-hi">
            Will Arsenal win today?
          </p>

          <div className="mt-3 flex items-center justify-between font-mono text-xs">
            <span className="text-coin">YES · 64%</span>
            <span className="text-stake">NO · 36%</span>
          </div>
          <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-ink-border">
            <motion.span
              className="h-full bg-coin"
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
            />
            <motion.span
              className="h-full bg-stake"
              initial={{ width: 0 }}
              animate={{ width: '36%' }}
              transition={{ delay: 1.7, duration: 0.7, ease: 'easeOut' }}
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="flex -space-x-1.5">
              {['bg-coin', 'bg-stake', 'bg-text-lo', 'bg-ink-border'].map(
                (c, i) => (
                  <span
                    key={i}
                    className={`h-5 w-5 rounded-full border-2 border-ink-card ${c}`}
                  />
                ),
              )}
            </div>
            <span className="font-mono text-xs text-text-lo">
              1,240 coins in the pot
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
