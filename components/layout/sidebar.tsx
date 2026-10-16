'use client'

import Link from 'next/link'
import {
  ArrowDownToLine,
  BarChart3,
  LayoutDashboard,
  Settings2,
  X,
} from 'lucide-react'

import { Brand } from './brand'
import { cn } from '@/lib/utils'

const links = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Portfolio', href: '/portfolio', icon: BarChart3 },
  { label: 'Transactions', href: '/transactions', icon: ArrowDownToLine },
]

export function Sidebar({
  active,
  open,
  onClose,
}: {
  active: string
  open: boolean
  onClose: () => void
}) {
  return (
    <aside
      className={cn(
        ' sticky top-0 flex h-screen w-[244px] flex-none flex-col overflow-y-auto border-r border-card-border/15 bg-background bg-cover bg-center bg-no-repeat max-lg:w-[210px]',
        'max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-[260px] max-md:-translate-x-full max-md:shadow-[20px_0_70px_rgba(0,0,0,0.5)] max-md:transition-transform max-md:duration-300',
        open && 'max-md:translate-x-0',
      )}
      
    >
      {/* Sidebar Header */}
      <div className="flex h-[74px] items-center justify-between px-2.5">
        <Brand />

        <button
          type="button"
          className="hidden rounded-lg p-2 text-muted transition-colors hover:bg-surface-hover hover:text-foreground max-md:flex"
          onClick={onClose}
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-[7px] p-[25px_16px_20px]">
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = active === label

          return (
            <Link
              key={label}
              href={href}
              onClick={onClose}
              className={cn(
                'flex items-center gap-3 rounded-[11px] border border-transparent px-3 py-[11px] text-[13px] transition-colors',
                'text-muted-foreground hover:bg-surface-hover hover:text-foreground',
                isActive &&
                  'border-brand/25 bg-gradient-to-r from-brand/25 to-brand-blue/10 text-foreground shadow-[0_0_22px_rgba(139,92,246,0.12)]',
              )}
            >
              <Icon size={17} strokeWidth={1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Network Status */}
      <div className="mx-3 mt-auto flex flex-col gap-2 rounded-[14px] border border-card-border/20 bg-background/75 p-[15px_13px] text-[10px] text-muted backdrop-blur-sm">
        <div className="flex items-center gap-2 text-xs text-foreground">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-success shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
          Solana Devnet
        </div>

        <span>RPC: api.devnet.solana.com</span>

        <strong className="font-medium text-success">78 ms</strong>
      </div>

      {/* Settings */}
      <button
        type="button"
        className="mx-3 mb-3 mt-4 flex items-center gap-2.5 rounded-lg px-3 py-3 text-xs text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
      >
        <Settings2 size={16} strokeWidth={1.8} />
        Settings
      </button>
    </aside>
  )
}