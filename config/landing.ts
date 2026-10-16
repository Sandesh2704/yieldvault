import { ArrowRight, BarChart3, TrendingUp, WalletCards } from 'lucide-react'

export const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Transactions', href: '/transactions' },
]

export const featureCards = [
  {
    icon: WalletCards,
    title: 'Connect Wallet',
    text: 'Use Phantom or Solflare to access your Solana portfolio.',
    visual: 'wallet' as const,
  },
  {
    icon: BarChart3,
    title: 'Track Portfolio',
    text: 'View your SOL and SPL token balances with real-time data.',
    visual: 'portfolio' as const,
  },
  {
    icon: TrendingUp,
    title: 'Explore Yield',
    text: 'View your vault positions, APY, and estimated earnings.',
    visual: 'yield' as const,
  },
  {
    icon: ArrowRight,
    title: 'Deposit & Withdraw',
    text: 'Manage your positions with real on-chain transactions.',
    visual: 'transactions' as const,
  },
]