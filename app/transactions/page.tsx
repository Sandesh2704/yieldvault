'use client'

import { Layout } from '@/components/layout/layout'
import { Heading } from '@/components/dashboard/heading'
import { TxTable } from '@/components/dashboard/tx-table'
import { DepositPanel } from '@/components/transactions/deposit-panel'
import { TransactionDetails } from '@/components/transactions/transaction-details'
import { useSolBalance } from '@/hooks/solana/useSolBalance'
import { useSolPrice } from '@/hooks/solana/useSolPrice'
import { useWalletTransactions } from '@/hooks/solana/useWalletTransactions'

export default function TransactionsPage() {
  const solBalance = useSolBalance()
  const solPrice = useSolPrice()
  const walletTransactions = useWalletTransactions(50)

  return (
    <Layout active="Transactions">
      <main>
        <Heading
          eyebrow="Activity"
          title="Transactions"
          subtitle="View your on-chain wallet activity and preview deposit, withdrawal, and swap flows."
        />

        <div className="mb-3.5 flex items-center gap-2.5 rounded-[10px] border border-emerald-400/[.16] bg-emerald-400/[.05] px-[13px] py-[11px] text-[11px] text-slate-300">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />
          Wallet activity is fetched from Solana Devnet. Deposit, withdraw, and swap actions are previews only.
        </div>

        <div className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3.5 max-lg:grid-cols-1">
          <DepositPanel
            solBalance={solBalance}
            solPrice={solPrice}
          />

          <div className="flex min-w-0 flex-col gap-3.5">
            <TxTable full walletTransactions={walletTransactions} />
            <TransactionDetails />
          </div>
        </div>
      </main>
    </Layout>
  )
}