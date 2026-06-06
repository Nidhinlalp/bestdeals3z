import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/data';
import { PageHeader } from '@/components/sections/page-header';
import { Reveal } from '@/components/ui/reveal';

export const metadata: Metadata = {
  title: 'Categories',
  description: 'Explore all product categories at BestDeal3Z.',
};

export default function CategoriesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Categories' }]}
        eyebrow="Browse"
        title="Shop by category"
        subtitle="Eight curated worlds of products. Pick a lane and start exploring."
      />

      <div className="container-page grid gap-4 py-8 sm:grid-cols-2 sm:py-10 lg:grid-cols-3">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 3) * 0.05}>
            <Link
              href={`/categories/${c.slug}`}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-2xl p-6"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:744px) 100vw, 33vw"
                className="zoom-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
              <div className="relative text-white">
                <span className="text-uppercase-tag inline-flex rounded-full bg-white/20 px-2.5 py-1 backdrop-blur">
                  {c.productCount} products
                </span>
                <h2 className="text-display-md mt-3">{c.name}</h2>
                <p className="text-body-sm mt-1 line-clamp-2 text-white/75">{c.description}</p>
                <span className="text-button-sm mt-4 inline-flex items-center gap-1.5 font-semibold transition-transform group-hover:gap-2.5">
                  Explore {c.name}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </>
  );
}
