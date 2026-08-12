import { useState, useRef } from 'react'
import { toPng } from 'html-to-image'
import { Download, Loader2 } from 'lucide-react'
import FormField from '../../components/auth/FormField'
import { formatNaira } from '../../lib/currency'

const categories = ['Sports', 'Pop culture', 'Weather', 'Friend group']

function nowLocalISO() {
  const d = new Date()
  const tzOffset = d.getTimezoneOffset() * 60000
  return new Date(d.getTime() - tzOffset).toISOString().slice(0, 16)
}

function closesLabel(datetimeStr) {
  if (!datetimeStr) return null
  const target = new Date(datetimeStr)
  if (Number.isNaN(target.getTime())) return null
  const diffMs = target.getTime() - Date.now()
  if (diffMs <= 0) return 'Already past'

  const mins = Math.round(diffMs / 60000)
  if (mins < 60) return `Closes in ${mins}m`
  const hours = Math.round(mins / 60)
  if (hours < 48) return `Closes in ${hours}h`
  const days = Math.round(hours / 24)
  return `Closes in ${days}d`
}

function formattedDate(datetimeStr) {
  if (!datetimeStr) return null
  const target = new Date(datetimeStr)
  if (Number.isNaN(target.getTime())) return null
  return target.toLocaleString('en-NG', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export default function CreatePool() {
  const [category, setCategory] = useState(categories[0])
  const [question, setQuestion] = useState('')
  const [stake, setStake] = useState('')
  const [closesAt, setClosesAt] = useState('')
  const [downloading, setDownloading] = useState(false)
  const previewRef = useRef(null)

  async function handleDownload() {
    if (!previewRef.current) return
    setDownloading(true)
    try {
      const dataUrl = await toPng(previewRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      })
      const link = document.createElement('a')
      const safeName = (question || 'sidebet-pool')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .slice(0, 40)
      link.download = `${safeName || 'sidebet-pool'}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export preview image', err)
    } finally {
      setDownloading(false)
    }
  }

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

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="Stake per person (₦)"
              type="number"
              placeholder="100"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
              required
            />
            <FormField
              label="Market closes"
              type="datetime-local"
              min={nowLocalISO()}
              value={closesAt}
              onChange={(e) => setClosesAt(e.target.value)}
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

          <div
            ref={previewRef}
            className="rounded-2xl border border-line bg-paper-raised p-5"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-brand-dim/40 px-2.5 py-1 font-mono text-[11px] text-brand">
                {category}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-text-hi">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-white">
                  S
                </span>
                SideBet
              </span>
            </div>

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
              <span>{closesLabel(closesAt) ?? '—'}</span>
            </div>
            {closesAt && (
              <p className="mt-1 text-right text-[11px] text-text-faint">
                {formattedDate(closesAt)}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-sm font-medium text-text-hi transition hover:bg-paper-card disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading ? (
              <Loader2 size={15} className="animate-spin" strokeWidth={2.25} />
            ) : (
              <Download size={15} strokeWidth={2.25} />
            )}
            {downloading ? 'Preparing image…' : 'Download preview to share'}
          </button>
          <p className="mt-3 text-xs text-text-faint">
            Send this image to your friends before you commit to creating the
            pool.
          </p>
        </div>
      </div>
    </div>
  )
}
