// =============================================================================
// apps/web — Shared Utility Functions
// =============================================================================

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * cn() — merge Tailwind classes without conflicts.
 * Combines clsx (conditional classes) with tailwind-merge (dedupe/override).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Indian Rupee currency (mock storefront is INR / WhatsApp). */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

/** Percentage discount between an original (MRP) and a sale price. */
export function discountPercent(mrp: number, price: number): number {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

/** Build a mock WhatsApp deep link with a prefilled order/message body. */
export function whatsappLink(phone: string, message: string): string {
  const digits = phone.replace(/[^\d]/g, '');
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Deterministic picsum image URL by seed (mock product photography). */
export function img(seed: string | number, w = 800, h = 800): string {
  return `https://picsum.photos/seed/${encodeURIComponent(String(seed))}/${w}/${h}`;
}

/** Clamp helper. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

/** Format an integer with thousands separators (counters, review counts). */
export function formatCompact(value: number): string {
  return new Intl.NumberFormat('en-IN', { notation: 'compact', maximumFractionDigits: 1 }).format(
    value
  );
}
