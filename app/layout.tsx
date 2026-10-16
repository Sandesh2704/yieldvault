import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

import './globals.css'
import { SolanaProvider } from '@/providers/SolanaProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: 'YieldVault · Solana DeFi Dashboard',
    template: '%s · YieldVault',
  },

  description:
    'A premium Solana DeFi portfolio dashboard for tracking assets, yield positions, and transactions.',

  generator: 'Next.js',

  applicationName: 'YieldVault',

  keywords: [
    'Solana',
    'DeFi',
    'Yield',
    'Portfolio',
    'Dashboard',
    'Solana DeFi',
    'YieldVault',
  ],

  authors: [
    {
      name: 'YieldVault',
    },
  ],

  creator: 'YieldVault',
  publisher: 'YieldVault',

  metadataBase: new URL('http://localhost:3000'),

  icons: {
    icon: [
      {
        url: '/favicon.ico',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png/favicon.ico',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/favicon.ico',
        type: 'image/svg+xml',
      },
    ],

    apple: '/favicon.ico',
  },

  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',

  colorScheme: 'dark',

  themeColor: '#050914',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body className="antialiased">
        <SolanaProvider>

        {children}


        {process.env.NODE_ENV === 'production' && <Analytics />}
        </SolanaProvider>
      </body>
    </html>
  )
}