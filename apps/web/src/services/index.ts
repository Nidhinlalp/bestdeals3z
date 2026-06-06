// =============================================================================
// API Client — Web Store
// =============================================================================
// Base HTTP client for communicating with apps/api.
// Add service functions here as features are built.
// =============================================================================

// TODO: Implement API client
// const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
//
// export async function apiFetch<T>(
//   path: string,
//   options?: RequestInit
// ): Promise<T> {
//   const res = await fetch(`${API_URL}/api/v1${path}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       ...options?.headers,
//     },
//     ...options,
//   });
//
//   if (!res.ok) {
//     throw new Error(`API error: ${res.status} ${res.statusText}`);
//   }
//
//   return res.json() as Promise<T>;
// }

// TODO: Product services
// export { getProducts, getProductBySlug } from './product.service';

// TODO: Category services
// export { getCategories, getCategoryBySlug } from './category.service';

export {};
