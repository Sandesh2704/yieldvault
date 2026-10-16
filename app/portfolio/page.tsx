'use client'

import { Layout } from '@/components/layout/layout'
import { Heading } from '@/components/dashboard/heading'
import { Summary } from '@/components/dashboard/summary'
import { Allocation } from '@/components/dashboard/allocation'
import { ValueChart } from '@/components/dashboard/value-chart'
import { Holdings } from '@/components/portfolio/holdings'
import { useSolBalance } from '@/hooks/solana/useSolBalance'
import { useSolPrice } from '@/hooks/solana/useSolPrice'
import { useTokenBalances } from '@/hooks/solana/useTokenBalances'

export default function PortfolioPage() {
  const solBalance = useSolBalance()
  const solPrice = useSolPrice()
  const tokenBalances = useTokenBalances()

  return (
    <Layout active="Portfolio">
      <main className="">
        <Heading
          eyebrow="Your assets"
          title="Portfolio"
          subtitle="View your SOL and SPL token balances with real-time data."
        />
        <Summary
          portfolioPage
          solBalance={solBalance}
          solPrice={solPrice}
          tokenBalances={tokenBalances}
        />
        <div className="mb-3.5 grid grid-cols-[1.05fr_1fr] gap-3.5 max-md:grid-cols-1">
          <Allocation
            solBalance={solBalance}
            solPrice={solPrice}
            tokenBalances={tokenBalances}
          />
          <ValueChart
            solBalance={solBalance}
            solPrice={solPrice}
          />
        </div>
        <Holdings
          tokenBalances={tokenBalances}
        />
      </main>
    </Layout>
  )
}