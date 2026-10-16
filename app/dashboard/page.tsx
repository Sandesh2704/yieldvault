'use client'

import { Layout } from '@/components/layout/layout'
import { Heading } from '@/components/dashboard/heading'
import { Summary } from '@/components/dashboard/summary'
import { Allocation } from '@/components/dashboard/allocation'
import { ValueChart } from '@/components/dashboard/value-chart'
import { YieldPosition } from '@/components/dashboard/yield-position'
import { TxTable } from '@/components/dashboard/tx-table'
import { sol } from '@/config/dashboard'
import { useSolBalance } from '@/hooks/solana/useSolBalance'
import { useSolPrice } from '@/hooks/solana/useSolPrice'
import { useTokenBalances } from '@/hooks/solana/useTokenBalances'
import { useWalletTransactions } from '@/hooks/solana/useWalletTransactions'

export default function DashboardPage() {
  const solBalance = useSolBalance()
  const solPrice = useSolPrice()
  const tokenBalances = useTokenBalances()
  const walletTransactions = useWalletTransactions(5)

  return (
    <Layout active="Dashboard">
      <main className="">
        <Heading
          eyebrow="Overview"
          title="Welcome back"
          subtitle="Track your portfolio, explore yield opportunities, and manage your Solana assets."
        />
        <Summary
          solBalance={solBalance}
          solPrice={solPrice}
          tokenBalances={tokenBalances}
        />
        <div className="mb-3.5 grid grid-cols-[1.05fr_1fr] gap-3.5 max-md:grid-cols-1">
          <YieldPosition />
          <Allocation
            solBalance={solBalance}
            solPrice={solPrice}
            tokenBalances={tokenBalances}
          />
        </div>
        <div className="mb-3.5 grid grid-cols-[1.05fr_1fr] gap-3.5 max-md:hidden">
          <TxTable walletTransactions={walletTransactions} />
          <ValueChart
            title="SOL price"
            data={sol}
            solBalance={solBalance}
            solPrice={solPrice}
          />
        </div>
      </main>
    </Layout>
  )
}