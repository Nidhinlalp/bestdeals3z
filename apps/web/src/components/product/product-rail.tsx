'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import type { Product } from '@/data/types';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';

export function ProductRail({ products, className }: { products: Product[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      {/* Desktop arrows */}
      <div className="pointer-events-none absolute -top-14 right-0 hidden gap-2 sm:flex">
        {([-1, 1] as const).map((d) => (
          <button
            key={d}
            type="button"
            aria-label={d === -1 ? 'Scroll left' : 'Scroll right'}
            onClick={() => scrollBy(d)}
            className="press border-hairline bg-canvas text-ink hover:border-ink hover:bg-surface-soft pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border transition-colors"
          >
            {d === -1 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        ))}
      </div>

      <div
        ref={ref}
        className="no-scrollbar -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:scroll-px-0 sm:px-0"
      >
        {products.map((p) => (
          <div key={p.slug} className="w-[44vw] shrink-0 snap-start sm:w-[260px] lg:w-[280px]">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
