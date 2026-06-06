// =============================================================================
// Mock data barrel + query helpers (UI-only storefront)
// =============================================================================

import { categories, products } from './catalog';
import { collections } from './content';
import type { Product } from './types';

export * from './types';
export * from './catalog';
export * from './content';

// ---------------------------------------------------------------------------
// Lookups
// ---------------------------------------------------------------------------

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((p) => p.slug === slug);

export const getCategoryBySlug = (slug: string) => categories.find((c) => c.slug === slug);

export const getProductsByCategory = (slug: string): Product[] =>
  products.filter((p) => p.category === slug);

export const getFeatured = (): Product[] => products.filter((p) => p.featured);
export const getTrending = (): Product[] => products.filter((p) => p.trending);
export const getBestsellers = (): Product[] => products.filter((p) => p.bestseller);
export const getFlashSale = (): Product[] => products.filter((p) => p.flashSale);
export const getNewArrivals = (): Product[] => products.filter((p) => p.badges.includes('new'));

// ---------------------------------------------------------------------------
// Related / recommendations
// ---------------------------------------------------------------------------

export const getRelated = (slug: string, limit = 4): Product[] => {
  const product = getProductBySlug(slug);
  if (!product) return products.slice(0, limit);
  const sameCat = products.filter((p) => p.category === product.category && p.slug !== slug);
  const rest = products.filter((p) => p.category !== product.category && p.slug !== slug);
  return [...sameCat, ...rest].slice(0, limit);
};

export const getProductsBySlugs = (slugs: string[]): Product[] =>
  slugs.map((s) => getProductBySlug(s)).filter((p): p is Product => Boolean(p));

export const getCollectionBySlug = (slug: string) => collections.find((c) => c.slug === slug);

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

export const searchProducts = (query: string): Product[] => {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) => {
    const haystack = [p.name, p.brand, p.categoryName, p.shortDescription, ...p.tags]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
};

// Popular search suggestions (used in search overlay + no-result state)
export const searchSuggestions = [
  'earbuds',
  'smartwatch',
  'power bank',
  'backpack',
  'projector',
  'gaming mouse',
  'diffuser',
  'sunglasses',
];

// ---------------------------------------------------------------------------
// Sorting + price bounds
// ---------------------------------------------------------------------------

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'featured', label: 'Featured' },
  { key: 'price-asc', label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating', label: 'Top rated' },
  { key: 'newest', label: 'Newest' },
];

export const sortProducts = (list: Product[], key: SortKey): Product[] => {
  const arr = [...list];
  switch (key) {
    case 'price-asc':
      return arr.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return arr.sort((a, b) => b.price - a.price);
    case 'rating':
      return arr.sort((a, b) => b.rating - a.rating);
    case 'newest':
      return arr.sort(
        (a, b) => Number(b.badges.includes('new')) - Number(a.badges.includes('new'))
      );
    default:
      return arr.sort((a, b) => Number(b.featured) - Number(a.featured) || b.reviews - a.reviews);
  }
};

export const priceBounds = (): { min: number; max: number } => {
  const prices = products.map((p) => p.price);
  return { min: Math.min(...prices), max: Math.max(...prices) };
};

export const allBrands = (): string[] => Array.from(new Set(products.map((p) => p.brand))).sort();
