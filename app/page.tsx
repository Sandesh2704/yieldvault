import { HomeHeader } from '@/components/landing/home-header'
import { Hero } from '@/components/landing/hero'
import { FeatureCards } from '@/components/landing/feature-cards'
import { HomeFooter } from '@/components/landing/home-footer'

export default function HomePage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden bg-background pt-[120px] text-foreground"
      style={{
        backgroundImage:
          "linear-gradient(90deg, rgba(4,8,17,0.88) 0%, rgba(4,8,17,0.76) 38%, rgba(5,7,23,0.72) 100%), url('/backround/home-page-backround.png')",
        backgroundPosition: 'center top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <HomeHeader />
      <Hero />
      <FeatureCards />
      <HomeFooter />
    </main>
  )
}

export const dynamic = 'force-static'