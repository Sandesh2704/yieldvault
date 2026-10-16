import Link from 'next/link'
import { navItems } from '@/config/landing'
import { Brand } from '../layout/brand'

export function HomeFooter() {
  return (
    <footer className="border-t border-card-border/15 bg-background">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-center gap-4 px-5 py-5 text-center md:flex-row md:justify-between md:text-left sm:px-8 lg:px-8">
        <Brand />

        <nav className="flex flex-wrap justify-center gap-5">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-muted transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="text-xs text-muted/70">
          Solana Devnet · 2026
        </span>
      </div>
    </footer>
  )
}