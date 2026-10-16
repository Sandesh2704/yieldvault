# YieldVault — Solana DeFi Dashboard

**Live Demo:** https://yieldvault-967l.vercel.app/  
**GitHub:** https://github.com/Sandesh2704

YieldVault is a Solana-focused DeFi dashboard project built with Next.js, TypeScript, and Tailwind CSS. It provides a responsive interface for exploring portfolio information, yield positions, token holdings, and transaction workflows.

> **Project status:** The current deployed project is a frontend dashboard. Describe wallet/RPC integration and on-chain transactions as implemented only once those features are actually completed and verified.

## Features

- **Dashboard:** Overview of portfolio metrics, yield positions, and recent transactions.
- **Portfolio:** Token holdings, portfolio allocation visualizations, and financial summaries.
- **Transactions:** Interface for deposit, withdrawal, and transaction-history workflows.
- **Reusable UI:** Shared financial cards, status indicators, tables, and responsive layout components.
- **Charts:** Portfolio allocation and performance visualizations using Recharts.
- **Responsive design:** Layout designed for desktop and smaller screens.
- **Solana Devnet-oriented UI:** Interface prepared for development and testing workflows.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/dashboard` | DeFi dashboard overview |
| `/portfolio` | Portfolio and token holdings |
| `/transactions` | Transaction workflows and history |

## Project Structure

The exact structure may differ depending on the current implementation. A suggested organization is:

```text
src/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   │   └── page.tsx
│   ├── portfolio/
│   │   └── page.tsx
│   └── transactions/
│       └── page.tsx
├── components/
│   ├── layout/
│   ├── charts/
│   ├── portfolio/
│   ├── transaction/
│   ├── vault/
│   └── ui/
├── config/
└── lib/
    └── mock-data.ts
```

## Getting Started

### Prerequisites

- Node.js compatible with your installed Next.js version
- npm, pnpm, or another supported package manager

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/Sandesh2704/YieldVault.git
cd YieldVault
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> If your repository uses a different name or package manager, adjust the clone URL and commands to match it.

## Configuration

The project has used a central `config/env.ts` file for environment settings, including the Solana network and SOL price API URL. Keep network configuration centralized rather than hardcoding values across components.

Example settings used in development:

```ts
export const env = {
  SOLANA_NETWORK: 'devnet',
  SOL_PRICE_API:
    'https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd',
};
```

Use Devnet for testing. Do not use real funds or treat example/mock figures as live balances.

## Current Scope and Future Work

Depending on what is currently implemented in the repository, the following are possible next steps:

- Connect Phantom and Solflare wallets.
- Read SOL and SPL token balances from Solana RPC.
- Display token prices and portfolio value using a reliable price source.
- Implement and test deposit/withdraw transaction construction, signing, confirmation, and failure handling on Devnet.
- Add transaction signature links to Solana Explorer.
- Add loading, empty, disconnected-wallet, rejected-transaction, and insufficient-balance states.

Only mark these items as completed after implementation and testing.

## Screenshots

Add screenshots of the landing page, dashboard, portfolio, and transactions screens here:

```md
![YieldVault Dashboard](./docs/screenshots/dashboard.png)
```

## Author

**Sandesh Deshmukh**

- [Portfolio](https://sandeshdeshmukhportfolio.vercel.app)
- [LinkedIn](https://linkedin.com/in/sandesh-deshmukh-036b4624b)
- [GitHub](https://github.com/Sandesh2704)
