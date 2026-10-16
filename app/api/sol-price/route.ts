import { NextResponse } from 'next/server'

const SOL_MINT = 'So11111111111111111111111111111111111111112'

let cache: { price: number; at: number } | null = null
const TTL_MS = 30_000 // 30s server-side cache

export async function GET() {
  // Serve from cache if fresh
  if (cache && Date.now() - cache.at < TTL_MS) {
    return NextResponse.json({ success: true, price: cache.price })
  }

  const sources = [
    {
      name: 'jupiter',
      url: `https://api.jup.ag/price/v2?ids=${SOL_MINT}`,
      extract: (j: any) => Number(j?.data?.[SOL_MINT]?.price),
    },
    {
      name: 'binance',
      url: 'https://api.binance.com/api/v3/ticker/price?symbol=SOLUSDT',
      extract: (j: any) => Number(j?.price),
    },
    {
      name: 'coinbase',
      url: 'https://api.coinbase.com/v2/prices/SOL-USD/spot',
      extract: (j: any) => Number(j?.data?.amount),
    },
  ]

  for (const src of sources) {
    try {
      const res = await fetch(src.url, {
        cache: 'no-store',
        headers: { accept: 'application/json' },
      })

      if (!res.ok) {
        console.warn(`[api/sol-price] ${src.name} status ${res.status}`)
        continue
      }

      const json = await res.json()
      const price = src.extract(json)

      if (Number.isFinite(price) && price > 0) {
        cache = { price, at: Date.now() }
        return NextResponse.json({ success: true, price })
      }

      console.warn(`[api/sol-price] ${src.name} bad payload`, json)
    } catch (err) {
      console.warn(`[api/sol-price] ${src.name} failed:`, err)
    }
  }

  // All sources failed — serve stale cache if we have one
  if (cache) {
    return NextResponse.json({ success: true, price: cache.price })
  }

  return NextResponse.json(
    { success: false, message: 'All price sources failed' },
    { status: 502 },
  )
}