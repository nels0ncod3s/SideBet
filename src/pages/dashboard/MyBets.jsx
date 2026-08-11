import BetRow from '../../components/dashboard/BetRow'

const bets = [
  { title: 'Arsenal vs Chelsea', pool: '25,000', yes: 64, status: 'live' },
  { title: 'Rain in Lagos today', pool: '10,000', yes: 20, status: 'live' },
  { title: 'Osimhen scores before halftime', pool: '3,120', yes: 71, status: 'live' },
  { title: 'Who gets evicted from BBN this Sunday?', pool: '2,050', yes: 48, status: 'live' },
  { title: 'Does Tayo show up on time?', pool: '480', yes: 35, status: 'settled' },
  { title: 'Rain before the owambe ends', pool: '260', yes: 58, status: 'settled' },
]

export default function MyBets() {
  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
        My Bets
      </h1>
      <p className="mt-1 text-sm text-text-lo">
        Every pool you've staked coins in, live and settled.
      </p>

      <div className="mt-6 flex flex-col gap-3">
        {bets.map((b) => (
          <BetRow key={b.title} {...b} />
        ))}
      </div>
    </div>
  )
}
