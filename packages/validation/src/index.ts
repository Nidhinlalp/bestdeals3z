// =============================================================================
// @ecom/validation — Shared Zod Validation Schemas
// =============================================================================
// This package contains all Zod schemas shared between the frontend and backend.
// Keeping schemas here ensures a single source of truth for validation rules.
//
// Future schemas to be implemented:
//   - userSchema         (registration, login, profile update)
//   - productSchema      (create/update product, variants)
//   - categorySchema     (create/update category)
//   - orderSchema        (create order, update status)
//   - cartSchema         (add/remove/update cart items)
//   - addressSchema      (shipping address)
//   - mediaSchema        (file upload metadata)
//   - paginationSchema   (query params for list endpoints)
// =============================================================================

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Common / Reusable Schemas
// ---------------------------------------------------------------------------

/** Standard pagination query schema */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationInput = z.infer<typeof paginationSchema>;

/** MongoDB / UUID ID schema */
export const idSchema = z.string().uuid('Invalid ID format');

/** Phone number schema (Indian format) */
export const phoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format');

/** Positive decimal amount (for prices) */
export const amountSchema = z
  .number()
  .positive('Amount must be positive')
  .multipleOf(0.01, 'Amount can have at most 2 decimal places');

/** URL schema */
export const urlSchema = z.string().url('Invalid URL format');

// ---------------------------------------------------------------------------
// TODO: Domain schemas (to be implemented)
// ---------------------------------------------------------------------------

// TODO: Auth schemas
// export { loginSchema, registerSchema, refreshTokenSchema } from './auth';

// TODO: Product schemas
// export { createProductSchema, updateProductSchema } from './product';

// TODO: Category schemas
// export { createCategorySchema } from './category';

// TODO: Order schemas
// export { createOrderSchema, updateOrderStatusSchema } from './order';

// TODO: Cart schemas
// export { addToCartSchema, updateCartItemSchema } from './cart';

// Re-export zod for convenience
export { z };
