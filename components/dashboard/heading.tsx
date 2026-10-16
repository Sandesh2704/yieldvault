import { ChevronDown } from 'lucide-react'

export function Heading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="mb-[30px] flex items-end justify-between max-md:mb-[23px] max-md:flex-col max-md:items-start max-md:gap-4">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[.15em] text-violet-400">
          {eyebrow}
        </span>
        <h1 className="mb-[9px] mt-2 text-[32px] leading-[1.1] tracking-[-.04em] max-md:text-[28px]">
          {title}
        </h1>
        <p className="m-0 text-[13px] text-slate-400">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2.5 rounded-sm dashboard-card px-3 py-2.5 text-[11px] text-slate-400 max-md:hidden">
        Oct 7, 2026 <ChevronDown size={14} />
      </div>
    </div>
  )
}