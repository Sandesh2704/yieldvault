'use client'

import { Area, AreaChart, ResponsiveContainer } from 'recharts'
import { sol } from '@/config/dashboard'

export function Spark({
  data = sol,
  color = '#8b5cf6',
}: {
  data?: { value: number }[]
  color?: string
}) {
  const id = `g${color.replace('#', '')}`
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.35} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${id})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}