# Development Guide

## Prerequisites

Before starting, ensure you have the following installed:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 20.x | [nodejs.org](https://nodejs.org) or `nvm install 20` |
| pnpm | ≥ 9.x | `npm install -g pnpm@9` |
| Git | Latest | [git-scm.com](https://git-scm.com) |

**Optional but recommended:**
- [nvm](https://github.com/nvm-sh/nvm) — Node version manager
- [VS Code](https://code.visualstudio.com) with recommended extensions
- [TablePlus](https://tableplus.com) or [Prisma Studio](https://www.prisma.io/studio) for DB inspection

---

## Initial Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd ecommerce-platform

# 2. Switch to correct Node.js version
nvm use    # Reads .nvmrc (Node 20 LTS)

# 3. Install all workspace dependencies
pnpm install

# 4. Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# 5. Generate Prisma client (requires DATABASE_URL in .env)
pnpm --filter api exec prisma generate

# 6. Run database migrations
pnpm --filter api exec prisma migrate dev

# 7. Start all apps
pnpm dev
```

---

## Running Apps

### All Apps Together (Turborepo)

```bash
pnpm dev
```

This starts all apps concurrently using Turborepo:
- Web store → `http://localhost:3000`
- Admin panel → `http://localhost:3001`
- API → `http://localhost:3333`

### Individual Apps

```bash
# Web store only
pnpm --filter web dev

# Admin panel only
pnpm --filter admin dev

# API only
pnpm --filter api dev

# A specific package in watch mode
pnpm --filter @ecom/types dev
```

---

## Adding Dependencies

```bash
# Add a dependency to a specific app
pnpm --filter web add <package-name>
pnpm --filter admin add <package-name>
pnpm --filter api add <package-name>

# Add a dev dependency to root
pnpm add -D <package-name> -w

# Add a workspace package as a dependency
pnpm --filter web add @ecom/ui@workspace:*

# Add a dependency to ALL apps
pnpm --filter "./apps/*" add <package-name>
```

---

## Running Quality Checks

```bash
# Type check all packages and apps
pnpm typecheck

# Lint all packages and apps
pnpm lint

# Auto-fix lint issues
pnpm lint:fix

# Format all files with Prettier
pnpm format

# Check formatting without writing
pnpm format:check

# Run all checks (what CI runs)
pnpm lint && pnpm typecheck
```

---

## Database Workflow

```bash
# Open Prisma Studio (visual DB editor)
pnpm --filter api exec prisma studio

# Create a new migration
pnpm --filter api exec prisma migrate dev --name <migration-name>

# Apply migrations to production
pnpm --filter api exec prisma migrate deploy

# Reset database (WARNING: destroys all data)
pnpm --filter api exec prisma migrate reset

# Regenerate Prisma client after schema changes
pnpm --filter api exec prisma generate

# Inspect current schema
pnpm --filter api exec prisma db pull
```

---

## Adding a New Package

1. Create the package directory:
   ```bash
   mkdir -p packages/my-package/src
   ```

2. Add `package.json`:
   ```json
   {
     "name": "@ecom/my-package",
     "version": "0.0.1",
     "private": true,
     "main": "./dist/index.js",
     "types": "./dist/index.d.ts",
     "scripts": {
       "build": "tsc --project tsconfig.build.json",
       "typecheck": "tsc --noEmit"
     }
   }
   ```

3. Add `tsconfig.json` extending the root base.

4. Create `src/index.ts` as the entry point.

5. Run `pnpm install` to link the package.

---

## Adding a New NestJS Module

```bash
# Use NestJS CLI (installed in apps/api)
pnpm --filter api exec nest generate module modules/my-feature
pnpm --filter api exec nest generate controller modules/my-feature
pnpm --filter api exec nest generate service modules/my-feature
```

---

## VS Code Extensions (Recommended)

Create `.vscode/extensions.json`:
```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss",
    "Prisma.prisma",
    "ms-vscode.vscode-typescript-next"
  ]
}
```

---

## Troubleshooting

### `pnpm install` fails
- Ensure Node ≥ 20: `node --version`
- Ensure pnpm ≥ 9: `pnpm --version`
- Delete lockfile and retry: `rm pnpm-lock.yaml && pnpm install`

### Turbo cache issues
```bash
pnpm turbo clean
pnpm turbo run build --force
```

### Prisma client out of sync
```bash
pnpm --filter api exec prisma generate
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```
