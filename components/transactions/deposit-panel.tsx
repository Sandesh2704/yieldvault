'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight, Wallet } from 'lucide-react'
import { useWallet } from '@solana/wallet-adapter-react'
import { Glass } from '@/components/ui/glass'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { useSolBalance } from '@/hooks/solana/useSolBalance'
import type { useSolPrice } from '@/hooks/solana/useSolPrice'

type Mode = 'Deposit' | 'Withdraw' | 'Swap'

const DEMO_APY = 6.8

export function DepositPanel({
  solBalance,
  solPrice,
}: {
  solBalance: ReturnType<typeof useSolBalance>
  solPrice: ReturnType<typeof useSolPrice>
}) {
  const [mode, setMode] = useState<Mode>('Deposit')
  const [amount, setAmount] = useState('')

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

  const numericAmount = Number(amount)

  const validAmount =
    amount.trim() !== '' &&
    Number.isFinite(numericAmount) &&
    numericAmount > 0

  const amountWithinBalance =
    balance !== null &&
    numericAmount <= balance

  const amountUsd = useMemo(() => {
    if (!validAmount || price === null) return null
    return numericAmount * price
  }, [validAmount, numericAmount, price])

  const dailyEarnings = validAmount
    ? (numericAmount * (DEMO_APY / 100)) / 365
    : 0

  const yearlyEarnings = validAmount
    ? numericAmount * (DEMO_APY / 100)
    : 0

  function handleMax() {
    if (balance === null) return

    const maxAmount = Math.max(0, balance - 0.01)

    setAmount(
      maxAmount > 0
        ? maxAmount.toFixed(9).replace(/\.?0+$/, '')
        : '0',
    )
  }

  const formattedBalance =
    balance === null
      ? '—'
      : balance.toLocaleString('en-US', {
          maximumFractionDigits: 6,
        })

  const formattedUsd = (value: number) =>
    value.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    })

  const actionDisabled =
    !connected ||
    !validAmount ||
    balance === null ||
    !amountWithinBalance ||
    balanceLoading

  return (
    <Glass className="min-w-0 p-[21px]">
      <div className="flex rounded-[9px] border border-card-border/20 bg-background/50 p-1">
        {(['Deposit', 'Withdraw', 'Swap'] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => {
              setMode(item)
              setAmount('')
            }}
            className={cn(
              'flex-1 rounded-md border-0 bg-transparent p-2 text-[11px] text-muted-foreground transition-colors hover:text-foreground',
              mode === item && 'bg-brand/30 text-foreground',
            )}
          >
            {item}
          </button>
        ))}
      </div>

      <h2 className="mb-[5px] mt-[27px] text-[15px] tracking-[-.02em] text-foreground">
        {mode} {mode === 'Swap' ? 'SOL preview' : 'to Devnet Yield Vault'}
      </h2>

      <p className="mb-[25px] mt-0 text-xs text-muted">
        {mode === 'Deposit'
          ? 'Preview a SOL deposit using your connected Devnet wallet.'
          : mode === 'Withdraw'
            ? 'Preview a withdrawal. No vault position is connected yet.'
            : 'Preview a swap. No swap provider is integrated yet.'}
      </p>

      <label className="mb-2 mt-[18px] block text-[10px] text-muted">
        Wallet asset
      </label>

      <div className="flex items-center gap-2.5 rounded-[10px] border border-card-border/20 bg-background/60 p-[11px]">
        <span className="grid h-[25px] w-[25px] shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-purple to-brand-cyan text-[10px] font-bold text-background">
          S
        </span>

        <div className="flex min-w-0 flex-col gap-1">
          <strong className="text-xs text-foreground">SOL</strong>
          <small className="text-[10px] text-muted">
            {balanceLoading
              ? 'Loading balance...'
              : connected
                ? `Available: ${formattedBalance} SOL`
                : 'Connect your wallet'}
          </small>
        </div>

        <button
          type="button"
          onClick={handleMax}
          disabled={!connected || balance === null || balanceLoading}
          className="ml-auto rounded-[5px] bg-brand/15 px-2 py-[5px] text-[10px] text-brand-purple transition-colors hover:bg-brand/25 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Max
        </button>
      </div>

      {balanceError && (
        <p className="mt-2 text-[11px] text-red-400">{balanceError}</p>
      )}

      <label
        htmlFor="transaction-amount"
        className="mb-2 mt-[18px] block text-[10px] text-muted"
      >
        Amount
      </label>

      <div className="flex items-center gap-2.5 rounded-[10px] border border-card-border/20 bg-background/60 p-[11px]">
        <input
          id="transaction-amount"
          type="number"
          min="0"
          step="any"
          inputMode="decimal"
          placeholder="0.00"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          aria-label="SOL amount"
          className="w-full border-0 bg-transparent text-lg text-foreground outline-none placeholder:text-muted-foreground/50"
        />

        <strong className="text-xs text-brand-purple">SOL</strong>
      </div>

      <div className="mt-[7px] flex justify-between gap-2 text-[10px] text-muted">
        <span>
          {priceLoading
            ? 'Loading SOL price...'
            : amountUsd !== null
              ? `≈ ${formattedUsd(amountUsd)} USD`
              : 'Enter an amount'}
        </span>

        {priceError && <span className="text-amber-400">Price unavailable</span>}
      </div>

      {connected &&
        validAmount &&
        balance !== null &&
        !amountWithinBalance && (
          <p className="mt-2 text-[11px] text-red-400">
            Amount exceeds your available SOL balance.
          </p>
        )}

      <div className="my-[22px] rounded-[10px] border border-amber-400/15 bg-amber-400/[.03] p-[13px]">
        <p className="mb-3 text-[10px] font-medium text-amber-300">
          Illustrative estimates · Not actual vault returns
        </p>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            ['Example APY', `${DEMO_APY}%`],
            [
              'Daily example',
              validAmount
                ? `${dailyEarnings.toFixed(6)} SOL`
                : '—',
            ],
            [
              'Yearly example',
              validAmount
                ? `${yearlyEarnings.toFixed(6)} SOL`
                : '—',
            ],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={cn(
                'flex min-w-0 flex-col gap-1.5 pr-2',
                index < 2 && 'border-r border-card-border/20',
              )}
            >
              <span className="text-[9px] text-muted max-md:text-[8px]">
                {label}
              </span>

              <strong className="break-words text-xs text-foreground max-md:text-[10px]">
                {value}
              </strong>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="button"
        disabled
        title="A yield vault or transaction provider has not been integrated."
        className="w-full justify-center bg-gradient-to-r from-brand to-brand-purple py-5 text-xs font-semibold text-white opacity-60"
      >
        {!connected
          ? 'Connect wallet to continue'
          : !validAmount
            ? `${mode} SOL`
            : !amountWithinBalance
              ? 'Insufficient SOL'
              : `${mode} ${numericAmount} SOL`}
        <ArrowUpRight size={16} />
      </Button>

      <div className="mt-3 flex items-center justify-center gap-1.5 text-center text-[9px] text-muted">
        <Wallet size={12} />
        UI preview only · No blockchain transaction will be submitted
      </div>
    </Glass>
  )
}