import Image from 'next/image'
import { Check } from 'lucide-react'
import WalletButton from '../wallet/wallet-connect'

export function Hero() {
  return (
    <section className="relative mx-auto max-w-[1400px] px-5 sm:px-8 lg:px-8">
      <div className="grid min-h-[480px] grid-cols-1 items-center lg:grid-cols-[6fr_1.1fr]">
        {/* Left Content */}
        <div className="relative z-20 pt-14 lg:pt-4">
          {/* Solana Badge */}
          <div className="mb-6 inline-flex h-[42px] items-center gap-3 rounded-full 
   border border-card-border/40 bg-card/80 px-4 text-[14px] text-foreground backdrop-blur-xl">
            <span className="relative flex h-6 w-6 items-center justify-center overflow-hidden rounded-full bg-black/40">
              <span className="absolute h-[4px] w-[14px] -translate-y-[4px] -skew-x-[25deg] rounded bg-brand-cyan" />
              <span className="absolute h-[4px] w-[14px] rounded bg-brand-purple" />
              <span className="absolute h-[4px] w-[14px] translate-y-[4px] -skew-x-[25deg] rounded bg-brand-blue" />
            </span>

            Built on Solana
          </div>

          {/* Hero Heading */}
          <h1 className="max-w-[650px] text-[52px] font-bold leading-[1.02] tracking-[-0.045em] sm:text-[62px] lg:text-[68px] xl:text-[78px]">
            <span className="text-foreground">Your Solana</span>
            <br />
            <span className="gradient-text">Yield Dashboard</span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[555px] text-[15px] leading-[1.65] text-muted-foreground sm:text-[17px]">
            Connect your wallet to track your portfolio, explore yield
            opportunities, and manage your positions — all in one place.
          </p>

          {/* Connect Wallet Button */}
          <div className="mt-7">
            <WalletButton/>
          </div>

          {/* Wallet Information */}
          <div className="mt-5 flex items-center gap-2 text-[14px] text-muted-foreground">
            <span className="flex h-[18px] w-[18px] items-center justify-center rounded-full border border-card-border/70">
              <Check size={11} />
            </span>

            Connect your Phantom or Solflare wallet to get started
          </div>
        </div>

        {/* Right Artwork */}
        <div className="relative z-10 flex h-[420px] items-center justify-center sm:h-[400px] lg:-ml-8 lg:h-[500px]">
          {/* Ambient Glow */}
          <div className="absolute left-[18%] top-[18%] h-[330px] w-[330px] rounded-full bg-brand/20 blur-[100px]" />

          {/* Hero Image */}
          <Image
            src="/hero/hero-imge.webp"
            alt="YieldVault Solana dashboard"
            width={900}
            height={700}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 55vw, 820px"
            className="relative z-10 w-full max-w-[760px] object-contain drop-shadow-[0_35px_80px_rgba(50,78,255,0.24)] lg:w-[650px] xl:w-[800px]"
          />
        </div>
      </div>
    </section>
  )
}