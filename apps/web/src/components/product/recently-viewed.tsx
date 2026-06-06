'use client';

import { useEffect } from 'react';
import { getProductsBySlugs } from '@/data';
import { useMounted } from '@/hooks/use-mounted';
import { useRecentlyViewedStore } from '@/store/recently-viewed.store';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductRail } from './product-rail';

export function RecentlyViewed({ currentSlug }: { currentSlug?: string }) {
  const mounted = useMounted();
  const slugs = useRecentlyViewedStore((s) => s.slugs);
  const push = useRecentlyViewedStore((s) => s.push);

  useEffect(() => {
    if (currentSlug) push(currentSlug);
  }, [currentSlug, push]);

  if (!mounted) return null;
  const products = getProductsBySlugs(slugs.filter((s) => s !== currentSlug)).slice(0, 6);
  if (products.length === 0) return null;

  return (
    <section className="container-page py-14 sm:py-16">
      <SectionHeader title="Recently viewed" />
      <div className="mt-8">
        <ProductRail products={products} />
      </div>
    </section>
  );
}
