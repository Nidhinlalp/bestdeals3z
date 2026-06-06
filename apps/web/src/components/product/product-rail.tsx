'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import type { Product } from '@/data/types';
import { cn } from '@/lib/utils';
import { ProductCard } from './product-card';

export function ProductRail({ products, className }: { products: Product[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  const checkScroll = () => {
    const el = ref.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener('scroll', checkScroll);
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [products]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 600), behavior: 'smooth' });
  };

  return (
    <div className={cn('relative', className)}>
      {/* Desktop overlay arrows — Airbnb-style, positioned in the margins */}
      {showLeft && (
        <button
          type="button"
          aria-label="Scroll left"
          onClick={() => scrollBy(-1)}
          className="press border-hairline bg-canvas hover:bg-surface-soft text-ink absolute -left-5 top-[35%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-[var(--shadow-float)] transition-all hover:scale-105 sm:flex"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {showRight && (
        <button
          type="button"
          aria-label="Scroll right"
          onClick={() => scrollBy(1)}
          className="press border-hairline bg-canvas hover:bg-surface-soft text-ink absolute -right-5 top-[35%] z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border shadow-[var(--shadow-float)] transition-all hover:scale-105 sm:flex"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/*
       * Overflow wrapper — critical for mobile.
       * The inner scroll div uses -mx-4/px-4 to bleed cards edge-to-edge.
       * This outer clip prevents that bleed from leaking into the page.
       */}
      <div className="overflow-hidden">
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
    </div>
  );
}
