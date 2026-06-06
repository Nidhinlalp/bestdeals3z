'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingBag, Trash2, Truck } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD, shippingFor } from '@/lib/constants';
import { clamp, formatPrice } from '@/lib/utils';
import { cartOrderMessage, waHref } from '@/lib/whatsapp';
import { useCartStore, selectSubtotal } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { EmptyState } from '@/components/ui/empty-state';
import { QuantityStepper } from '@/components/ui/quantity-stepper';

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  const shipping = shippingFor(subtotal);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = clamp((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 0, 100);

  return (
    <Drawer
      open={isOpen}
      onClose={closeCart}
      side="right"
      title={`Your cart${items.length ? ` (${items.length})` : ''}`}
      footer={
        items.length > 0 ? (
          <div className="flex flex-col gap-3">
            <div className="text-body-md flex items-center justify-between">
              <span className="text-muted">Subtotal</span>
              <span className="text-display-sm text-ink font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-caption-sm text-muted">
              Shipping {shipping === 0 ? 'is free' : `(${formatPrice(shipping)})`} · taxes
              calculated at checkout
            </p>
            <Button href="/checkout" onClick={closeCart} variant="primary" fullWidth>
              Checkout
              <ArrowRight className="h-4.5 w-4.5" />
            </Button>
            <Button
              href={waHref(cartOrderMessage(items, subtotal, shipping))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              fullWidth
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Order on WhatsApp
            </Button>
            <Link
              href="/cart"
              onClick={closeCart}
              className="text-button-sm text-ink text-center font-semibold underline-offset-4 hover:underline"
            >
              View full cart
            </Link>
          </div>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <div className="p-5">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add some products and they will show up right here."
            action={
              <Button href="/shop" onClick={closeCart} variant="primary">
                Start shopping
              </Button>
            }
          />
        </div>
      ) : (
        <div className="flex flex-col">
          {/* Free shipping progress */}
          <div className="border-hairline bg-surface-soft border-b px-5 py-4">
            <div className="text-caption text-ink flex items-center gap-2">
              <Truck className="text-primary h-4 w-4" />
              {remaining > 0 ? (
                <span>
                  Add <strong>{formatPrice(remaining)}</strong> more for free shipping
                </span>
              ) : (
                <span className="text-success font-semibold">
                  You&apos;ve unlocked free shipping! 🎉
                </span>
              )}
            </div>
            <div className="bg-hairline mt-2 h-1.5 w-full overflow-hidden rounded-full">
              <div
                className="bg-gradient-brand h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ul className="divide-hairline divide-y px-5">
            {items.map((item) => (
              <li key={`${item.slug}-${item.variant ?? ''}`} className="flex gap-3 py-4">
                <Link
                  href={`/product/${item.slug}`}
                  onClick={closeCart}
                  className="bg-surface-soft relative h-20 w-20 shrink-0 overflow-hidden rounded-md"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <Link
                      href={`/product/${item.slug}`}
                      onClick={closeCart}
                      className="text-title-sm text-ink hover:text-primary line-clamp-2"
                    >
                      {item.name}
                    </Link>
                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => removeItem(item.slug, item.variant)}
                      className="press text-muted hover:text-error -mr-1 shrink-0 rounded-full p-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  {item.variant && (
                    <span className="text-caption-sm text-muted mt-0.5">{item.variant}</span>
                  )}
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.slug, q, item.variant)}
                      size="sm"
                    />
                    <span className="text-title-sm text-ink font-bold">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Drawer>
  );
}
