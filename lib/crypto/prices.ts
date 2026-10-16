import { env } from '@/config/env'

type SolPriceResponse = {
  solana?: {
    usd?: number
  }
}

type CachedPrice = {
  price: number
  expiresAt: number
}

const CACHE_DURATION = 60_000
const RETRY_DELAY = 2_000

let cachedPrice: CachedPrice | null = null
let pendingRequest: Promise<number> | null = null
let lastFailedAt = 0

export async function getSolPrice(): Promise<number> {
  const now = Date.now()

  // Return the cached price while it is fresh.
  if (cachedPrice && now < cachedPrice.expiresAt) {
    return cachedPrice.price
  }

  // Avoid immediately retrying a rate-limited request.
  if (!cachedPrice && now - lastFailedAt < RETRY_DELAY) {
    throw new Error('SOL price is temporarily unavailable. Please try again.')
  }

  // Reuse an existing request if multiple components request the price.
  if (pendingRequest) {
    return pendingRequest
  }

  pendingRequest = (async () => {
    try {
      const response = await fetch(env.SOL_PRICE_API, {
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
      })

      if (!response.ok) {
        throw new Error(`SOL price provider returned ${response.status}`)
      }

      const data = (await response.json()) as SolPriceResponse
      const price = data.solana?.usd

      if (typeof price !== 'number' || !Number.isFinite(price) || price <= 0) {
        throw new Error('SOL price provider returned an invalid price')
      }

      cachedPrice = {
        price,
        expiresAt: Date.now() + CACHE_DURATION,
      }

      lastFailedAt = 0

      return price
    } catch (error) {
      lastFailedAt = Date.now()

      // If the provider fails, use the last successfully cached price.
      if (cachedPrice) {
        return cachedPrice.price
      }

      throw error
    } finally {
      pendingRequest = null
    }
  })()

  return pendingRequest
}