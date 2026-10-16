'use client'

import { useEffect, useState } from 'react'

interface SolPriceResponse {
  success: boolean
  price?: number
  message?: string
}

export function useSolPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPrice() {
      try {
        setLoading(true)
        setError(null)

        console.log('[useSolPrice] fetching /api/sol-price...')

        const response = await fetch('/api/sol-price')

        console.log('[useSolPrice] response status:', response.status, response.ok)

        if (!response.ok) {
          const body = await response.text()
          console.error('[useSolPrice] non-OK body:', body)
          throw new Error('Failed to fetch SOL price')
        }

        const data: SolPriceResponse = await response.json()

        console.log('[useSolPrice] payload:', data)

        if (!data.success || typeof data.price !== 'number') {
          throw new Error(data.message || 'SOL price unavailable')
        }

        if (!cancelled) {
          setPrice(data.price)
        }
      } catch (err) {
        console.error('[useSolPrice] error:', err)
        if (!cancelled) {
          setError('Unable to load SOL price')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    fetchPrice()

    return () => {
      cancelled = true
    }
  }, [])

  return { price, loading, error }
}