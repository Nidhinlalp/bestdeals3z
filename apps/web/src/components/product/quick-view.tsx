'use client';

import Link from 'next/link';
import { ArrowRight, MessageCircle, ShoppingCart, Truck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProductBySlug } from '@/data';
import { addToCart, defaultSelection, variantLabel } from '@/lib/cart-helpers';
import { productOrderMessage, waHref } from '@/lib/whatsapp';
import { useQuickViewStore } from '@/store/quickview.store';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { PriceTag } from '@/components/ui/price-tag';
import { ProductBadgePill } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { QuantityStepper } from '@/components/ui/quantity-stepper';
import { ProductGallery } from './product-gallery';
import { VariantSelector } from './variant-selector';

export function QuickView() {
  const slug = useQuickViewStore((s) => s.slug);
  const close = useQuickViewStore((s) => s.close);
  const product = slug ? getProductBySlug(slug) : undefined;

  const [selected, setSelected] = useState<Record<string, string>>({});
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSelected(defaultSelection(product));
      setQty(1);
    }
  }, [product]);

  return (
    <Modal open={!!product} onClose={close} ariaLabel="Product quick view">
      {product && (
        <div className="grid max-h-[88vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
          <div className="bg-surface-soft p-5 sm:p-6">
            <ProductGallery images={product.images} alt={product.name} layout="compact" />
          </div>
          <div className="flex flex-col gap-4 p-5 sm:p-7">
            <div>
              {product.badges[0] && (
                <div className="mb-2">
                  <ProductBadgePill badge={product.badges[0]} />
                </div>
              )}
              <span className="text-uppercase-tag text-muted">{product.brand}</span>
              <h2 className="text-display-sm text-ink mt-1">{product.name}</h2>
              <div className="mt-2">
                <Rating value={product.rating} reviews={product.reviews} showValue />
              </div>
            </div>

            <PriceTag price={product.price} mrp={product.mrp} size="lg" />
            <p className="text-body-sm text-body">{product.shortDescription}</p>

            <VariantSelector
              product={product}
              selected={selected}
              onChange={(g, v) => setSelected((s) => ({ ...s, [g]: v }))}
              size="sm"
            />

            <div className="flex items-center gap-3">
              <span className="text-caption text-muted">Quantity</span>
              <QuantityStepper value={qty} onChange={setQty} size="sm" max={product.stockCount} />
            </div>

            <div className="mt-1 flex flex-col gap-2.5">
              <Button
                variant="primary"
                fullWidth
                onClick={() => {
                  addToCart(product, selected, qty);
                  close();
                }}
              >
                <ShoppingCart className="h-4.5 w-4.5" />
                Add to cart
              </Button>
              <Button
                variant="whatsapp"
                fullWidth
                href={waHref(productOrderMessage(product, qty, variantLabel(product, selected)))}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                Buy on WhatsApp
              </Button>
            </div>

            <div className="text-caption-sm text-muted flex items-center gap-2">
              <Truck className="h-4 w-4" />
              Free delivery in {product.deliveryDays} days · 7-day returns
            </div>

            <Link
              href={`/product/${product.slug}`}
              onClick={close}
              className="text-title-sm text-ink hover:text-primary group inline-flex items-center gap-1.5 font-semibold transition-colors"
            >
              View full details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      )}
    </Modal>
  );
}
