'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  CircleAlert,
  Copy,
  LoaderCircle,
  X,
} from 'lucide-react'
import {
  useWallet,
} from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useSolBalance } from '@/hooks/solana/useSolBalance'
import { useRouter, usePathname } from 'next/navigation'

export default function WalletButton({
  className = '',
}: {
  className?: string
}) {
  const { connected, publicKey } = useWallet()
  const { balance, loading, error } = useSolBalance()

  const router = useRouter()
  const pathname = usePathname()

  const wasConnected = useRef(connected)

  const [mounted, setMounted] = useState(false)
  const [balanceOpen, setBalanceOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const address = publicKey?.toBase58()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Redirect to the dashboard only when the wallet connects on Home.
  // Disconnecting never redirects the user.
  useEffect(() => {
    if (!wasConnected.current && connected && pathname === '/') {
      router.push('/dashboard')
    }

    wasConnected.current = connected
  }, [connected, pathname, router])

  // Close the balance popover when the wallet disconnects.
  useEffect(() => {
    if (!connected) {
      setBalanceOpen(false)
    }
  }, [connected])

  async function copyAddress() {
    if (!address) return

    try {
      await navigator.clipboard.writeText(address)
      setCopied(true)

      window.setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {
      setCopied(false)
    }
  }

  // Keep the server-rendered and initial client-rendered HTML identical.
  if (!mounted) {
    return (
      <div className="flex h-10 items-center">
        <div
          className={`h-10 w-36 animate-pulse rounded-xl bg-surface ${className}`}
          aria-label="Loading wallet"
        />
      </div>
    )
  }

  const formattedBalance =
    balance !== null && Number.isFinite(Number(balance))
      ? Number(balance).toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 4,
        })
      : null

  return (
    <div className="relative flex items-center">
      <div className="flex items-center gap-2">
        <WalletMultiButton className={className}>
          {connected && address
            ? `${address.slice(0, 4)}...${address.slice(-4)}`
            : 'Connect Wallet'}
        </WalletMultiButton>

        {connected && (
          <button
            type="button"
            onClick={() => setBalanceOpen((open) => !open)}
            aria-label="Toggle wallet balance"
            aria-expanded={balanceOpen}
            className="flex h-10 w-9 shrink-0 items-center justify-center rounded-xl border border-card-border/30 bg-surface text-muted-foreground transition-colors hover:border-brand-purple/40 hover:bg-surface-hover hover:text-foreground"
          >
            <ChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                balanceOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>

      {connected && balanceOpen && (
        <>
          <button
            type="button"
            aria-label="Close wallet balance"
            onClick={() => setBalanceOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />

          <div className="absolute right-0 top-[calc(100%+12px)] z-50 w-[min(320px,calc(100vw-24px))] overflow-hidden rounded-2xl border border-card-border/40 bg-card shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
            {/* Card header */}
            <div className="flex items-center justify-between border-b border-card-border/25 px-4 py-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-brand-purple/20 bg-brand-purple/10 text-xl font-bold text-brand-purple">
                  ◎
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    My Wallet
                  </p>

                  <div className="mt-1 flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(52,211,153,0.6)]" />

                    <span className="text-[11px] text-muted-foreground">
                      Connected to Devnet
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setBalanceOpen(false)}
                aria-label="Close balance panel"
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            {/* Balance */}
            <div className="p-4">
              <p className="text-xs font-medium text-muted-foreground">
                Available Balance
              </p>

              {loading ? (
                <div className="mt-3 flex items-center gap-2">
                  <LoaderCircle
                    size={18}
                    className="animate-spin text-brand-purple"
                  />

                  <span className="text-sm text-muted-foreground">
                    Fetching balance...
                  </span>
                </div>
              ) : error ? (
                <div className="mt-3 flex items-start gap-2 rounded-lg border border-red-400/15 bg-red-400/5 p-3">
                  <CircleAlert
                    size={16}
                    className="mt-0.5 shrink-0 text-red-400"
                  />

                  <p className="break-words text-xs leading-5 text-red-400">
                    {error}
                  </p>
                </div>
              ) : formattedBalance !== null ? (
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-3xl font-bold tracking-tight text-foreground">
                    {formattedBalance}
                  </span>

                  <span className="text-sm font-semibold text-brand-purple">
                    SOL
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Balance unavailable
                </p>
              )}

              {/* Wallet address */}
              <div className="mt-4 rounded-xl border border-card-border/30 bg-background/60 p-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Wallet Address
                </p>

                <div className="flex items-center justify-between gap-2">
                  <span className="min-w-0 break-all font-mono text-xs text-foreground">
                    {address}
                  </span>

                  <button
                    type="button"
                    onClick={copyAddress}
                    aria-label="Copy wallet address"
                    className="shrink-0 rounded-lg p-2 text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
                  >
                    {copied ? (
                      <Check size={15} className="text-success" />
                    ) : (
                      <Copy size={15} />
                    )}
                  </button>
                </div>

                {copied && (
                  <p className="mt-2 text-[11px] text-success">
                    Address copied successfully
                  </p>
                )}
              </div>

              <p className="mt-3 text-[10px] leading-4 text-muted-foreground">
                Test SOL on Solana Devnet has no real-world monetary value.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}