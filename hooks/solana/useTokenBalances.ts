
'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  useConnection,
  useWallet,
} from '@solana/wallet-adapter-react'
import {
  TOKEN_PROGRAM_ID,
  TOKEN_2022_PROGRAM_ID,
  unpackAccount,
  unpackMint,
} from '@solana/spl-token'

export interface TokenBalance {
  mint: string
  balance: number
  decimals: number
  programId: string
}

export function useTokenBalances() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const [tokens, setTokens] = useState<TokenBalance[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchTokenBalances = useCallback(async () => {
    if (!connected || !publicKey) {
      setTokens([])
      setError(null)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const programs = [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]

      const results = await Promise.all(
        programs.map((programId) =>
          connection.getTokenAccountsByOwner(publicKey, {
            programId,
          }),
        ),
      )

      const tokenBalances: TokenBalance[] = []

      for (let index = 0; index < results.length; index++) {
        const programId = programs[index]

        for (const accountInfo of results[index].value) {
          const tokenAccount = unpackAccount(
            accountInfo.pubkey,
            accountInfo.account,
            programId,
          )

          if (tokenAccount.amount === 0n) continue

          const mintInfo = await connection.getAccountInfo(
            tokenAccount.mint,
          )

          if (!mintInfo) continue

          const mint = unpackMint(
            tokenAccount.mint,
            mintInfo,
            programId,
          )

          tokenBalances.push({
            mint: tokenAccount.mint.toBase58(),
            balance:
              Number(tokenAccount.amount) / 10 ** mint.decimals,
            decimals: mint.decimals,
            programId: programId.toBase58(),
          })
        }
      }

      setTokens(tokenBalances)
    } catch (err) {
      console.error('Failed to fetch SPL token balances:', err)
      setError('Unable to load token balances.')
    } finally {
      setLoading(false)
    }
  }, [connection, connected, publicKey])

  useEffect(() => {
    let cancelled = false

    if (!connected || !publicKey) {
      setTokens([])
      setError(null)
      setLoading(false)
      return
    }

    async function load() {
      try {
        if (!cancelled) {
          await fetchTokenBalances()
        }
      } catch {
        // Errors are handled inside fetchTokenBalances.
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [connected, publicKey, fetchTokenBalances])

  return {
    tokens,
    loading,
    error,
    refetch: fetchTokenBalances,
  }
}