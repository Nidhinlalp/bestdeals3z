# Architecture Overview

## System Architecture

This platform follows a **monorepo architecture** using Turborepo and pnpm workspaces, separating concerns into three distinct applications sharing common packages.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           CLIENT LAYER                                  │
│                                                                         │
│  ┌──────────────────────────┐    ┌──────────────────────────────────┐  │
│  │   apps/web (Port 3000)   │    │   apps/admin (Port 3001)         │  │
│  │   Customer Store         │    │   Admin Dashboard                │  │
│  │                          │    │                                  │  │
│  │   • Next.js 15 App Router│    │   • Next.js 15 App Router        │  │
│  │   • TypeScript           │    │   • TypeScript                   │  │
│  │   • Tailwind CSS         │    │   • Tailwind CSS                 │  │
│  │   • Shadcn UI            │    │   • Shadcn UI                    │  │
│  │   • TanStack Query       │    │   • TanStack Query               │  │
│  │   • Zustand              │    │                                  │  │
│  └──────────────┬───────────┘    └──────────────────┬───────────────┘  │
└─────────────────┼────────────────────────────────────┼─────────────────┘
                  │ HTTP REST / JSON                    │ HTTP REST / JSON
                  ▼                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                            API LAYER                                    │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │   apps/api (Port 3333) — NestJS                                   │ │
│  │                                                                   │ │
│  │   • Modular Architecture (feature modules)                        │ │
│  │   • Prisma ORM — database access layer                            │ │
│  │   • JWT Authentication (future)                                   │ │
│  │   • Zod validation via @ecom/validation                           │ │
│  │   • Cloudflare R2 integration (future)                            │ │
│  │   • WhatsApp webhook handler (future)                             │ │
│  └───────────────────────────────┬───────────────────────────────────┘ │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │ Prisma Client
              ┌────────────────────┴──────────────────┐
              ▼                                        ▼
   ┌────────────────────┐              ┌──────────────────────────┐
   │   PostgreSQL        │              │   Cloudflare R2           │
   │   (Neon Database)  │              │   (Object Storage)        │
   │                    │              │                           │
   │   Primary data     │              │   Product images/videos   │
   │   store            │              │   Banner media            │
   └────────────────────┘              └──────────────────────────┘
```

---

## Shared Packages Architecture

```
packages/
│
├── @ecom/ui              # Shared React component library
│   ├── components/       # Reusable UI primitives
│   ├── hooks/            # Shared React hooks
│   ├── styles/           # Design tokens (CSS custom properties)
│   └── providers/        # Context providers
│
├── @ecom/types           # Shared TypeScript type definitions
│   └── src/index.ts      # Domain type exports
│
├── @ecom/validation      # Shared Zod schemas
│   └── src/index.ts      # Validation schema exports (used by API + FE)
│
├── @ecom/config          # Environment configuration
│   └── src/index.ts      # Typed env schemas + validateEnv()
│
├── @ecom/constants       # Global constants
│   └── src/index.ts      # App-wide constants
│
├── @ecom/utils           # Shared utility functions
│   └── src/index.ts      # Pure utility functions
│
└── @ecom/eslint-config   # Shared ESLint configurations
    ├── index.js           # Base config
    ├── next.js            # Next.js overrides
    └── nest.js            # NestJS overrides
```

---

## Data Flow

### Customer Purchase Flow (Planned)
```
Customer visits web store
    → Browses product catalog (Next.js SSR/SSG)
    → Adds items to cart (Zustand + TanStack Query)
    → Clicks "Order via WhatsApp"
    → WhatsApp deep link opens with pre-filled order message
    → Admin receives WhatsApp message
    → Admin confirms order manually (Phase 1)
    → Future: Automated WhatsApp order bot
```

### Admin Management Flow (Planned)
```
Admin logs in to admin panel
    → Manages products/categories (CRUD via NestJS API)
    → Uploads product images (Cloudflare R2)
    → Views/manages orders
    → Tracks inventory
```

---

## Module Architecture (apps/api)

NestJS follows a feature-module pattern. Each business domain gets its own module:

```
src/
├── app.module.ts              # Root module
├── main.ts                    # Bootstrap entry point
│
├── config/                    # App configuration (using @nestjs/config)
├── database/                  # PrismaModule + PrismaService
│
├── common/                    # Shared utilities
│   ├── dto/                   # Shared Data Transfer Objects
│   ├── enums/                 # Shared enums
│   └── interfaces/            # Shared interfaces
│
├── guards/                    # Auth guards (JWT, role-based)
├── interceptors/              # Request/response interceptors
├── filters/                   # Exception filters
├── decorators/                # Custom decorators
│
└── modules/                   # Feature modules (to be created)
    ├── auth/                  # Authentication (JWT)
    ├── users/                 # User management
    ├── products/              # Product catalog
    ├── categories/            # Category management
    ├── orders/                # Order management
    ├── cart/                  # Cart management
    ├── media/                 # Media/upload management (R2)
    └── whatsapp/              # WhatsApp integration
```

---

## Environment Strategy

| Environment | Database | API URL | Notes |
|-------------|----------|---------|-------|
| `development` | Local/Neon dev branch | `localhost:3333` | Hot reload, debug logging |
| `staging` | Neon staging branch | Staging URL | Pre-production validation |
| `production` | Neon production | Production URL | Optimized, error tracking |

---

## Caching Strategy (Future)

| Layer | Cache Type | TTL | Notes |
|-------|-----------|-----|-------|
| Product lists | TanStack Query | 5 min | Stale-while-revalidate |
| Category tree | TanStack Query | 30 min | Rarely changes |
| Product detail | Next.js `revalidate` | 10 min | ISR |
| Homepage | Next.js `revalidate` | 5 min | ISR + CDN |
