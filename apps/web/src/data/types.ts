// =============================================================================
// Mock data types — UI-only storefront (no backend)
// =============================================================================

export type ProductBadge = 'new' | 'bestseller' | 'trending' | 'flash' | 'limited';

export interface VariantOption {
  label: string;
  value: string;
  /** Optional hex swatch for colour variants. */
  swatch?: string;
}

export interface VariantGroup {
  name: string; // e.g. "Colour", "Size"
  options: VariantOption[];
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string; // category slug
  categoryName: string;
  price: number;
  mrp: number;
  rating: number; // 0–5
  reviews: number;
  images: string[];
  badges: ProductBadge[];
  inStock: boolean;
  stockCount: number;
  shortDescription: string;
  description: string;
  highlights: string[];
  specs: SpecRow[];
  variants: VariantGroup[];
  tags: string[];
  featured: boolean;
  trending: boolean;
  bestseller: boolean;
  flashSale: boolean;
  deliveryDays: number;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  icon: string; // lucide icon name
  productCount: number;
  accent: string; // hex used for soft tinting
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  quote: string;
  product: string;
}

export interface Faq {
  id: string;
  category: 'Shipping' | 'Products' | 'Orders' | 'Returns' | 'WhatsApp';
  question: string;
  answer: string;
}

export interface PromoBanner {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  href: string;
  image: string;
  theme: 'light' | 'dark' | 'brand';
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  code: string;
  discount: string;
  expiresLabel: string;
  accent: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  productSlugs: string[];
}
