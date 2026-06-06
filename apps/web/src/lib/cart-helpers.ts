import type { Product } from '@/data/types';
import { useCartStore, type CartItem } from '@/store/cart.store';
import { toast } from '@/store/toast.store';

/** Builds a "Colour: Midnight · Size: 46mm" label from selected variant values. */
export function variantLabel(
  product: Product,
  selected: Record<string, string>
): string | undefined {
  const parts = product.variants
    .map((g) => {
      const opt = g.options.find((o) => o.value === selected[g.name]);
      return opt ? `${g.name}: ${opt.label}` : null;
    })
    .filter(Boolean);
  return parts.length ? parts.join(' · ') : undefined;
}

/** Default selection = first option of each variant group. */
export function defaultSelection(product: Product): Record<string, string> {
  const sel: Record<string, string> = {};
  for (const g of product.variants) {
    if (g.options[0]) sel[g.name] = g.options[0].value;
  }
  return sel;
}

export function toCartItem(
  product: Product,
  selected: Record<string, string>,
  image?: string
): Omit<CartItem, 'quantity'> {
  return {
    slug: product.slug,
    name: product.name,
    image: image ?? product.images[0],
    brand: product.brand,
    price: product.price,
    mrp: product.mrp,
    variant: variantLabel(product, selected),
  };
}

/** Adds a product to cart with a confirmation toast. */
export function addToCart(
  product: Product,
  selected: Record<string, string> = defaultSelection(product),
  quantity = 1
) {
  useCartStore.getState().addItem(toCartItem(product, selected), quantity);
  toast({
    variant: 'cart',
    title: 'Added to cart',
    description: `${product.name}${quantity > 1 ? ` × ${quantity}` : ''}`,
  });
}
