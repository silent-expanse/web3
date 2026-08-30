# Silent Expanse: Strife — Client (Web3 Frontend)

Fully on-chain 3D MMO SLG frontend, live on **BNB Chain** (BNB Smart Chain, BSC, chainId 56).

> *"宇宙就是一座黑暗森林，每个文明都是带枪的猎人。"* — 刘慈欣

## Overview

Silent Expanse: Strife is a fully on-chain 3D space strategy game deployed on **BNB Smart Chain**. Every game state — civilizations, battles, energy, alliances — is settled by smart contracts. There is no server authority, no hotfixes, 100% on-chain.

This repository contains the **web3 client**: a React 18 SPA that connects wallets (RainbowKit + wagmi + viem) and renders the 3D galaxy (Three.js) directly against the contracts.

- Play: https://strifelabs.com
- Docs: https://docs.strifelabs.com
- GitHub org: https://github.com/silent-expanse
- **BNB Chain** explorer: https://bscscan.com/address/0x58c2400527813f78fc7ed498dd4ec66dc7787e73

## Stack

| Layer | Tech |
|---|---|
| Framework | React 18 + TypeScript + Vite |
| Web3 | wagmi 2.x · viem 2.x · RainbowKit 2 · ethers 6 |
| State | zustand + TanStack Query |
| 3D | Three.js |

## Quick Start

```bash
bun install          # workspaces: packages/client
bun run dev          # Vite dev server on :3000
bun run build        # tsc && vite build && prerender
```

Chain contracts & addresses are resolved from `@strifelabs-strife/shared` (single source of truth, BSC chain 56).

## Contract Addresses (BSC)

| Contract | Address |
|---|---|
| Game (proxy) | `0x58c2400527813f78fc7ed498dd4ec66dc7787e73` |
| SES Token | `0x1491e226292cf61aba5717828540c0f2518301c6` |
| DailyMinter | `0x52ca63564e15ed70d012a70ea14d9d2e3701be1d` |

## License

MIT
