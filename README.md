# Ecommerce Platform

> A WhatsApp-first ecommerce platform built with a modern, production-grade monorepo architecture.

[![Turborepo](https://img.shields.io/badge/built%20with-Turborepo-EF4444.svg)](https://turbo.build)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?logo=next.js)](https://nextjs.org)
[![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)](https://nestjs.com)
[![pnpm](https://img.shields.io/badge/pnpm-9.x-F69220?logo=pnpm)](https://pnpm.io)

---

## Overview

This platform enables WhatsApp-first ecommerce — customers browse products, add to cart, and checkout via WhatsApp, while admins manage the catalog and orders through a dedicated panel.

**Product Categories:** Gadgets · Toys · Home Products · Daily-Use · Electronics · Lifestyle

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend Store** | Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query, Zustand |
| **Admin Panel** | Next.js 15, TypeScript, Tailwind CSS, Shadcn UI, TanStack Query |
| **Backend API** | NestJS, TypeScript, Prisma ORM |
| **Database** | PostgreSQL (Neon) |
| **Storage** | Cloudflare R2 |
| **Monorepo** | Turborepo, pnpm workspaces |
| **Validation** | Zod |
| **Code Quality** | ESLint, Prettier, Husky, lint-staged |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                            │
│  ┌──────────────────────┐    ┌──────────────────────────────┐  │
│  │   apps/web           │    │   apps/admin                 │  │
│  │   (Store Frontend)   │    │   (Admin Panel)              │  │
│  │   Next.js 15         │    │   Next.js 15                 │  │
│  └──────────┬───────────┘    └──────────────┬───────────────┘  │
└─────────────┼────────────────────────────────┼─────────────────┘
              │ HTTP/REST                       │ HTTP/REST
              ▼                                 ▼
┌─────────────────────────────────────────────────────────────────┐
│                         API Layer                               │
│  ┌────────────────────────────────────────────────────────┐    │
│  │   apps/api  (NestJS Backend)                           │    │
│  │   Modular architecture · Prisma ORM · JWT Auth         │    │
│  └───────────────────────┬────────────────────────────────┘    │
└──────────────────────────┼──────────────────────────────────────┘
                           │
              ┌────────────┴─────────────┐
              ▼                          ▼
   ┌──────────────────┐      ┌──────────────────────┐
   │  PostgreSQL       │      │  Cloudflare R2       │
   │  (Neon Database) │      │  (Object Storage)    │
   └──────────────────┘      └──────────────────────┘
```

---

## Monorepo Structure

```
ecommerce-platform/
│
├── apps/
│   ├── web/                # Customer-facing storefront (Next.js 15)
│   ├── admin/              # Admin dashboard (Next.js 15)
│   └── api/                # Backend REST API (NestJS)
│
├── packages/
│   ├── ui/                 # Shared UI component library
│   ├── types/              # Shared TypeScript types
│   ├── utils/              # Shared utility functions
│   ├── validation/         # Zod validation schemas
│   ├── config/             # Shared configuration
│   ├── constants/          # Global constants
│   └── eslint-config/      # Shared ESLint configuration
│
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
│
├── docs/                   # Project documentation
├── scripts/                # Automation scripts
├── .github/                # GitHub Actions CI/CD
│
├── turbo.json              # Turborepo pipeline config
├── pnpm-workspace.yaml     # pnpm workspaces declaration
├── package.json            # Root package.json
├── tsconfig.base.json      # Base TypeScript config
└── .env.example            # Environment variable template
```

---

## Prerequisites

- [Node.js](https://nodejs.org) ≥ 20.x (use `.nvmrc` with `nvm use`)
- [pnpm](https://pnpm.io) ≥ 9.x (`npm install -g pnpm`)
- [PostgreSQL](https://neon.tech) — Neon database account
- [Cloudflare](https://cloudflare.com) — R2 bucket configured

---

## Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd ecommerce-platform

# 2. Use correct Node.js version
nvm use

# 3. Install all dependencies
pnpm install

# 4. Configure environment variables
cp .env.example .env
# Fill in your values in .env

# 5. Initialize Prisma (once DATABASE_URL is set)
pnpm --filter api prisma generate
pnpm --filter api prisma migrate dev

# 6. Start all apps in development mode
pnpm dev
```

---

## Development Workflow

### Running Individual Apps

```bash
# Start only the web store
pnpm --filter web dev

# Start only the admin panel
pnpm --filter admin dev

# Start only the API
pnpm --filter api dev
```

### Running Tasks

```bash
# Lint all packages and apps
pnpm lint

# Type-check all packages and apps
pnpm typecheck

# Build all packages and apps
pnpm build

# Format all files with Prettier
pnpm format
```

### Adding a Dependency

```bash
# Add to a specific app
pnpm --filter web add <package>

# Add a shared package dependency
pnpm --filter api add @ecom/types
```

---

## Port Reference

| App | Port |
|-----|------|
| Web Store | `3000` |
| Admin Panel | `3001` |
| API | `3333` |

---

## Environment Environments

| Env | Description |
|-----|-------------|
| `development` | Local development with hot-reload |
| `staging` | Pre-production validation |
| `production` | Live customer-facing environment |

---

## Contributing

See [docs/contributing.md](docs/contributing.md) for branch naming conventions, commit message format, and PR guidelines.

---

## License

Private — All rights reserved.
