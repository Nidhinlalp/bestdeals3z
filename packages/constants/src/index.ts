// =============================================================================
// @ecom/constants — Global Constants
// =============================================================================

// ---------------------------------------------------------------------------
// App Metadata
// ---------------------------------------------------------------------------

export const APP_NAME = 'BestDeal3Z';
export const APP_VERSION = '0.0.1';
export const APP_DESCRIPTION = 'WhatsApp-first ecommerce platform';

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

// ---------------------------------------------------------------------------
// Pagination
// ---------------------------------------------------------------------------

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const DEFAULT_PAGE = 1;

// ---------------------------------------------------------------------------
// Product Categories
// ---------------------------------------------------------------------------

export const PRODUCT_CATEGORIES = [
  'gadgets',
  'toys',
  'home',
  'daily-use',
  'electronics',
  'lifestyle',
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];

// ---------------------------------------------------------------------------
// Media / Storage
// ---------------------------------------------------------------------------

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif'] as const;
export const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'] as const;
export const MAX_IMAGE_SIZE_MB = 10;
export const MAX_VIDEO_SIZE_MB = 100;

// ---------------------------------------------------------------------------
// WhatsApp
// ---------------------------------------------------------------------------

/** WhatsApp message template names (future use) */
export const WHATSAPP_TEMPLATES = {
  ORDER_CONFIRMATION: 'order_confirmation',
  ORDER_SHIPPED: 'order_shipped',
  ORDER_DELIVERED: 'order_delivered',
  CART_REMINDER: 'cart_reminder',
} as const;

// ---------------------------------------------------------------------------
// Timeouts / Durations (in milliseconds)
// ---------------------------------------------------------------------------

export const CACHE_TTL_PRODUCTS = 5 * 60 * 1000; // 5 minutes
export const CACHE_TTL_CATEGORIES = 30 * 60 * 1000; // 30 minutes
export const SESSION_TTL = 7 * 24 * 60 * 60 * 1000; // 7 days

// ---------------------------------------------------------------------------
// HTTP Status Codes (convenience re-export)
// ---------------------------------------------------------------------------

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;
