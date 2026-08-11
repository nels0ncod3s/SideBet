import {
  LayoutGrid,
  Dice5,
  CirclePlus,
  Wallet,
  Settings,
} from 'lucide-react'

export const navItems = [
  { to: '/dashboard', label: 'Overview', icon: LayoutGrid, end: true },
  { to: '/dashboard/bets', label: 'My Bets', icon: Dice5 },
  { to: '/dashboard/create', label: 'Create', icon: CirclePlus },
  { to: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
]
