
'use client'

import { useCallback, useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import type { ParsedTransactionWithMeta } from '@solana/web3.js'

export interface WalletTransaction {
  signature: string
  type: 'Send' | 'Receive' | 'Transaction'
  asset: string
  amount: string
  status: 'Confirmed' | 'Failed'
  time: string
  blockTime: number | null
}

export function useWalletTransactions(limit = 10) {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const [transactions, setTransactions] = useState<WalletTransaction[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTransactions = useCallback(async () => {
    if (!connected || !publicKey) {
      setTransactions([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const signatures = await connection.getSignaturesForAddress(
        publicKey,
        { limit },
        'confirmed',
      )

      const parsedTransactions =
        await connection.getParsedTransactions(
          signatures.map((item) => item.signature),
          {
            commitment: 'confirmed',
            maxSupportedTransactionVersion: 0,
          },
        )

      const walletAddress = publicKey.toBase58()

      const rows = signatures.map((signatureInfo, index) => {
        const tx: ParsedTransactionWithMeta | null =
          parsedTransactions[index]

        let type: WalletTransaction['type'] = 'Transaction'
        let amount = '—'

        if (tx?.meta) {
          const accountIndex =
            tx.transaction.message.accountKeys.findIndex(
              (key) => key.pubkey.toBase58() === walletAddress,
            )

          if (accountIndex !== -1) {
            const preBalance =
              tx.meta.preBalances[accountIndex] ?? 0
            const postBalance =
              tx.meta.postBalances[accountIndex] ?? 0

            // Include the transaction fee when interpreting the SOL change.
            const delta = postBalance - preBalance
            const fee =
              tx.transaction.message.accountKeys[accountIndex].signer
                ? tx.meta.fee
                : 0

            const adjustedDelta =
              delta + fee

            if (adjustedDelta < 0) {
              type = 'Send'
              amount = `${(
                Math.abs(adjustedDelta) / 1_000_000_000
              ).toLocaleString('en-US', {
                maximumFractionDigits: 6,
              })} SOL`
            } else if (adjustedDelta > 0) {
              type = 'Receive'
              amount = `${(
                adjustedDelta / 1_000_000_000
              ).toLocaleString('en-US', {
                maximumFractionDigits: 6,
              })} SOL`
            } else {
              amount = '0 SOL'
            }
          }
        }

        const blockTime = signatureInfo.blockTime ?? null

        return {
          signature: signatureInfo.signature,
          type,
          asset: 'SOL',
          amount,
          status: signatureInfo.err ? 'Failed' : 'Confirmed',
          time: blockTime
            ? new Date(blockTime * 1000).toLocaleString()
            : 'Unknown',
          blockTime,
        } satisfies WalletTransaction
      })

      setTransactions(rows)
    } catch (err) {
      console.error('Failed to fetch wallet transactions:', err)
      setError('Unable to load transaction history.')
    } finally {
      setLoading(false)
    }
  }, [connection, connected, publicKey, limit])

  useEffect(() => {
    void fetchTransactions()
  }, [fetchTransactions])

  return {
    transactions,
    loading,
    error,
    refetch: fetchTransactions,
  }
}