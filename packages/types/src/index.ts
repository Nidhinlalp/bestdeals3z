// =============================================================================
// @ecom/types — Shared TypeScript Types
// =============================================================================
// This package contains all shared type definitions across the ecommerce
// platform. Types are organized by domain.
//
// Future entities to be implemented:
//   - User          (authentication, profiles, addresses)
//   - Product       (catalog, variants, pricing, inventory)
//   - Category      (hierarchical product categorization)
//   - Cart          (session-based or user-based cart)
//   - Order         (order lifecycle, WhatsApp checkout)
//   - Banner        (promotional banners and media)
//   - Media         (Cloudflare R2 image/video references)
//   - Review        (product reviews and ratings)
//   - Address       (shipping addresses)
// =============================================================================

// ---------------------------------------------------------------------------
// Utility Types
// ---------------------------------------------------------------------------

/** Makes specified keys of T required */
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

/** Makes specified keys of T optional */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

/** Pagination metadata returned by list endpoints */
export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/** Standard paginated response wrapper */
export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

/** Standard API response envelope */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// ---------------------------------------------------------------------------
// Common / Shared Types
// ---------------------------------------------------------------------------

export type SortOrder = 'asc' | 'desc';

export type Environment = 'development' | 'staging' | 'production';

export type Status = 'active' | 'inactive' | 'archived';

// ---------------------------------------------------------------------------
// TODO: Domain Types (to be implemented in future sprints)
// ---------------------------------------------------------------------------

// TODO: User types — see docs/architecture.md#user-module
// export type { User, UserRole, UserProfile } from './user';

// TODO: Product types — see docs/architecture.md#product-module
// export type { Product, ProductVariant, ProductStatus } from './product';

// TODO: Category types
// export type { Category } from './category';

// TODO: Order types — see docs/architecture.md#order-module
// export type { Order, OrderStatus, OrderItem } from './order';

// TODO: Cart types
// export type { Cart, CartItem } from './cart';

// TODO: Media types
// export type { Media, MediaType } from './media';
