import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories } from '@/data';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';

export function CategoryShowcase() {
  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeader
        eyebrow="Browse"
        title="Shop by category"
        subtitle="Eight curated worlds of products — find your thing in seconds."
        action={{ label: 'All categories', href: '/categories' }}
      />
      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {categories.map((c, i) => (
          <Reveal key={c.slug} delay={(i % 4) * 0.05}>
            <Link
              href={`/categories/${c.slug}`}
              className="group relative flex h-44 flex-col justify-end overflow-hidden rounded-lg p-4 sm:h-56"
            >
              <Image
                src={c.image}
                alt={c.name}
                fill
                sizes="(max-width:744px) 50vw, 25vw"
                className="zoom-img object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative text-white">
                <p className="text-uppercase-tag opacity-80">{c.productCount} items</p>
                <p className="text-display-sm mt-0.5">{c.name}</p>
                <p className="text-caption-sm mt-0.5 line-clamp-1 text-white/70">{c.tagline}</p>
              </div>
              <span className="text-ink absolute right-3 top-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-white/90 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <ArrowUpRight className="h-4.5 w-4.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
