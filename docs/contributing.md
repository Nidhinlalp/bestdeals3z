# Contributing Guide

Welcome! This guide covers everything you need to know to contribute to this project.

---

## Code of Conduct

- Be respectful and constructive in code reviews
- Focus feedback on code, not the person
- Ask questions if you're unsure, don't assume

---

## Branch Naming Convention

Use the following prefixes:

| Type | Format | Example |
|------|--------|---------|
| Feature | `feat/<description>` | `feat/product-catalog` |
| Bug fix | `fix/<description>` | `fix/cart-quantity-update` |
| Refactor | `refactor/<description>` | `refactor/api-error-handling` |
| Documentation | `docs/<description>` | `docs/setup-guide` |
| Chore | `chore/<description>` | `chore/update-dependencies` |
| Hotfix | `hotfix/<description>` | `hotfix/order-total-calculation` |

**Rules:**
- Use lowercase kebab-case
- Keep names short but descriptive
- Branch off from `develop` (not `main`)

---

## Commit Message Format

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | A new feature |
| `fix` | A bug fix |
| `docs` | Documentation only changes |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `refactor` | Code restructuring without feature or bug change |
| `test` | Adding or updating tests |
| `chore` | Updating build tasks, package manager configs, etc. |
| `perf` | Performance improvements |
| `ci` | CI/CD configuration changes |

### Scope (optional)

Specify the affected area:
- `web`, `admin`, `api`
- `ui`, `types`, `utils`, `validation`, `config`, `constants`
- `prisma`, `auth`, `products`, `orders`, `cart`, `media`

### Examples

```bash
feat(products): add product listing page with infinite scroll
fix(cart): correct quantity update logic for variant products
docs(api): document authentication endpoints
chore(deps): update @tanstack/react-query to v5.2.0
refactor(api): extract order calculation to service layer
```

---

## Pull Request Process

1. **Create a branch** from `develop` using the naming convention above
2. **Make your changes** — keep PRs focused on a single concern
3. **Run quality checks** before pushing:
   ```bash
   pnpm lint && pnpm typecheck && pnpm format:check
   ```
4. **Push your branch** and open a PR against `develop`
5. **Fill in the PR template** completely
6. **Request a review** from at least one team member
7. **Address review feedback** — respond to all comments
8. **Merge** only after approval and green CI

---

## Code Style

### TypeScript

- **Strict mode is enabled** — no `any` without a comment explaining why
- Prefer `type` over `interface` for object shapes (unless extending)
- Use `type` imports: `import type { Foo } from './foo'`
- Prefix unused variables with `_`: `const _unused = ...`

### React / Next.js

- Prefer **Server Components** by default in Next.js App Router
- Use `'use client'` only when necessary (interactivity, browser APIs)
- Name component files in PascalCase: `ProductCard.tsx`
- Co-locate component styles and tests next to the component

### NestJS

- Use `@Injectable()` services for all business logic
- Controllers should only handle HTTP concerns (validation, response shaping)
- Use DTOs with `class-validator` for request validation
- Use Prisma service through dependency injection, never import directly

### Shared Packages

- All shared logic goes in `packages/` — not duplicated in apps
- Validation schemas go in `@ecom/validation`
- Types go in `@ecom/types`
- Constants go in `@ecom/constants`

---

## Testing (Future)

Once test infrastructure is set up:

```bash
# Run all tests
pnpm test

# Run tests for a specific app
pnpm --filter api test
pnpm --filter web test

# Run tests in watch mode
pnpm --filter api test:watch

# Run E2E tests
pnpm --filter api test:e2e
```

---

## Getting Help

- Check `docs/` for architecture and development guides
- Open an issue describing the problem
- Ask in the team chat before making large architectural changes
