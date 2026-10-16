import { featureCards } from '@/config/landing'
import { FeatureVisual } from './feature-visual'
import { cn } from '@/lib/utils'

const iconStyles = [
  'bg-[#131a34] text-brand-blue',
  'bg-[#151936] text-brand-purple',
  'bg-[#17173b] text-brand-purple',
  'bg-[#131a34] text-brand-blue',
]

export function FeatureCards() {
  return (
    <section className="relative z-20 mx-auto max-w-[1400px] px-5 pb-14 sm:px-8 lg:px-8">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {featureCards.map(({ icon: Icon, title, text, visual }, index) => (
          <article
            key={title}
            className="dashboard-card min-h-[334px] p-6"
          >
            {/* Icon */}
            <div
              className={cn(
                'mb-6 flex h-12 w-12 items-center justify-center rounded-[14px] border border-card-border/40',
                iconStyles[index % iconStyles.length],
              )}
            >
              <Icon size={26} strokeWidth={1.8} />
            </div>

            {/* Title */}
            <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-foreground">
              {title}
            </h2>

            {/* Description */}
            <p className="mt-2 max-w-[275px] text-[14px] leading-[1.55] text-muted">
              {text}
            </p>

            {/* Visual */}
            <FeatureVisual type={visual} />
          </article>
        ))}
      </div>
    </section>
  )
}