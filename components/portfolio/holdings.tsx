'use client'

import { Copy, ExternalLink, RefreshCw, Wallet } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Glass } from '@/components/ui/glass'
import { Button } from '@/components/ui/button'
import type { useTokenBalances } from '@/hooks/solana/useTokenBalances'
import { cn } from '@/lib/utils'
import { useState } from 'react'

export function Holdings({
  tokenBalances,
}: {
  tokenBalances: ReturnType<typeof useTokenBalances>
}) {
  const { connected } = useWallet()
  const {
    tokens,
    loading,
    error,
    refetch,
  } = tokenBalances

  const [copiedMint, setCopiedMint] = useState<string | null>(null)

  async function copyMint(mint: string) {
    try {
      await navigator.clipboard.writeText(mint)
      setCopiedMint(mint)
      window.setTimeout(() => setCopiedMint(null), 1500)
    } catch {
      console.error('Failed to copy token mint address')
    }
  }

  return (
    <Glass className="mt-3.5 min-w-0 p-[21px] pb-2">
      <div className="mb-[23px] flex items-start justify-between gap-3">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">
            Token holdings
          </h2>
          <p className="m-0 text-[13px] text-slate-400">
            SPL tokens in your connected wallet
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={!connected || loading}
          className="rounded-[9px] border-slate-400/15 bg-white/[.04] px-3.5 py-2.5 text-[11px] text-slate-300 hover:bg-white/[.08]"
        >
          <RefreshCw
            size={13}
            className={cn('mr-1.5', loading && 'animate-spin')}
          />
          Refresh
        </Button>
      </div>

      {!connected ? (
        <div className="flex flex-col items-center justify-center gap-3 py-12 text-center">
          <Wallet size={26} className="text-slate-500" />
          <p className="m-0 text-sm text-slate-300">
            Connect your wallet to view your token holdings.
          </p>
        </div>
      ) : loading && tokens.length === 0 ? (
        <div className="space-y-3 py-5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-12 animate-pulse rounded-lg bg-white/[.04]"
            />
          ))}
          <p className="text-center text-xs text-slate-400">
            Loading token balances...
          </p>
        </div>
      ) : error ? (
        <div className="py-10 text-center">
          <p className="mb-3 text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="text-xs text-violet-400 hover:text-violet-300"
          >
            Try again
          </button>
        </div>
      ) : tokens.length === 0 ? (
        <div className="py-12 text-center">
          <p className="mb-2 text-sm text-slate-300">
            No SPL tokens found.
          </p>
          <p className="m-0 text-xs text-slate-500">
            Your token holdings on Solana Devnet will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full min-w-[620px] border-collapse text-[11px]">
            <thead>
              <tr>
                {['Token', 'Balance', 'Price', 'Value', '24h %', 'Actions'].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-2.5 pb-[13px] text-left text-[9px] font-medium uppercase tracking-[.08em] text-slate-500"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {tokens.map((token) => (
                <tr key={`${token.programId}-${token.mint}`}>
                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px]">
                    <div className="flex items-center gap-2 text-slate-100">
                      <span className="grid h-[25px] w-[25px] shrink-0 place-items-center rounded-full bg-violet-400/15 text-[10px] font-bold text-violet-300">
                        {token.mint.slice(0, 1)}
                      </span>

                      <div>
                        <div className="font-medium">
                          {token.mint.slice(0, 4)}...{token.mint.slice(-4)}
                        </div>
                        <small className="text-[9px] text-slate-400">
                          SPL Token
                        </small>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px] font-semibold text-slate-100">
                    {token.balance.toLocaleString('en-US', {
                      maximumFractionDigits: Math.min(token.decimals, 8),
                    })}
                  </td>

                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px] text-slate-400">
                    —
                  </td>

                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px] font-semibold text-slate-400">
                    —
                  </td>

                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px] text-slate-400">
                    —
                  </td>

                  <td className="whitespace-nowrap border-t border-slate-400/[.08] px-2.5 py-[13px]">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => void copyMint(token.mint)}
                        aria-label="Copy token mint address"
                        title={
                          copiedMint === token.mint
                            ? 'Copied!'
                            : 'Copy mint address'
                        }
                        className="p-[5px] text-slate-500 hover:text-violet-300"
                      >
                        <Copy size={14} />
                      </button>

                      <a
                        href={`https://explorer.solana.com/address/${token.mint}?cluster=devnet`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View token on Solana Explorer"
                        title="View on Solana Explorer"
                        className="p-[5px] text-slate-500 hover:text-violet-300"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="px-2.5 py-3 text-[10px] text-slate-500">
            Token prices, USD values, and 24-hour changes are not integrated yet.
          </p>
        </div>
      )}
    </Glass>
  )
}