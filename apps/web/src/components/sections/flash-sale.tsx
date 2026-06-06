import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import { getFlashSale } from '@/data';
import { ProductRail } from '@/components/product/product-rail';
import { Countdown } from './countdown';

export function FlashSale() {
  const products = getFlashSale();
  if (!products.length) return null;

  return (
    <section className="py-14 sm:py-20">
      <div className="container-page">
        <div className="border-hairline bg-surface-soft overflow-hidden rounded-2xl border p-6 sm:p-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="bg-primary text-caption inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-white">
                <Zap className="h-4 w-4 fill-white" /> Flash sale
              </span>
              <h2 className="text-display-2xl text-ink mt-3">Going fast — grab them now</h2>
              <p className="text-body-md text-muted mt-1">Limited stock at limited-time prices.</p>
            </div>
            <div className="flex flex-col gap-3 sm:items-end">
              <Countdown hours={11} variant="light" />
              <Link
                href="/deals"
                className="text-button-md text-ink hover:text-primary group inline-flex items-center gap-1.5 font-semibold"
              >
                View all deals
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-8">
            <ProductRail products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
