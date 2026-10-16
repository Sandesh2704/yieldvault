type VisualType = 'wallet' | 'portfolio' | 'yield' | 'transactions'

const tokens = [
  {
    name: 'SOL',
    icon: 'S',
    className: 'bg-gradient-to-br from-[#00ffa3] via-[#775cff] to-[#00c2ff]',
  },
  { name: 'USDC', icon: '$', className: 'bg-[#2775ca]' },
  { name: 'USDT', icon: '₮', className: 'bg-[#26a17b]' },
]

export function FeatureVisual({ type }: { type: VisualType }) {
  if (type === 'wallet') {
    return (
      <div className="mt-7 flex h-[92px] items-center justify-center gap-9">
        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-brand/60 bg-brand/20 shadow-[0_0_25px_rgba(71,73,255,0.28)]">
          <span className="text-[30px]">👻</span>
        </div>

        <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border border-white/10 bg-surface shadow-[0_0_25px_rgba(255,150,0,0.06)]">
          <span className="text-[29px]">☀️</span>
        </div>
      </div>
    )
  }

  if (type === 'portfolio') {
    return (
      <div className="mt-7 rounded-[15px] border border-card-border/25 bg-background/90 px-4 py-2.5">
        {tokens.map((token) => (
          <div
            key={token.name}
            className="flex h-[27px] items-center justify-between"
          >
            <span className="flex items-center gap-2.5 text-[12px] text-foreground">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-bold text-white ${token.className}`}
              >
                {token.icon}
              </span>

              {token.name}
            </span>

            <span className="text-[11px] text-muted">-- --</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'yield') {
    return (
      <div className="relative mt-7 h-[108px] overflow-hidden rounded-[15px] border border-card-border/25 bg-background/90 p-4">
        <span className="text-[11px] text-muted">APY</span>

        <strong className="mt-1 block text-[26px] leading-none text-foreground">
          -- %
        </strong>

        <svg
          className="absolute bottom-0 right-0 h-[88px] w-[165px]"
          viewBox="0 0 165 88"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="cardYieldGradient"
              x1="82"
              y1="0"
              x2="82"
              y2="88"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#a855f7" stopOpacity="0.65" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="M0 78C16 70 23 72 37 59C52 45 59 62 73 47C87 32 93 49 105 36C119 20 126 45 138 28C149 13 156 16 165 4V88H0V78Z"
            fill="url(#cardYieldGradient)"
          />

          <path
            d="M0 78C16 70 23 72 37 59C52 45 59 62 73 47C87 32 93 49 105 36C119 20 126 45 138 28C149 13 156 16 165 4"
            stroke="#a855f7"
            strokeWidth="2"
          />
        </svg>
      </div>
    )
  }

  return (
    <div className="mt-7 overflow-hidden rounded-[15px] border border-card-border/25 bg-background/90">
      <div className="flex h-[54px] items-center justify-between border-b border-white/[0.06] px-4">
        <span className="flex items-center gap-3 text-[12px] text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success text-[15px] text-[#05100b]">
            ↓
          </span>

          Deposit
        </span>

        <span className="text-[11px] text-muted">-- --</span>
      </div>

      <div className="flex h-[54px] items-center justify-between px-4">
        <span className="flex items-center gap-3 text-[12px] text-foreground">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#ed67b1] text-[15px] text-[#160710]">
            ↑
          </span>

          Withdraw
        </span>

        <span className="text-[11px] text-muted">-- --</span>
      </div>
    </div>
  )
}