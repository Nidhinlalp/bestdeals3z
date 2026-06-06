'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingBag, Tag, Trash2, Truck, X } from 'lucide-react';
import { useState } from 'react';
import { getBestsellers } from '@/data';
import { useMounted } from '@/hooks/use-mounted';
import { FREE_SHIPPING_THRESHOLD, PROMO_CODES, shippingFor } from '@/lib/constants';
import { clamp, formatPrice } from '@/lib/utils';
import { cartOrderMessage, waHref } from '@/lib/whatsapp';
import { useCartStore, selectSubtotal } from '@/store/cart.store';
import { toast } from '@/store/toast.store';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductRail } from '@/components/product/product-rail';

export function CartClient() {
  const mounted = useMounted();
  const { items, updateQuantity, removeItem } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  const [code, setCode] = useState('');
  const [applied, setApplied] = useState<{ code: string; off: number; label: string } | null>(null);

  const shipping = shippingFor(subtotal);
  const discount = applied ? Math.round(subtotal * applied.off) : 0;
  const total = Math.max(0, subtotal - discount) + shipping;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = clamp((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 0, 100);

  const applyCode = () => {
    const found = PROMO_CODES[code.trim().toUpperCase()];
    if (found) {
      setApplied({ code: code.trim().toUpperCase(), ...found });
      toast({ variant: 'success', title: 'Promo applied!', description: found.label });
    } else {
      toast({ variant: 'error', title: 'Invalid code', description: 'Try WELCOME10 or FLASH15' });
    }
  };

  if (!mounted) {
    return (
      <div className="container-page py-10">
        <div className="skeleton h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Let's fix that."
          action={<Button href="/shop">Start shopping</Button>}
        />
        <div className="mt-16">
          <SectionHeader
            eyebrow="Popular"
            title="Bestsellers to get you started"
            action={{ label: 'Shop all', href: '/shop' }}
          />
          <div className="mt-8">
            <ProductRail products={getBestsellers()} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Items */}
        <div>
          {/* Free shipping bar */}
          <div className="border-hairline bg-surface-soft mb-5 rounded-xl border p-4">
            <div className="text-caption text-ink flex items-center gap-2">
              <Truck className="text-primary h-4 w-4" />
              {remaining > 0 ? (
                <span>
                  Add <strong>{formatPrice(remaining)}</strong> more to unlock free shipping
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

          <ul className="divide-hairline border-hairline divide-y rounded-xl border">
            {items.map((item) => (
              <li key={`${item.slug}-${item.variant ?? ''}`} className="flex gap-4 p-4 sm:p-5">
                <Link
                  href={`/product/${item.slug}`}
                  className="bg-surface-soft relative h-24 w-24 shrink-0 overflow-hidden rounded-md sm:h-28 sm:w-28"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <span className="text-uppercase-tag text-muted">{item.brand}</span>
                      <Link
                        href={`/product/${item.slug}`}
                        className="text-title-md text-ink hover:text-primary block"
                      >
                        {item.name}
                      </Link>
                      {item.variant && (
                        <p className="text-caption-sm text-muted mt-0.5">{item.variant}</p>
                      )}
                    </div>
                    <button
                      type="button"
                      aria-label="Remove"
                      onClick={() => removeItem(item.slug, item.variant)}
                      className="press text-muted hover:bg-surface-soft hover:text-error shrink-0 rounded-full p-1.5 transition-colors"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <QuantityStepper
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.slug, q, item.variant)}
                    />
                    <div className="text-right">
                      <p className="text-title-md text-ink font-bold">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.mrp > item.price && (
                        <p className="text-caption-sm text-muted line-through">
                          {formatPrice(item.mrp * item.quantity)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center justify-between">
            <Link
              href="/shop"
              className="text-button-md text-ink hover:text-primary group inline-flex items-center gap-1.5 font-semibold"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Continue shopping
            </Link>
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <div className="border-hairline rounded-xl border p-6">
            <h2 className="text-display-sm text-ink">Order summary</h2>

            {/* Promo */}
            <div className="mt-4">
              <label className="text-caption text-muted">Promo code</label>
              {applied ? (
                <div className="border-success/40 mt-1.5 flex items-center justify-between rounded-sm border bg-[#e6f5ec] px-3 py-2.5">
                  <span className="text-body-sm text-success flex items-center gap-2 font-semibold">
                    <Tag className="h-4 w-4" /> {applied.code}
                  </span>
                  <button
                    type="button"
                    onClick={() => setApplied(null)}
                    aria-label="Remove promo"
                    className="text-success hover:opacity-70"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="mt-1.5 flex gap-2">
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="WELCOME10"
                    className="border-hairline text-body-sm text-ink focus:border-ink h-11 flex-1 rounded-sm border px-3 uppercase outline-none"
                  />
                  <Button variant="secondary" size="sm" onClick={applyCode}>
                    Apply
                  </Button>
                </div>
              )}
            </div>

            <dl className="border-hairline text-body-sm mt-5 space-y-2.5 border-t pt-5">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-ink font-medium">{formatPrice(subtotal)}</dd>
              </div>
              {discount > 0 && (
                <div className="text-success flex justify-between">
                  <dt>Discount ({applied?.code})</dt>
                  <dd className="font-medium">− {formatPrice(discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-ink font-medium">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </dd>
              </div>
            </dl>

            <div className="border-hairline mt-4 flex items-baseline justify-between border-t pt-4">
              <span className="text-title-md text-ink">Total</span>
              <span className="text-display-md text-ink font-bold">{formatPrice(total)}</span>
            </div>
            <p className="text-caption-sm text-muted mt-1">Inclusive of all taxes</p>

            <div className="mt-5 flex flex-col gap-2.5">
              <Button href="/checkout" variant="primary" fullWidth>
                Proceed to checkout
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
            </div>
            <p className="text-caption-sm text-muted mt-4 text-center">
              🔒 Secure checkout · 7-day returns · Genuine products
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
