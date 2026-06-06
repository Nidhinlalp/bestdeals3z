import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { categories, getCategoryBySlug, getProductsByCategory } from '@/data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { ProductBrowser } from '@/components/product/product-browser';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return { title: 'Category not found' };
  return { title: category.name, description: category.description };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const items = getProductsByCategory(slug);

  return (
    <>
      {/* Category hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        </div>
        <div className="container-page relative py-12 sm:py-20">
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: 'Categories', href: '/categories' },
              { label: category.name },
            ]}
          />
          <div className="mt-5 max-w-2xl text-white">
            <span className="text-uppercase-tag text-white/80">{category.tagline}</span>
            <h1 className="text-hero mt-2 text-white">{category.name}</h1>
            <p className="text-body-md mt-3 text-white/80">{category.description}</p>
            <p className="text-caption mt-4 inline-flex rounded-full bg-white/15 px-3 py-1 font-semibold backdrop-blur">
              {category.productCount} products
            </p>
          </div>
        </div>
      </section>

      <div className="container-page py-8 sm:py-10">
        <ProductBrowser products={items} showCategoryFilter={false} />
      </div>
    </>
  );
}
