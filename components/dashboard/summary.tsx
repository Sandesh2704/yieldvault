'use client'
import { Stat } from '@/components/ui/stat'
import { useWallet } from '@solana/wallet-adapter-react'
import type { useSolBalance } from '@/hooks/solana/useSolBalance'
import type { useSolPrice } from '@/hooks/solana/useSolPrice'
import type { useTokenBalances } from '@/hooks/solana/useTokenBalances'

export function Summary({
  portfolioPage = false,
  solBalance,
  solPrice,
  tokenBalances,
}: {
  portfolioPage?: boolean
  solBalance: ReturnType<typeof useSolBalance>
  solPrice: ReturnType<typeof useSolPrice>
  tokenBalances: ReturnType<typeof useTokenBalances>
}) {
  const { connected } = useWallet()
  const { balance, loading, error } = solBalance
  const { price, loading: priceLoading, error: priceError } = solPrice
  const { tokens, loading: tokensLoading, error: tokensError } = tokenBalances

  return (
    <div className="mb-3.5 grid grid-cols-4 gap-3.5 max-md:grid-cols-2 max-md:gap-[9px]">
      <Stat
        label="Total portfolio value"
        value={
          !connected
            ? 'Connect wallet'
            : balance !== null && price !== null
              ? (balance * price).toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })
              : '$0.00'
        }
        loading={connected && (loading || priceLoading)}
        error={connected ? error || priceError : null}
        change="SOL value"
        color="#8b5cf6"
      />
      <Stat
        label="SOL balance"
        value={
          balance !== null
            ? `${balance.toLocaleString('en-US', {
              maximumFractionDigits: 4,
            })} SOL`
            : '0 SOL'
        }
        loading={connected && loading}
        error={connected ? error : null}
        change="Devnet balance"
        color="#22d3ee"
      />

      <Stat
        label="SPL token balances"
        value={
          !connected
            ? 'Connect wallet'
            : tokensLoading
              ? ''
              : tokens.length === 0
                ? '0 tokens'
                : `${tokens.length} tokens`
        }
        loading={connected && tokensLoading}
        error={connected ? tokensError : null}
        detail={
          !connected
            ? 'Connect your Solana wallet'
            : !tokensLoading && !tokensError
              ? `${tokens.reduce(
                (total, token) => total + token.balance,
                0,
              ).toLocaleString('en-US', {
                maximumFractionDigits: 4,
              })} total token units`
              : undefined
        }
        change="Devnet tokens"
        color="#34d399"
      />
      <Stat
        label={portfolioPage ? 'Yield position' : 'Yield earnings'}
        value="Demo only"
        detail="No active yield position"
        change="Coming soon"
        color="#f59e0b"
      />
    </div>
  )
}