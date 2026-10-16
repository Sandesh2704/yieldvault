'use client'

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { Glass } from '@/components/ui/glass'
import { useWallet } from '@solana/wallet-adapter-react'
import type { useSolBalance } from '@/hooks/solana/useSolBalance'
import type { useSolPrice } from '@/hooks/solana/useSolPrice'
import type { useTokenBalances } from '@/hooks/solana/useTokenBalances'

const COLORS = ['#22d3ee', '#34d399', '#f59e0b', '#8b5cf6', '#f472b6']

export function Allocation({
  solBalance,
  solPrice,
  tokenBalances,
}: {
  solBalance: ReturnType<typeof useSolBalance>
  solPrice: ReturnType<typeof useSolPrice>
  tokenBalances: ReturnType<typeof useTokenBalances>
}) {
  const { connected } = useWallet()
  const {
    balance,
    loading: balanceLoading,
    error: balanceError,
  } = solBalance
  const {
    price,
    loading: priceLoading,
    error: priceError,
  } = solPrice
  const {
    tokens,
    loading: tokensLoading,
    error: tokensError,
  } = tokenBalances

  const loading =
    connected && (balanceLoading || priceLoading || tokensLoading)

  const error = balanceError || priceError || tokensError

  const solValue =
    connected && balance !== null && price !== null
      ? balance * price
      : 0

  const allocation = solValue > 0
    ? [
        {
          name: 'SOL',
          value: 100,
          amount: solValue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          }),
          color: COLORS[0],
        },
      ]
    : []

  const formatUSD = (value: number) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

  return (
    <Glass className="p-[21px]">
      <div className="mb-[23px] flex items-start justify-between">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">
            Portfolio allocation
          </h2>
          <p className="m-0 text-[13px] text-slate-400">
            How your assets are distributed
          </p>
        </div>
        <button
          type="button"
          aria-label="Portfolio allocation options"
          className="tracking-[3px] text-slate-400"
        >
          •••
        </button>
      </div>

      {!connected ? (
        <p className="py-12 text-center text-sm text-slate-400">
          Connect your wallet to view allocation.
        </p>
      ) : loading ? (
        <div className="flex items-center gap-[30px] max-md:flex-col">
          <div className="h-[195px] w-[195px] animate-pulse rounded-full bg-white/5" />
          <div className="h-12 flex-1 animate-pulse rounded bg-white/5" />
        </div>
      ) : error ? (
        <p role="alert" className="py-12 text-center text-sm text-rose-400">
          Unable to load portfolio allocation.
        </p>
      ) : solValue <= 0 ? (
        <p className="py-12 text-center text-sm text-slate-400">
          No priced assets found in this wallet.
        </p>
      ) : (
        <div className="flex items-center gap-[30px] max-lg:gap-2.5 max-md:flex-col">
          <div className="relative h-[195px] w-[195px] flex-none max-lg:h-[170px] max-lg:w-[170px] max-md:h-[205px] max-md:w-[205px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={allocation}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={73}
                  outerRadius={101}
                  paddingAngle={3}
                  stroke="none"
                >
                  {allocation.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name) => [
                    `${value}%`,
                    String(name),
                  ]}
                  contentStyle={{
                    background: '#151b32',
                    border: '1px solid #303752',
                    borderRadius: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <strong className="text-[17px]">
                {formatUSD(solValue)}
              </strong>
              <span className="mt-1 text-[10px] text-slate-400">
                Total priced value
              </span>
            </div>
          </div>

          <div className="flex-1 max-md:w-full">
            {allocation.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between border-b border-slate-400/[.08] py-2.5 text-[11px]"
              >
                <span className="flex items-center gap-2.5 text-slate-300">
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ background: item.color }}
                  />
                  {item.name}
                </span>
                <strong className="font-semibold">
                  {item.value}%
                  <small className="ml-2 font-normal text-slate-400">
                    {item.amount}
                  </small>
                </strong>
              </div>
            ))}

            {tokens.length > 0 && (
              <p className="mt-3 text-[11px] text-slate-400">
                {tokens.length} SPL token type(s) detected. Token prices
                are not included yet.
              </p>
            )}
          </div>
        </div>
      )}
    </Glass>
  )
}