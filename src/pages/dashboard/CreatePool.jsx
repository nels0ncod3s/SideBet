import { useState } from 'react'
import FormField from '../../components/auth/FormField'

const categories = ['Sports', 'Pop culture', 'Weather', 'Friend group']

export default function CreatePool() {
  const [category, setCategory] = useState(categories[0])

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Create a pool
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Set the question, pick a category, and share the link.
      </p>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="mt-6 flex flex-col gap-5"
      >
        <FormField
          label="Question"
          placeholder="Will Arsenal win today?"
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
                    ? 'border-coin bg-coin-dim/30 text-coin'
                    : 'border-ink-border text-text-lo hover:text-text-hi'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Stake per person"
            type="number"
            placeholder="100"
            required
          />
          <FormField
            label="Closes in (hours)"
            type="number"
            placeholder="24"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full rounded-xl bg-coin py-3 text-sm font-semibold text-ink transition hover:brightness-110 sm:w-fit sm:px-8"
        >
          Create pool & get link
        </button>
      </form>
    </div>
  )
}
