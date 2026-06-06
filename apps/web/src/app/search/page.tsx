import type { Metadata } from 'next';
import Link from 'next/link';
import { SearchX, TrendingUp } from 'lucide-react';
import { getTrending, searchProducts, searchSuggestions } from '@/data';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { EmptyState } from '@/components/ui/empty-state';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductGrid } from '@/components/product/product-grid';
import { ProductRail } from '@/components/product/product-rail';
import { SearchRefine } from '@/components/sections/search-refine';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search the BestDeal3Z catalogue.',
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = '' } = await searchParams;
  const query = q.trim();
  const results = query ? searchProducts(query) : [];

  return (
    <div className="container-page py-6 sm:py-10">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Search' }]} />

      <div className="mt-5 max-w-2xl">
        <h1 className="text-display-2xl text-ink">
          {query ? (
            <>
              Results for <span className="text-gradient-brand">“{query}”</span>
            </>
          ) : (
            'Search products'
          )}
        </h1>
        {query && (
          <p className="text-body-md text-muted mt-2">
            {results.length} {results.length === 1 ? 'product' : 'products'} found
          </p>
        )}
        <div className="mt-5">
          <SearchRefine initial={query} />
        </div>
      </div>

      {/* Popular searches */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span className="text-caption text-muted flex items-center gap-1.5">
          <TrendingUp className="h-4 w-4" /> Popular:
        </span>
        {searchSuggestions.map((s) => (
          <Link
            key={s}
            href={`/search?q=${encodeURIComponent(s)}`}
            className="border-hairline text-button-sm text-ink hover:border-ink hover:bg-surface-soft rounded-full border px-3.5 py-1.5 capitalize transition-colors"
          >
            {s}
          </Link>
        ))}
      </div>

      <div className="mt-10">
        {query && results.length > 0 ? (
          <ProductGrid products={results} priorityCount={4} />
        ) : query ? (
          <EmptyState
            icon={SearchX}
            title={`No results for “${query}”`}
            description="We couldn't find a match. Try a different keyword or browse the suggestions above."
          />
        ) : (
          <EmptyState
            icon={SearchX}
            title="Start typing to search"
            description="Find products by name, brand or category."
          />
        )}
      </div>

      {/* Suggestions / trending fallback */}
      <div className="mt-16">
        <SectionHeader
          eyebrow="You might like"
          title="Trending this week"
          action={{ label: 'Shop all', href: '/shop' }}
        />
        <div className="mt-8">
          <ProductRail products={getTrending()} />
        </div>
      </div>
    </div>
  );
}
