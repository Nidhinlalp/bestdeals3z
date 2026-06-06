import type { Product } from '@/data/types';
import { cn } from '@/lib/utils';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductRail } from '@/components/product/product-rail';

export function ProductRailSection({
  eyebrow,
  title,
  subtitle,
  products,
  action,
  tinted = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  products: Product[];
  action?: { label: string; href: string };
  tinted?: boolean;
}) {
  if (!products.length) return null;
  return (
    <section className={cn(tinted && 'bg-surface-soft', 'py-14 sm:py-20')}>
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} action={action} />
        <div className="mt-10">
          <ProductRail products={products} />
        </div>
      </div>
    </section>
  );
}
