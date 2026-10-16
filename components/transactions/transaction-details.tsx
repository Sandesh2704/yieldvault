import { Copy, ExternalLink } from 'lucide-react'
import { Glass } from '@/components/ui/glass'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const steps = [
  'Transaction created',
  'Waiting for signature',
  'Transaction sent',
  'Confirming',
  'Confirmed',
]

export function TransactionDetails() {
  return (
    <Glass className="p-[21px]">
      <div className="mb-[23px] flex items-start justify-between">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">Transaction details</h2>
          <p className="m-0 text-[13px] text-slate-400">Latest transaction preview</p>
        </div>
        <span className="flex items-center gap-[7px] text-[10px] text-amber-400">
          <i className="h-1.5 w-1.5 rounded-full bg-current" />
          Pending
        </span>
      </div>

      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={step} className="relative flex min-h-[47px] gap-3.5">
            {i < steps.length - 1 && (
              <span className="absolute left-[11px] top-[26px] h-7 border-l border-dashed border-slate-600" />
            )}
            <span
              className={cn(
                'z-[1] grid h-6 w-6 place-items-center rounded-full border border-slate-400/15 bg-[#151a32] text-[11px] text-slate-500',
                i === 0 && 'border-emerald-400 bg-[#183c40] text-emerald-400',
                i === 1 && 'border-violet-400 bg-[#3c2470] text-violet-300',
              )}
            >
              {i < 1 ? '✓' : i === 1 ? '•' : i + 1}
            </span>
            <p className="my-[3px] text-[11px]">
              {step}
              <small className="mt-1 block text-[9px] text-slate-400">
                {i === 1
                  ? 'Waiting for wallet approval'
                  : i === 0
                    ? 'Oct 7, 2026 · 6:24 PM'
                    : 'Not started'}
              </small>
            </p>
          </div>
        ))}
      </div>

      <div className="my-2 mb-3.5 flex items-center gap-2.5 rounded-[9px] border border-slate-400/15 p-[11px]">
        <span className="text-[9px] text-slate-400">Transaction signature</span>
        <strong className="truncate text-[10px] font-medium">
          5tqR8Z...mK9v3pQ7xW2eJ4nD5rF8sT1uH6yZ
        </strong>
        <button className="p-[5px] text-slate-500 hover:text-violet-300">
          <Copy size={14} />
        </button>
      </div>

      <Button
        variant="outline"
        className="w-full justify-center rounded-[9px] border-slate-400/15 bg-white/[.04] py-2.5 text-[11px] text-slate-300 hover:bg-white/[.08]"
      >
        View on Solana Explorer <ExternalLink size={15} />
      </Button>
    </Glass>
  )
}