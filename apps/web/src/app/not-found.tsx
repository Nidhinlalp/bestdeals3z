import Link from 'next/link';
import { ArrowRight, Home, Search } from 'lucide-react';
import { categories } from '@/data';
import { Button } from '@/components/ui/button';
import { SearchRefine } from '@/components/sections/search-refine';

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/15 absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl" />
      </div>
      <div className="container-page flex min-h-[70vh] flex-col items-center justify-center py-16 text-center">
        <p className="bg-gradient-brand-deep text-[7rem] font-extrabold leading-none tracking-tighter text-transparent [-webkit-background-clip:text] [background-clip:text] sm:text-[10rem]">
          404
        </p>
        <h1 className="text-display-2xl text-ink mt-2">This page took a wrong turn</h1>
        <p className="text-body-md text-muted mt-3 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has moved. Let&apos;s get you back
          to the good stuff.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            <Home className="h-4.5 w-4.5" />
            Back to home
          </Button>
          <Button href="/shop" variant="ghost" size="md" className="border-hairline border">
            Browse the shop
            <ArrowRight className="h-4.5 w-4.5" />
          </Button>
        </div>

        <div className="mt-10 w-full max-w-md">
          <p className="text-caption text-muted mb-3 flex items-center justify-center gap-2">
            <Search className="h-4 w-4" /> Or search for something
          </p>
          <SearchRefine />
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.slice(0, 6).map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="border-hairline text-button-sm text-ink hover:border-ink hover:bg-surface-soft rounded-full border px-4 py-2 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
