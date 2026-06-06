// =============================================================================
// Zustand Store: Cart  (UI-only, persisted to localStorage)
// =============================================================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  brand: string;
  price: number;
  mrp: number;
  variant?: string;
  quantity: number;
}

const keyOf = (slug: string, variant?: string) => `${slug}::${variant ?? ''}`;

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (slug: string, variant?: string) => void;
  updateQuantity: (slug: string, quantity: number, variant?: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addItem: (item, quantity = 1) =>
        set((state) => {
          const k = keyOf(item.slug, item.variant);
          const existing = state.items.find((i) => keyOf(i.slug, i.variant) === k);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((i) =>
                keyOf(i.slug, i.variant) === k ? { ...i, quantity: i.quantity + quantity } : i
              ),
            };
          }
          return { isOpen: true, items: [...state.items, { ...item, quantity }] };
        }),
      removeItem: (slug, variant) =>
        set((state) => ({
          items: state.items.filter((i) => keyOf(i.slug, i.variant) !== keyOf(slug, variant)),
        })),
      updateQuantity: (slug, quantity, variant) =>
        set((state) => ({
          items: state.items
            .map((i) =>
              keyOf(i.slug, i.variant) === keyOf(slug, variant)
                ? { ...i, quantity: Math.max(1, quantity) }
                : i
            )
            .filter((i) => i.quantity > 0),
        })),
      clear: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),
    }),
    { name: 'b3z-cart' }
  )
);

// Derived selectors (call with the store hook)
export const selectCount = (s: CartState) => s.items.reduce((n, i) => n + i.quantity, 0);
export const selectSubtotal = (s: CartState) =>
  s.items.reduce((n, i) => n + i.price * i.quantity, 0);
export const selectSavings = (s: CartState) =>
  s.items.reduce((n, i) => n + Math.max(0, i.mrp - i.price) * i.quantity, 0);
