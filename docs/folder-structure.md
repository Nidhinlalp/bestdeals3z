# Folder Structure

Complete annotated directory tree for the ecommerce platform monorepo.

```
ecommerce-platform/
│
├── apps/                                # Application workspaces
│   │
│   ├── web/                             # Customer-facing storefront
│   │   ├── src/
│   │   │   ├── app/                     # Next.js App Router pages and layouts
│   │   │   │   ├── layout.tsx           # Root layout (fonts, providers)
│   │   │   │   ├── page.tsx             # Homepage
│   │   │   │   ├── globals.css          # Global styles
│   │   │   │   │
│   │   │   │   ├── (shop)/              # Route group: shop pages
│   │   │   │   │   ├── products/        # Product listing and detail pages
│   │   │   │   │   ├── categories/      # Category browse pages
│   │   │   │   │   └── cart/            # Cart page
│   │   │   │   │
│   │   │   │   └── api/                 # Next.js API routes (if needed)
│   │   │   │
│   │   │   ├── components/              # Web-specific UI components
│   │   │   │   ├── layout/              # Header, Footer, Navigation
│   │   │   │   ├── product/             # ProductCard, ProductGrid, etc.
│   │   │   │   └── cart/                # CartSidebar, CartItem, etc.
│   │   │   │
│   │   │   ├── hooks/                   # Web-specific custom hooks
│   │   │   ├── services/                # API client functions (fetch wrappers)
│   │   │   ├── store/                   # Zustand state stores
│   │   │   │   ├── cart.store.ts        # Cart state
│   │   │   │   └── ui.store.ts          # UI state (sidebar open, etc.)
│   │   │   │
│   │   │   ├── lib/                     # Utility helpers specific to web
│   │   │   ├── providers/               # React context providers
│   │   │   │   └── query-provider.tsx   # TanStack Query client setup
│   │   │   │
│   │   │   └── types/                   # Web-specific TypeScript types
│   │   │
│   │   ├── public/                      # Static assets
│   │   ├── next.config.ts               # Next.js configuration
│   │   ├── tailwind.config.ts           # Tailwind CSS configuration
│   │   ├── tsconfig.json                # TypeScript config (extends root)
│   │   ├── .eslintrc.js                 # ESLint config (uses @ecom/eslint-config)
│   │   └── package.json
│   │
│   ├── admin/                           # Admin dashboard panel
│   │   ├── src/
│   │   │   ├── app/                     # Next.js App Router
│   │   │   │   ├── layout.tsx           # Admin root layout
│   │   │   │   ├── page.tsx             # Dashboard home
│   │   │   │   │
│   │   │   │   ├── (auth)/              # Route group: auth pages
│   │   │   │   │   └── login/           # Login page
│   │   │   │   │
│   │   │   │   └── (dashboard)/         # Route group: protected pages
│   │   │   │       ├── products/        # Product management
│   │   │   │       ├── categories/      # Category management
│   │   │   │       └── orders/          # Order management
│   │   │   │
│   │   │   ├── components/              # Admin-specific UI components
│   │   │   ├── hooks/                   # Admin-specific hooks
│   │   │   ├── services/                # API client functions
│   │   │   ├── lib/                     # Admin-specific utilities
│   │   │   ├── providers/               # React providers
│   │   │   └── types/                   # Admin-specific types
│   │   │
│   │   ├── next.config.ts
│   │   ├── tailwind.config.ts
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── api/                             # NestJS backend API
│       ├── src/
│       │   ├── main.ts                  # Bootstrap entry point
│       │   ├── app.module.ts            # Root module
│       │   │
│       │   ├── config/                  # Configuration module
│       │   │   └── app.config.ts        # Validated env config
│       │   │
│       │   ├── database/                # Database module
│       │   │   ├── prisma.service.ts    # PrismaService (injectable)
│       │   │   └── database.module.ts   # PrismaModule
│       │   │
│       │   ├── common/                  # Shared internal utilities
│       │   │   ├── dto/                 # Shared DTOs (pagination, etc.)
│       │   │   ├── enums/               # Shared enums
│       │   │   └── interfaces/          # Shared interfaces
│       │   │
│       │   ├── guards/                  # NestJS guards
│       │   │   └── jwt-auth.guard.ts    # JWT authentication guard
│       │   │
│       │   ├── interceptors/            # Request/response interceptors
│       │   │   └── transform.interceptor.ts
│       │   │
│       │   ├── filters/                 # Exception filters
│       │   │   └── http-exception.filter.ts
│       │   │
│       │   ├── decorators/              # Custom decorators
│       │   │   └── current-user.decorator.ts
│       │   │
│       │   ├── shared/                  # Shared services (logging, etc.)
│       │   │
│       │   ├── types/                   # API-specific TypeScript types
│       │   │
│       │   └── modules/                 # Feature modules
│       │       ├── auth/                # Authentication module
│       │       ├── users/               # User management module
│       │       ├── products/            # Product catalog module
│       │       ├── categories/          # Category module
│       │       ├── orders/              # Order management module
│       │       ├── cart/                # Cart module
│       │       ├── media/               # File upload module (R2)
│       │       └── whatsapp/            # WhatsApp integration module
│       │
│       ├── test/                        # E2E tests
│       ├── tsconfig.json
│       ├── nest-cli.json
│       └── package.json
│
├── packages/                            # Shared packages
│   ├── ui/                              # @ecom/ui — Component library
│   │   ├── src/
│   │   │   └── index.ts                 # Barrel exports
│   │   ├── components/                  # UI components (future)
│   │   ├── hooks/                       # Shared hooks (future)
│   │   ├── styles/
│   │   │   └── globals.css              # Design system CSS tokens
│   │   ├── providers/                   # Context providers (future)
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── types/                           # @ecom/types — TypeScript types
│   │   ├── src/
│   │   │   └── index.ts                 # Type definitions
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── utils/                           # @ecom/utils — Utilities
│   │   ├── src/
│   │   │   └── index.ts                 # Utility functions
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── validation/                      # @ecom/validation — Zod schemas
│   │   ├── src/
│   │   │   └── index.ts                 # Validation schemas
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── config/                          # @ecom/config — Env config
│   │   ├── src/
│   │   │   └── index.ts                 # Env schemas + validateEnv()
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   ├── constants/                       # @ecom/constants — Constants
│   │   ├── src/
│   │   │   └── index.ts                 # Global constants
│   │   ├── tsconfig.json
│   │   └── package.json
│   │
│   └── eslint-config/                   # @ecom/eslint-config — ESLint
│       ├── index.js                     # Base config
│       ├── next.js                      # Next.js overrides
│       ├── nest.js                      # NestJS overrides
│       └── package.json
│
├── prisma/                              # Prisma database schema
│   ├── schema.prisma                    # Database schema definition
│   └── migrations/                     # Migration history
│
├── docs/                               # Project documentation
│   ├── architecture.md                 # System architecture overview
│   ├── development-guide.md            # Local development setup
│   ├── deployment-guide.md             # Deployment instructions
│   ├── folder-structure.md             # This file
│   └── contributing.md                 # Contribution guidelines
│
├── scripts/                            # Automation scripts
│   └── setup.sh                        # Bootstrap script
│
├── .github/                            # GitHub configuration
│   ├── workflows/
│   │   └── ci.yml                      # CI/CD pipeline
│   └── PULL_REQUEST_TEMPLATE.md        # PR template
│
├── .husky/                             # Git hooks
│   └── pre-commit                      # Runs lint-staged on commit
│
├── turbo.json                           # Turborepo pipeline config
├── pnpm-workspace.yaml                  # pnpm workspace declaration
├── package.json                         # Root package.json
├── tsconfig.base.json                   # Base TypeScript config
├── .prettierrc                          # Prettier config
├── .prettierignore                      # Prettier ignore patterns
├── .gitignore                           # Git ignore patterns
├── .npmrc                               # npm/pnpm config
├── .nvmrc                               # Node.js version pin
├── .env.example                         # Environment variable template
└── README.md                            # Project README
```
