import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getRelated, products } from '@/data';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductDetail } from '@/components/product/product-detail';
import { ProductRail } from '@/components/product/product-rail';
import { RecentlyViewed } from '@/components/product/recently-viewed';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found' };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: { images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(slug, 6);

  return (
    <>
      <ProductDetail product={product} />

      <section className="container-page py-14 sm:py-16">
        <SectionHeader
          title="You may also like"
          subtitle="Hand-picked products that pair well with this one."
        />
        <div className="mt-8">
          <ProductRail products={related} />
        </div>
      </section>

      <RecentlyViewed currentSlug={slug} />
    </>
  );
}
