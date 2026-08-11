import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import FormField from '../../components/auth/FormField'
import { clearSession } from '../../lib/mockAuth'

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
          on ? 'bg-coin' : 'bg-ink-border'
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-ink transition ${
            on ? 'left-[22px]' : 'left-0.5'
          }`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const navigate = useNavigate()
  const { session } = useOutletContext()

  function handleLogout() {
    clearSession()
    navigate('/')
  }

  return (
    <div className="max-w-xl">
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        Settings
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Manage your profile and notifications.
      </p>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-ink-border bg-ink-raised p-5">
        <FormField label="Display name" defaultValue={session?.name ?? ''} />
        <FormField
          label="Email"
          type="email"
          defaultValue={session?.phone ?? ''}
        />
      </div>

      <div className="mt-6 divide-y divide-ink-border rounded-2xl border border-ink-border bg-ink-raised px-5">
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
          description="A Sunday summary of your coin activity"
        />
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-6 rounded-xl border border-stake/40 px-5 py-2.5 text-sm font-medium text-stake transition hover:bg-stake/10"
      >
        Log out
      </button>
    </div>
  )
}
