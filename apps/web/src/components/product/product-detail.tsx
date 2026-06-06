'use client';

import {
  Check,
  Heart,
  MessageCircle,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,
} from 'lucide-react';
import { useState } from 'react';
import type { Product } from '@/data/types';
import { useMounted } from '@/hooks/use-mounted';
import { addToCart, defaultSelection, variantLabel } from '@/lib/cart-helpers';
import { productOrderMessage, waHref } from '@/lib/whatsapp';
import { useCartStore } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { toast } from '@/store/toast.store';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { PriceTag } from '@/components/ui/price-tag';
import { ProductBadgePill } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { Tabs } from '@/components/ui/tabs';
import { ProductGallery } from './product-gallery';
import { VariantSelector } from './variant-selector';

const reviewers = [
  { name: 'Aisha R.', text: 'Exactly as described and arrived super fast. Quality feels premium.' },
  { name: 'Manoj T.', text: 'Great value for the price. Would happily buy again.' },
  { name: 'Sneha P.', text: 'Beautiful design and works flawlessly. Highly recommend.' },
];

export function ProductDetail({ product }: { product: Product }) {
  const [selected, setSelected] = useState<Record<string, string>>(() => defaultSelection(product));
  const [qty, setQty] = useState(1);
  const openCart = useCartStore((s) => s.openCart);

  const lowStock = product.inStock && product.stockCount < 15;

  return (
    <div className="container-page py-6 sm:py-8">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/' },
          { label: product.categoryName, href: `/categories/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Gallery */}
        <div className="lg:sticky lg:top-44 lg:self-start">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        {/* Info */}
        <div>
          {product.badges[0] && (
            <div className="mb-3 flex gap-2">
              {product.badges.slice(0, 2).map((b) => (
                <ProductBadgePill key={b} badge={b} />
              ))}
            </div>
          )}
          <span className="text-uppercase-tag text-muted">{product.brand}</span>
          <h1 className="text-display-xl text-ink sm:text-display-2xl mt-1">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <Rating value={product.rating} showValue />
            <span className="text-body-sm text-muted">
              {product.reviews.toLocaleString('en-IN')} reviews
            </span>
          </div>

          <div className="mt-5">
            <PriceTag price={product.price} mrp={product.mrp} size="lg" />
          </div>

          {/* Stock */}
          <div className="text-body-sm mt-3 flex items-center gap-2">
            {!product.inStock ? (
              <span className="text-error font-semibold">Out of stock</span>
            ) : lowStock ? (
              <span className="text-primary flex items-center gap-1.5 font-semibold">
                <span className="bg-primary h-2 w-2 animate-pulse rounded-full" />
                Only {product.stockCount} left — order soon
              </span>
            ) : (
              <span className="text-success flex items-center gap-1.5 font-semibold">
                <Check className="h-4 w-4" /> In stock, ready to ship
              </span>
            )}
          </div>

          <p className="text-body-md text-body mt-5">{product.shortDescription}</p>

          {/* Highlights */}
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {product.highlights.map((h) => (
              <li key={h} className="text-body-sm text-body flex items-start gap-2">
                <Check className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                {h}
              </li>
            ))}
          </ul>

          {/* Variants */}
          {product.variants.length > 0 && (
            <div className="border-hairline mt-6 border-t pt-6">
              <VariantSelector
                product={product}
                selected={selected}
                onChange={(g, v) => setSelected((s) => ({ ...s, [g]: v }))}
              />
            </div>
          )}

          {/* Quantity + actions */}
          <div className="border-hairline mt-6 flex flex-col gap-3 border-t pt-6">
            <div className="flex items-center gap-4">
              <span className="text-caption text-muted">Quantity</span>
              <QuantityStepper value={qty} onChange={setQty} max={product.stockCount || 99} />
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                disabled={!product.inStock}
                onClick={() => {
                  addToCart(product, selected, qty);
                  openCart();
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                Add to cart
              </Button>
              <WishlistInline slug={product.slug} />
            </div>
            <Button
              variant="whatsapp"
              size="lg"
              fullWidth
              href={waHref(productOrderMessage(product, qty, variantLabel(product, selected)))}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
              Buy now on WhatsApp
            </Button>
          </div>

          {/* Notes */}
          <div className="border-hairline bg-surface-soft mt-6 grid gap-3 rounded-xl border p-4 sm:grid-cols-3">
            <Note
              icon={Truck}
              title="Fast delivery"
              text={`Ships in ${product.deliveryDays} days`}
            />
            <Note icon={RotateCcw} title="Easy returns" text="7-day return window" />
            <Note icon={ShieldCheck} title="100% genuine" text="Authorised supplier" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14 max-w-4xl">
        <Tabs
          tabs={[
            {
              id: 'desc',
              label: 'Description',
              content: (
                <p className="text-body-md text-body leading-relaxed">{product.description}</p>
              ),
            },
            {
              id: 'specs',
              label: 'Specifications',
              content: (
                <dl className="divide-hairline border-hairline divide-y rounded-xl border">
                  {product.specs.map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center justify-between gap-4 px-4 py-3"
                    >
                      <dt className="text-body-sm text-muted">{s.label}</dt>
                      <dd className="text-body-sm text-ink font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
            {
              id: 'reviews',
              label: `Reviews (${product.reviews.toLocaleString('en-IN')})`,
              content: <Reviews product={product} />,
            },
          ]}
        />
      </div>
    </div>
  );
}

function WishlistInline({ slug }: { slug: string }) {
  const mounted = useMounted();
  const saved = useWishlistStore((s) => s.slugs.includes(slug)) && mounted;
  const toggle = useWishlistStore((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={() => {
        toggle(slug);
        toast({ variant: 'success', title: saved ? 'Removed from wishlist' : 'Saved to wishlist' });
      }}
      className="press border-ink text-button-md text-ink hover:bg-surface-soft flex h-14 w-full items-center justify-center gap-2 rounded-sm border transition-colors sm:w-auto sm:px-6"
    >
      <Heart className={saved ? 'fill-primary text-primary h-5 w-5' : 'h-5 w-5'} />
      {saved ? 'Saved' : 'Save'}
    </button>
  );
}

function Note({ icon: Icon, title, text }: { icon: typeof Truck; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="bg-canvas text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-title-sm text-ink">{title}</p>
        <p className="text-caption-sm text-muted">{text}</p>
      </div>
    </div>
  );
}

function Reviews({ product }: { product: Product }) {
  const dist = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 15 },
    { stars: 3, pct: 5 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];
  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <div className="border-hairline rounded-xl border p-6 text-center">
        <p className="text-rating-display text-ink leading-none">{product.rating.toFixed(1)}</p>
        <Rating value={product.rating} className="mt-2 justify-center" size={18} />
        <p className="text-body-sm text-muted mt-2">
          {product.reviews.toLocaleString('en-IN')} verified reviews
        </p>
        <div className="mt-5 space-y-1.5">
          {dist.map((d) => (
            <div key={d.stars} className="flex items-center gap-2">
              <span className="text-caption-sm text-muted w-3">{d.stars}</span>
              <div className="bg-hairline h-1.5 flex-1 overflow-hidden rounded-full">
                <div className="bg-ink h-full rounded-full" style={{ width: `${d.pct}%` }} />
              </div>
              <span className="text-caption-sm text-muted w-8 text-right">{d.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {reviewers.map((r) => (
          <div key={r.name} className="border-hairline rounded-xl border p-5">
            <div className="flex items-center justify-between">
              <p className="text-title-sm text-ink">{r.name}</p>
              <Rating value={5} size={13} />
            </div>
            <p className="text-body-sm text-body mt-2">{r.text}</p>
            <p className="text-caption-sm text-success mt-2 font-medium">✓ Verified purchase</p>
          </div>
        ))}
      </div>
    </div>
  );
}
