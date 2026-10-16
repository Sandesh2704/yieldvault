import { ChevronDown } from 'lucide-react'

export function SolanaNetwork() {
  return (
    <button
      type="button"
      className="flex h-[44px] items-center gap-3 rounded-full border border-card-border/25 bg-surface/90 px-4 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.03)] backdrop-blur-xl transition-colors hover:border-card-border/50"
    >
      {/* Solana Icon */}
      <span className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-full bg-background">
        <span className="absolute h-[5px] w-[16px] -translate-y-[5px] -skew-x-[25deg] rounded-sm bg-brand-cyan" />

        <span className="absolute h-[5px] w-[16px] rounded-sm bg-brand-purple" />

        <span className="absolute h-[5px] w-[16px] translate-y-[5px] -skew-x-[25deg] rounded-sm bg-brand-blue" />
      </span>

      <span className='text-[15px]'>Solana Devnet</span>

      <ChevronDown size={15} className="text-muted" />
    </button>
  )
}