# Deployment Guide

## Environment Overview

| Environment | Branch | Purpose |
|-------------|--------|---------|
| `development` | `develop` | Local development |
| `staging` | `staging` | Pre-production testing |
| `production` | `main` | Live environment |

---

## Infrastructure

### Database — Neon PostgreSQL

1. Create a [Neon](https://neon.tech) account
2. Create a new project: `ecommerce-platform`
3. Create branches:
   - `main` → Production database
   - `staging` → Staging database
   - `dev` → Development database (optional)
4. Copy the connection string to `DATABASE_URL` in your environment

```bash
# Format
postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require
```

> **Note:** For production, use the **pooled connection string** (PgBouncer) for the app and the **direct connection string** for migrations.

### Storage — Cloudflare R2

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **R2** → **Create bucket**
3. Bucket name: `ecommerce-media` (or your preferred name)
4. Configure CORS policy for your domain
5. Create an **API Token** with R2 permissions
6. Add credentials to your environment:
   ```
   CLOUDFLARE_ACCOUNT_ID=
   CLOUDFLARE_R2_BUCKET=
   CLOUDFLARE_R2_ACCESS_KEY=
   CLOUDFLARE_R2_SECRET_KEY=
   CLOUDFLARE_R2_PUBLIC_URL=
   ```

---

## Deployment Platforms

### apps/web and apps/admin — Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Create two projects: `ecom-web` and `ecom-admin`
3. Configure root directory for each:
   - Web: `apps/web`
   - Admin: `apps/admin`
4. Set build command: `cd ../.. && pnpm build --filter web` (or `admin`)
5. Set install command: `pnpm install`
6. Add environment variables in Vercel dashboard

### apps/api — Railway / Render / Fly.io

**Railway (Recommended)**:
1. Connect your GitHub repository
2. Set root directory: `apps/api`
3. Set build command: `pnpm --filter api build`
4. Set start command: `pnpm --filter api start:prod`
5. Add all environment variables

---

## Build Commands

```bash
# Build all apps and packages
pnpm build

# Build specific app
pnpm --filter web build
pnpm --filter admin build
pnpm --filter api build
```

---

## Database Migrations

### Development
```bash
pnpm --filter api exec prisma migrate dev --name <migration-name>
```

### Production (run in CI/CD pipeline before deployment)
```bash
pnpm --filter api exec prisma migrate deploy
```

> [!CAUTION]
> Never run `prisma migrate reset` in production. It will delete all data.

---

## Environment Variables per Environment

### Development (`.env`)
```
NODE_ENV=development
DATABASE_URL=postgresql://...  # Neon dev branch
NEXT_PUBLIC_API_URL=http://localhost:3333
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Staging
```
NODE_ENV=staging
DATABASE_URL=postgresql://...  # Neon staging branch
NEXT_PUBLIC_API_URL=https://api-staging.yourdomain.com
NEXT_PUBLIC_APP_URL=https://staging.yourdomain.com
```

### Production
```
NODE_ENV=production
DATABASE_URL=postgresql://...  # Neon production (pooled)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

---

## CI/CD Pipeline

The GitHub Actions workflow (`.github/workflows/ci.yml`) automatically:
1. Runs `pnpm lint` on every PR
2. Runs `pnpm typecheck` on every PR
3. Runs `pnpm build` on PRs to `main` and `develop`

### Deployment Trigger (Future)
- Merges to `main` → Auto-deploy to production (Vercel + Railway)
- Merges to `staging` → Auto-deploy to staging

---

## Health Checks

```bash
# API health (once implemented)
curl https://api.yourdomain.com/api/v1/health

# Expected response
{ "status": "ok", "timestamp": "...", "version": "..." }
```
