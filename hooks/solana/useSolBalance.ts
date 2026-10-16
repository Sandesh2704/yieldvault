'use client'

import { useEffect, useState } from 'react'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL } from '@solana/web3.js'

export function useSolBalance() {
  const { connection } = useConnection()
  const { publicKey, connected } = useWallet()

  const [balance, setBalance] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!connected || !publicKey) {
      setBalance(null)
      return
    }

    let cancelled = false

    async function fetchBalance() {
      try {
        setLoading(true)
        setError(null)

        const lamports = await connection.getBalance(publicKey!)

        if (!cancelled) {
          setBalance(lamports / LAMPORTS_PER_SOL)
        }
      } catch {
        if (!cancelled) {
          setError('Failed to fetch SOL balance')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchBalance()

    return () => {
      cancelled = true
    }
  }, [connection, publicKey, connected])

  return { balance, loading, error }
}