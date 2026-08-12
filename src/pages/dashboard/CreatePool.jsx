import { useState } from 'react'
import FormField from '../../components/auth/FormField'
import { formatNaira } from '../../lib/currency'

const categories = ['Sports', 'Pop culture', 'Weather', 'Friend group']

export default function CreatePool() {
  const [category, setCategory] = useState(categories[0])
  const [question, setQuestion] = useState('')
  const [stake, setStake] = useState('')
  const [closesIn, setClosesIn] = useState('')

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Create a pool
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Set the question, pick a category, and share the link.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
          <FormField
            label="Question"
            placeholder="Will Arsenal win today?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />

          <div>
            <span className="mb-1.5 block text-sm font-medium text-text-hi">
              Category
            </span>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
                    category === c
                      ? 'border-brand bg-brand-dim/30 text-brand'
                      : 'border-line text-text-lo hover:text-text-hi'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              label="Stake per person (₦)"
              type="number"
              placeholder="100"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              required
            />
            <FormField
              label="Closes in (hours)"
              type="number"
              placeholder="24"
              value={closesIn}
              onChange={(e) => setClosesIn(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-brand py-3 text-sm font-semibold text-white transition hover:brightness-110 sm:w-fit sm:px-8"
          >
            Create pool & get link
          </button>
        </form>

        <div>
          <p className="mb-2 font-mono text-xs uppercase tracking-widest text-text-faint">
            Preview
          </p>
          <div className="rounded-2xl border border-line bg-paper-raised p-5">
            <span className="rounded-full bg-brand-dim/40 px-2.5 py-1 font-mono text-[11px] text-brand">
              {category}
            </span>
            <p className="mt-3 font-display text-lg font-medium leading-snug text-text-hi">
              {question || 'Your question shows up here as you type'}
            </p>

            <div className="mt-4 flex items-center justify-between font-mono text-xs">
              <span className="text-brand">YES · 50%</span>
              <span className="text-stake">NO · 50%</span>
            </div>
            <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-line">
              <span className="h-full w-1/2 bg-brand" />
              <span className="h-full w-1/2 bg-stake" />
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-text-lo">
              <span>Stake: {stake ? formatNaira(stake) : '—'}</span>
              <span>
                Closes: {closesIn ? `${closesIn}h` : '—'}
              </span>
            </div>
          </div>
          <p className="mt-3 text-xs text-text-faint">
            This is roughly what your friends will see when the link lands
            in the chat.
          </p>
        </div>
      </div>
    </div>
  )
}
