// =============================================================================
// @ecom/utils — Shared Utility Functions
// =============================================================================
// This package contains shared utility functions used across all apps.
// Add utilities here that are needed in more than one app/package.
// =============================================================================

// ---------------------------------------------------------------------------
// String Utilities
// ---------------------------------------------------------------------------

/**
 * Converts a string to a URL-friendly slug.
 * @example slugify("Hello World") => "hello-world"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Capitalizes the first letter of a string.
 */
export function capitalize(input: string): string {
  if (!input) return input;
  return input.charAt(0).toUpperCase() + input.slice(1);
}

/**
 * Truncates a string to a given length, appending "..." if truncated.
 */
export function truncate(input: string, maxLength: number): string {
  if (input.length <= maxLength) return input;
  return `${input.slice(0, maxLength - 3)}...`;
}

// ---------------------------------------------------------------------------
// Number Utilities
// ---------------------------------------------------------------------------

/**
 * Formats a number as a currency string.
 * @example formatCurrency(1999, 'INR') => "₹1,999.00"
 */
export function formatCurrency(
  amount: number,
  currency: string = 'INR',
  locale: string = 'en-IN'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Clamps a number between min and max values.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// ---------------------------------------------------------------------------
// Array Utilities
// ---------------------------------------------------------------------------

/**
 * Chunks an array into arrays of a given size.
 * @example chunk([1,2,3,4,5], 2) => [[1,2], [3,4], [5]]
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Removes duplicate values from an array.
 */
export function unique<T>(array: T[]): T[] {
  return [...new Set(array)];
}

// ---------------------------------------------------------------------------
// Object Utilities
// ---------------------------------------------------------------------------

/**
 * Removes keys with null or undefined values from an object.
 */
export function omitNullish<T extends Record<string, unknown>>(
  obj: T
): Partial<T> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null)
  ) as Partial<T>;
}

// ---------------------------------------------------------------------------
// Date Utilities
// ---------------------------------------------------------------------------

/**
 * Formats a Date object as a readable date string.
 * @example formatDate(new Date()) => "6 June 2026"
 */
export function formatDate(date: Date, locale: string = 'en-IN'): string {
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

// ---------------------------------------------------------------------------
// TODO: Add more utilities as needed
// ---------------------------------------------------------------------------
// - Image URL helpers (Cloudflare R2 public URL builder)
// - WhatsApp deep link generator
// - Order ID generator
// - Pagination helpers
