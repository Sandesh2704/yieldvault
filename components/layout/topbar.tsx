'use client'

import { Bell, ChevronDown, Menu, Search, WalletCards } from 'lucide-react'
import WalletButton from '../wallet/wallet-connect'

export function Topbar({ onMenu }: { onMenu: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-[74px] items-center justify-between border-b border-card-border/15 bg-background/85 px-10 backdrop-blur-xl max-lg:px-6 max-md:h-[62px] max-md:gap-3 max-md:px-[15px]">
      {/* Mobile Menu Button */}
      <button
        type="button"
        className="hidden rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground max-md:flex"
        onClick={onMenu}
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Search */}
      <div className="flex min-w-[230px] items-center gap-2.5 text-xs text-muted max-md:min-w-0 max-md:flex-1">
        <Search size={16} />

        <span className="max-md:hidden">Search anything...</span>

        <kbd className="ml-auto rounded-[5px] border border-card-border/25 px-[7px] py-1 text-[10px] text-muted-foreground max-md:hidden">
          ⌘ K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 max-md:gap-1">
        {/* Network */}
        <button
          type="button"
          className="flex items-center gap-2 border-0 bg-transparent text-muted-foreground transition-colors hover:text-foreground max-md:hidden"
        >
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-success shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          Devnet
          <ChevronDown size={14} />
        </button>

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
        >
          <Bell size={18} />

          <span className="absolute right-1.5 top-1.5 h-[5px] w-[5px] rounded-full bg-brand-purple" />
        </button>

       
                   <WalletButton/>
      </div>
    </header>
  )
}