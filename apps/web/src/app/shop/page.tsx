import type { Metadata } from 'next';
import { products, type SortKey } from '@/data';
import { PageHeader } from '@/components/sections/page-header';
import { ProductBrowser } from '@/components/product/product-browser';

export const metadata: Metadata = {
  title: 'Shop all products',
  description: 'Browse every product across electronics, gadgets, home, toys and lifestyle.',
};

const validSorts: SortKey[] = ['featured', 'price-asc', 'price-desc', 'rating', 'newest'];

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  const { sort } = await searchParams;
  const initialSort = validSorts.includes(sort as SortKey) ? (sort as SortKey) : 'featured';

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Shop' }]}
        eyebrow="The full catalogue"
        title="Shop all products"
        subtitle="Everything we offer, in one place. Filter, sort and find your next favourite."
      />
      <div className="container-page py-8 sm:py-10">
        <ProductBrowser products={products} initialSort={initialSort} />
      </div>
    </>
  );
}
