import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import FormField from '../../components/auth/FormField'

function Toggle({ label, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn)
  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-text-hi">{label}</p>
        {description && (
          <p className="mt-0.5 text-xs text-text-lo">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={() => setOn((v) => !v)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          on ? 'bg-brand' : 'bg-line'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper transition ${
            on ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const { session } = useOutletContext()
  const joined = session?.joinedAt
    ? new Date(session.joinedAt).toLocaleDateString('en-NG', {
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <div className="grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-[1fr_240px]">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Settings
        </h1>
        <p className="mt-1 text-sm text-text-lo">
          Manage your profile and notifications.
        </p>

        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-paper-raised p-5">
          <FormField label="Display name" defaultValue={session?.name ?? ''} />
          <FormField
            label="Email"
            type="email"
            defaultValue={session?.phone ?? ''}
          />
          <div>
            <button
              type="button"
              className="rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
            >
              Save changes
            </button>
          </div>
        </div>

        <div className="mt-6 divide-y divide-line rounded-2xl border border-line bg-paper-raised px-5">
          <Toggle
            label="Pool invites"
            description="Get notified when a friend starts a pool"
            defaultOn
          />
          <Toggle
            label="Settlement results"
            description="Get notified when a pool you're in settles"
            defaultOn
          />
          <Toggle
            label="Weekly recap"
            description="A Sunday summary of your balance activity"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="rounded-2xl border border-line bg-paper-raised p-5">
          <p className="font-mono text-xs uppercase tracking-widest text-text-faint">
            Account
          </p>
          <p className="mt-2 text-sm font-medium text-text-hi">
            {session?.name ?? 'You'}
          </p>
          {joined && (
            <p className="mt-0.5 text-xs text-text-lo">Joined {joined}</p>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-paper-card p-5">
          <p className="text-sm font-medium text-text-hi">Play-money beta</p>
          <p className="mt-1.5 text-xs leading-relaxed text-text-lo">
            Your balance has no cash value. Logging out clears this device's
            session — your balance and bets stay tied to your account.
          </p>
        </div>
      </div>
    </div>
  )
}
