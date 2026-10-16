'use client'

import Link from 'next/link'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ExternalLink,
  RefreshCw,
  Wallet,
} from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Glass } from '@/components/ui/glass'
import type { useWalletTransactions } from '@/hooks/solana/useWalletTransactions'
import { cn } from '@/lib/utils'

export function TxTable({
  full = false,
  walletTransactions,
}: {
  full?: boolean
  walletTransactions: ReturnType<typeof useWalletTransactions>
}) {
  const { connected } = useWallet()
  const {
    transactions,
    loading,
    error,
    refetch,
  } = walletTransactions

  return (
    <Glass className="min-w-0 p-[21px]">
      <div className="mb-[23px] flex items-start justify-between gap-3">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">
            {full ? 'Transaction history' : 'Recent transactions'}
          </h2>

          <p className="m-0 text-[13px] text-slate-400">
            {full
              ? 'Your wallet activity on Solana Devnet'
              : 'Your latest wallet activity'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => void refetch()}
            disabled={loading || !connected}
            aria-label="Refresh transactions"
            title="Refresh transactions"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            <RefreshCw
              size={15}
              className={loading ? 'animate-spin' : ''}
            />
          </button>

          {!full && (
            <Link
              href="/transactions"
              className="flex items-center gap-[5px] whitespace-nowrap text-[11px] text-violet-400"
            >
              View all <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {loading && transactions.length === 0 ? (
        <div className="space-y-3 py-5">
          {Array.from({ length: full ? 6 : 3 }).map((_, index) => (
            <div
              key={index}
              className="h-10 animate-pulse rounded-lg bg-white/5"
            />
          ))}
          <p className="text-center text-xs text-slate-400">
            Loading wallet transactions...
          </p>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <p className="text-sm text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="text-xs text-violet-400 hover:text-violet-300"
          >
            Try again
          </button>
        </div>
      ) : !connected ? (
        <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
          <Wallet size={25} className="text-slate-500" />
          <p className="m-0 text-sm text-slate-300">
            Connect your wallet to view transactions.
          </p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <p className="m-0 text-sm text-slate-300">
            No transactions found.
          </p>
          <p className="m-0 text-xs text-slate-500">
            Transactions for this wallet on Devnet will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-auto">
          <table className="w-full min-w-[620px] border-collapse text-[11px]">
            <thead>
              <tr>
                {['Type', 'Asset', 'Amount', 'Status', 'Time', 'Explorer'].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="border-b border-white/[0.07] px-3 pb-3 text-left font-medium text-slate-500 first:pl-0 last:pr-0"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody>
              {transactions.map((tx) => (
                <tr
                  key={tx.signature}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="border-b border-white/[0.05] py-3.5 pr-3 first:pl-0">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
                          tx.type === 'Receive'
                            ? 'bg-emerald-400/10 text-emerald-400'
                            : tx.type === 'Send'
                              ? 'bg-violet-400/10 text-violet-400'
                              : 'bg-white/[0.06] text-slate-400',
                        )}
                      >
                        {tx.type === 'Receive' ? (
                          <ArrowDownLeft size={14} />
                        ) : (
                          <ArrowUpRight size={14} />
                        )}
                      </span>

                      <span className="text-slate-200">{tx.type}</span>
                    </div>
                  </td>

                  <td className="border-b border-white/[0.05] px-3 py-3.5 text-slate-300">
                    {tx.asset}
                  </td>

                  <td className="border-b border-white/[0.05] px-3 py-3.5 font-medium text-slate-200">
                    {tx.amount}
                  </td>

                  <td className="border-b border-white/[0.05] px-3 py-3.5">
                    <span
                      className={cn(
                        'inline-flex rounded-full px-2 py-1 text-[10px]',
                        tx.status === 'Confirmed'
                          ? 'bg-emerald-400/10 text-emerald-400'
                          : 'bg-red-400/10 text-red-400',
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>

                  <td className="border-b border-white/[0.05] px-3 py-3.5 text-slate-400">
                    {tx.time}
                  </td>

                  <td className="border-b border-white/[0.05] py-3.5 pl-3 text-right last:pr-0">
                    <a
                      href={`https://explorer.solana.com/tx/${tx.signature}?cluster=devnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View transaction on Solana Explorer"
                      title="View on Solana Explorer"
                      className="inline-flex rounded-md p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-violet-400"
                    >
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Glass>
  )
}