// =============================================================================
// @ecom/config — Shared Configuration
// =============================================================================
// This package provides typed, validated environment configuration using Zod.
// Each app creates its own env config by extending the shared base schema.
// =============================================================================

import { z } from 'zod';

// ---------------------------------------------------------------------------
// Base Environment Schema (common to all apps)
// ---------------------------------------------------------------------------

export const baseEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

// ---------------------------------------------------------------------------
// API Environment Schema
// ---------------------------------------------------------------------------

export const apiEnvSchema = baseEnvSchema.extend({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  JWT_EXPIRES_IN: z.string().default('7d'),
  PORT: z.coerce.number().default(3333),

  // Cloudflare R2
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_R2_BUCKET: z.string().optional(),
  CLOUDFLARE_R2_ACCESS_KEY: z.string().optional(),
  CLOUDFLARE_R2_SECRET_KEY: z.string().optional(),
  CLOUDFLARE_R2_PUBLIC_URL: z.string().url().optional(),
});

export type ApiEnv = z.infer<typeof apiEnvSchema>;

// ---------------------------------------------------------------------------
// Web / Admin Environment Schema
// ---------------------------------------------------------------------------

export const webEnvSchema = baseEnvSchema.extend({
  NEXT_PUBLIC_API_URL: z.string().url('NEXT_PUBLIC_API_URL must be a valid URL'),
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL must be a valid URL'),
});

export type WebEnv = z.infer<typeof webEnvSchema>;

// ---------------------------------------------------------------------------
// Utility: Validate and parse environment variables
// ---------------------------------------------------------------------------

/**
 * Validates process.env against the provided Zod schema.
 * Throws a descriptive error if validation fails.
 * Call this at application startup.
 *
 * @example
 * // In apps/api/src/config/app.config.ts
 * const env = validateEnv(apiEnvSchema);
 */
export function validateEnv<T extends z.ZodTypeAny>(schema: T): z.infer<T> {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    console.error('❌ Invalid environment variables:');
    console.error(parsed.error.flatten().fieldErrors);
    throw new Error('Environment variable validation failed. Check your .env file.');
  }
  return parsed.data as z.infer<T>;
}
