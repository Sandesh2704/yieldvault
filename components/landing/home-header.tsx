'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Brand } from '@/components/layout/brand'
import { SolanaNetwork } from './solana-network'
import { navItems } from '@/config/landing'
import { cn } from '@/lib/utils'
import WalletButton from '../wallet/wallet-connect'

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
<header className="fixed inset-x-0 top-0 z-50 h-[82px] border-b border-card-border/15 bg-background/65 backdrop-blur-xl">
       <div className="mx-auto flex h-full max-w-[1400px] items-center justify-between px-5 sm:px-8 lg:px-8">
        <Brand />

        {/* Desktop Navigation */}
        <nav className="ml-10 hidden items-center gap-2 md:flex">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-[17px] px-[23px] py-[13px] text-[14px] transition-colors',
                index === 0
                  ? 'dashboard-card'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <SolanaNetwork />

          <WalletButton className="h-[44px] min-w-[180px] justify-center rounded-[15px] px-7 shadow-[0_8px_30px_rgba(112,73,255,0.25)]" />
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-foreground transition-colors hover:bg-surface-hover md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-[82px] border-b border-card-border/20 bg-background/95 p-5 shadow-2xl backdrop-blur-xl md:hidden"
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'rounded-xl px-4 py-3 text-sm transition-colors',
                  index === 0
                    ? 'bg-surface-hover text-foreground'
                    : 'text-muted-foreground hover:bg-surface-hover hover:text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 flex  gap-3">
            <SolanaNetwork />

            <WalletButton className='!w-full'/>
          </div>
        </div>
      )}
    </header>
  )
}