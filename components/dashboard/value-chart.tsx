'use client'

import { useState } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Glass } from '@/components/ui/glass'
import { portfolio } from '@/config/dashboard'
import { cn } from '@/lib/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import type { useSolBalance } from '@/hooks/solana/useSolBalance'
import type { useSolPrice } from '@/hooks/solana/useSolPrice'

export function ValueChart({
  title = 'Portfolio value',
  data = portfolio,
  solBalance,
  solPrice,
}: {
  title?: string
  data?: { date: string; value: number }[]
  solBalance: ReturnType<typeof useSolBalance>
  solPrice: ReturnType<typeof useSolPrice>
}) {
  const [range, setRange] = useState('1D')
  const { connected } = useWallet()
  const {    balance,    loading: balanceLoading,    error: balanceError,  } = solBalance
  const {    price,    loading: priceLoading,    error: priceError,  } = solPrice

  const loading = connected && (balanceLoading || priceLoading)
  const error = balanceError || priceError

  const currentValue =
    connected && balance !== null && price !== null
      ? balance * price
      : null

  const formattedValue =
    currentValue !== null
      ? currentValue.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : null

  return (
    <Glass className="p-[21px]">
      <div className="mb-[23px] flex items-start justify-between gap-3">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">
            {title}
          </h2>

          <div className="mt-3 text-[23px] font-bold tracking-[-.04em]">
            {!connected
              ? 'Connect wallet'
              : loading
                ? 'Loading...'
                : error || formattedValue === null
                  ? 'Unavailable'
                  : formattedValue}
          </div>

          <p className="mt-1 text-[10px] text-slate-400">
            Current SOL value · Historical chart is demo data
          </p>
        </div>

        <div className="flex gap-0.5 rounded-[7px] border border-slate-400/15 p-[3px]">
          {['1D', '1W', '1M', '1Y'].map((x) => (
            <button
              key={x}
              type="button"
              onClick={() => setRange(x)}
              aria-pressed={range === x}
              className={cn(
                'rounded-[5px] px-2 py-[5px] text-[10px] text-slate-400',
                range === x && 'bg-[#302461] text-[#d8ccff]',
              )}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-[5px] -mb-1.5 h-[195px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="portfolioFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#77809b', fontSize: 11 }}
            />

            <YAxis hide domain={['dataMin - 80', 'dataMax + 30']} />

            <Tooltip
              contentStyle={{
                background: '#151b32',
                border: '1px solid #303752',
                borderRadius: 12,
              }}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#a78bfa"
              strokeWidth={2.5}
              fill="url(#portfolioFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Glass>
  )
}