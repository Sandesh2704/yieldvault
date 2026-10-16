
'use client'

import { Sparkles, Info } from 'lucide-react'
import { Glass } from '@/components/ui/glass'
import { Button } from '@/components/ui/button'

export function YieldPosition() {
  return (
    <Glass className="p-[21px]">
      {/* Header */}
      <div className="mb-[23px] flex items-start justify-between">
        <div>
          <h2 className="mb-[5px] text-[15px] tracking-[-.02em]">
            Your yield position
          </h2>
          <p className="m-0 text-[13px] text-slate-400">
            Yield Vault Preview
          </p>
        </div>

        <span className="flex items-center gap-[7px] text-[11px] text-amber-400">
          <i className="h-1.5 w-1.5 rounded-full bg-current" />
          Demo
        </span>
      </div>

      {/* Position */}
      <div className="my-[30px] flex items-center gap-3.5">
        <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-violet-500/[.16] text-violet-300">
          <Sparkles size={22} />
        </div>

        <div>
          <span className="text-[11px] text-slate-400">
            Total deposited
          </span>
          <strong className="my-1 block text-[23px]">
            —
          </strong>
          <small className="block text-[11px] text-slate-400">
            No active vault position
          </small>
        </div>
      </div>

      {/* Yield information */}
      <div className="flex items-center gap-[38px] border-t border-slate-400/15 pt-4 max-md:flex-wrap max-md:gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-400">
            APY
          </span>
          <strong className="text-[15px]">—</strong>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-[10px] text-slate-400">
            Est. earnings
          </span>
          <strong className="text-[15px]">—</strong>
          <small className="text-[10px] text-slate-400">
            Not available
          </small>
        </div>

        <div className="ml-auto flex flex-row gap-2 max-md:ml-0 max-md:w-full">
          <Button
            disabled
            className="bg-gradient-to-r from-violet-600 to-indigo-600 px-3.5 py-2.5 text-xs font-semibold text-white opacity-50 shadow-[0_8px_22px_rgba(79,70,229,.25)] max-md:flex-1 max-md:justify-center"
          >
            Deposit
          </Button>

          <Button
            disabled
            variant="outline"
            className="rounded-[9px] border-slate-400/15 bg-white/[.04] px-3.5 py-2.5 text-[11px] text-slate-300 opacity-50 max-md:flex-1 max-md:justify-center"
          >
            Withdraw
          </Button>
        </div>
      </div>

      {/* Notice */}
      <div className="mt-4 flex items-start gap-2 rounded-lg border border-slate-400/10 bg-white/[.03] p-3">
        <Info size={15} className="mt-0.5 shrink-0 text-slate-400" />
        <p className="m-0 text-[11px] leading-5 text-slate-400">
          Demo preview. Yield deposits and earnings are not active.
          Connect a real yield protocol before enabling these actions.
        </p>
      </div>
    </Glass>
  )
}