'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, ShoppingCart } from 'lucide-react';
import type { Product } from '@/data/types';
import { addToCart } from '@/lib/cart-helpers';
import { cn } from '@/lib/utils';
import { useQuickViewStore } from '@/store/quickview.store';
import { PriceTag } from '@/components/ui/price-tag';
import { ProductBadgePill } from '@/components/ui/badge';
import { Rating } from '@/components/ui/rating';
import { WishlistButton } from './wishlist-button';

export function ProductCard({
  product,
  priority = false,
  className,
}: {
  product: Product;
  priority?: boolean;
  className?: string;
}) {
  const openQuickView = useQuickViewStore((s) => s.open);
  const topBadge = product.badges[0];
  const lowStock = product.inStock && product.stockCount > 0 && product.stockCount < 15;

  return (
    <div className={cn('group flex flex-col', className)}>
      <div className="bg-surface-soft relative aspect-square w-full overflow-hidden rounded-md">
        <Link
          href={`/product/${product.slug}`}
          aria-label={product.name}
          className="block h-full w-full"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 744px) 50vw, (max-width: 1128px) 33vw, 25vw"
            className="zoom-img object-cover"
            priority={priority}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {topBadge && <ProductBadgePill badge={topBadge} />}
        </div>

        {/* Wishlist */}
        <div className="absolute right-3 top-3">
          <WishlistButton slug={product.slug} />
        </div>

        {/* Out of stock veil */}
        {!product.inStock && (
          <div className="bg-canvas/70 absolute inset-0 flex items-center justify-center backdrop-blur-[1px]">
            <span className="bg-ink rounded-full px-3 py-1 text-xs font-semibold text-white">
              Out of stock
            </span>
          </div>
        )}

        {/* Hover actions */}
        {product.inStock && (
          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 items-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="press bg-ink flex h-10 flex-1 items-center justify-center gap-1.5 rounded-full text-sm font-medium text-white transition-colors hover:bg-black"
            >
              <ShoppingCart className="h-4 w-4" />
              Add
            </button>
            <button
              type="button"
              aria-label="Quick view"
              onClick={() => openQuickView(product.slug)}
              className="press bg-canvas text-ink hover:bg-surface-soft flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-[var(--shadow-card)] transition-colors"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
          </div>
        )}
      </div>

      {/* Meta */}
      <div className="mt-3 flex flex-1 flex-col gap-1">
        <span className="text-uppercase-tag text-muted">{product.categoryName}</span>
        <Link
          href={`/product/${product.slug}`}
          className="text-title-sm text-ink hover:text-primary line-clamp-2 transition-colors"
        >
          {product.name}
        </Link>
        <Rating value={product.rating} reviews={product.reviews} className="mt-0.5" />
        <div className="mt-1 flex items-end justify-between gap-2">
          <PriceTag price={product.price} mrp={product.mrp} />
        </div>
        {lowStock && (
          <span className="text-caption-sm text-primary mt-0.5 font-medium">
            Only {product.stockCount} left
          </span>
        )}
      </div>
    </div>
  );
}
