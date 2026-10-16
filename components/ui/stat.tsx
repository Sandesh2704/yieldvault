
import { ArrowUpRight, AlertCircle } from 'lucide-react'
import { Glass } from './glass'
import { Spark } from './spark'

interface StatProps {
  label: string
  value: string
  detail?: string
  change: string
  color?: string
  loading?: boolean
  error?: string | null
}

export function Stat({
  label,
  value,
  detail,
  change,
  color = '#8b5cf6',
  loading = false,
  error = null,
}: StatProps) {
  return (
    <Glass className="min-h-[142px] p-[18px] max-md:min-h-[130px] max-md:p-3.5">
      <div className="flex items-center justify-between text-[11px] text-slate-400 max-md:text-[10px]">
        <span>{label}</span>
        <ArrowUpRight size={15} className="text-slate-500" />
      </div>

      {/* Value */}
      {loading ? (
        <div className="mt-[18px] h-[27px] w-28 animate-pulse rounded-md bg-white/10 max-md:mt-[15px] max-md:h-[22px]" />
      ) : error ? (
        <div className="mt-[18px] flex items-center gap-1.5 text-sm text-rose-400 max-md:mt-[15px] max-md:text-xs">
          <AlertCircle size={14} />
          <span>Unavailable</span>
        </div>
      ) : (
        <strong className="mt-[18px] block text-[22px] tracking-[-.04em] max-md:mt-[15px] max-md:text-[17px]">
          {value}
        </strong>
      )}

      {/* Detail */}
      {!loading && !error && detail && (
        <small className="mt-[5px] block text-[11px] text-slate-400 max-md:text-[10px]">
          {detail}
        </small>
      )}

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between max-md:items-end">
        {loading ? (
          <div className="h-3 w-20 animate-pulse rounded bg-white/10" />
        ) : error ? (
          <span className="text-[11px] text-rose-400">
            {error}
          </span>
        ) : (
          <span className="text-xs text-emerald-400 max-md:text-[9px]">
            {change}
          </span>
        )}

        <div className="h-[27px] w-[85px] max-md:w-[50px]">
          {!loading && !error && <Spark color={color} />}
        </div>
      </div>
    </Glass>
  )
}