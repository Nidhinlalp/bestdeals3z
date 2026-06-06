'use client';

import type { Product } from '@/data/types';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/reveal';
import { ProductCard } from './product-card';

export function ProductGrid({
  products,
  columns = 4,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  columns?: 3 | 4;
  className?: string;
  priorityCount?: number;
}) {
  const cols =
    columns === 3 ? 'grid-cols-2 md:grid-cols-3' : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  return (
    <div className={cn('grid gap-x-4 gap-y-8 sm:gap-x-5', cols, className)}>
      {products.map((p, i) => (
        <Reveal key={p.slug} delay={Math.min(i, 5) * 0.05}>
          <ProductCard product={p} priority={i < priorityCount} />
        </Reveal>
      ))}
    </div>
  );
}
