import Header from './components/Header'
import Hero from './components/Hero'
import LiveStats from './components/LiveStats'
import HowItWorks from './components/HowItWorks'
import MarketBento from './components/MarketBento'
import Footer from './components/Footer'

function App() {
  return (
    <div id="top" className="min-h-screen bg-ink font-body text-text-hi">
      <Header />
      <Hero />
      <LiveStats />
      <HowItWorks />
      <MarketBento />
      <Footer />
    </div>
  )
}

export default App
