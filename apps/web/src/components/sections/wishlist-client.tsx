'use client';

import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { getProductsBySlugs, getTrending } from '@/data';
import { useMounted } from '@/hooks/use-mounted';
import { addToCart } from '@/lib/cart-helpers';
import { useWishlistStore } from '@/store/wishlist.store';
import { toast } from '@/store/toast.store';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductRail } from '@/components/product/product-rail';

export function WishlistClient() {
  const mounted = useMounted();
  const slugs = useWishlistStore((s) => s.slugs);
  const clear = useWishlistStore((s) => s.clear);
  const products = getProductsBySlugs(slugs);

  if (!mounted) {
    return (
      <div className="container-page py-8 sm:py-10">
        <ProductGridSkeleton count={8} />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={Heart}
          title="Your wishlist is empty"
          description="Tap the heart on any product to save it here for later."
          action={<Button href="/shop">Discover products</Button>}
        />
        <div className="mt-16">
          <SectionHeader
            eyebrow="Get inspired"
            title="Trending this week"
            action={{ label: 'Shop all', href: '/shop' }}
          />
          <div className="mt-8">
            <ProductRail products={getTrending()} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <Button
          variant="primary"
          onClick={() => {
            products.forEach((p) => addToCart(p));
            toast({
              variant: 'cart',
              title: 'Added everything to cart',
              description: `${products.length} items`,
            });
          }}
        >
          <ShoppingCart className="h-4.5 w-4.5" />
          Add all to cart
        </Button>
        <Button variant="ghost" className="border-hairline border" onClick={clear}>
          <Trash2 className="h-4.5 w-4.5" />
          Clear wishlist
        </Button>
      </div>
      <ProductGrid products={products} priorityCount={4} />
    </div>
  );
}
