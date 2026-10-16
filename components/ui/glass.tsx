import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Glass({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        'rounded-[17px] dashboard-card shadow-[inset_0_1px_rgba(255,255,255,.035),0_18px_50px_rgba(0,0,0,.12)]',
        className,
      )}
    >
      {children}
    </section>
  )
}