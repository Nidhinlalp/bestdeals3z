'use client';

import { SlidersHorizontal, Search, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
  allBrands,
  categories as allCategories,
  priceBounds,
  sortProducts,
  type SortKey,
} from '@/data';
import type { Category, Product } from '@/data/types';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { EmptyState } from '@/components/ui/empty-state';
import { ProductGrid } from './product-grid';
import { SortMenu } from './sort-menu';
import {
  activeFilterCount,
  applyFilters,
  emptyFilters,
  FilterPanel,
  type ShopFilters,
} from './filter-panel';

const PAGE = 12;

export function ProductBrowser({
  products,
  showCategoryFilter = true,
  initialSort = 'featured',
}: {
  products: Product[];
  showCategoryFilter?: boolean;
  initialSort?: SortKey;
}) {
  const bounds = useMemo(() => priceBounds(), []);
  const brands = useMemo(() => allBrands(), []);
  const categoryList: Category[] = showCategoryFilter ? allCategories : [];

  const [filters, setFiltersRaw] = useState<ShopFilters>(() => emptyFilters(bounds.max));
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(PAGE);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const setFilters = (f: ShopFilters) => {
    setFiltersRaw(f);
    setVisible(PAGE);
  };

  const filtered = useMemo(() => {
    let list = applyFilters(products, filters);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => `${p.name} ${p.brand}`.toLowerCase().includes(q));
    }
    return sortProducts(list, sort);
  }, [products, filters, query, sort]);

  const shown = filtered.slice(0, visible);
  const activeCount = activeFilterCount(filters, bounds);

  const clearAll = () => {
    setFilters(emptyFilters(bounds.max));
    setQuery('');
  };

  const panel = (
    <FilterPanel
      filters={filters}
      onChange={setFilters}
      bounds={bounds}
      brands={brands}
      categories={categoryList}
    />
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-44">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-display-sm text-ink">Filters</h2>
            {activeCount > 0 && (
              <button
                type="button"
                onClick={clearAll}
                className="text-button-sm text-primary font-semibold hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          {panel}
        </div>
      </aside>

      {/* Main */}
      <div>
        {/* Toolbar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xs flex-1">
            <Search className="text-muted pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search within results…"
              className="border-hairline bg-canvas text-body-sm text-ink focus:border-ink h-11 w-full rounded-full border pl-10 pr-4 outline-none transition-colors"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="text-muted hover:text-ink absolute right-3 top-1/2 -translate-y-1/2"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="press border-hairline bg-canvas text-button-sm text-ink hover:border-ink relative inline-flex h-11 items-center gap-2 rounded-full border px-4 transition-colors lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeCount > 0 && (
                <span className="bg-primary flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold text-white">
                  {activeCount}
                </span>
              )}
            </button>
            <SortMenu value={sort} onChange={setSort} />
          </div>
        </div>

        <p className="text-body-sm text-muted mt-4">
          Showing <span className="text-ink font-semibold">{shown.length}</span> of{' '}
          <span className="text-ink font-semibold">{filtered.length}</span> products
        </p>

        {/* Grid */}
        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No products match your filters"
              description="Try removing a filter or widening your price range."
              action={
                <Button variant="secondary" onClick={clearAll}>
                  Clear all filters
                </Button>
              }
            />
          ) : (
            <ProductGrid products={shown} priorityCount={4} />
          )}
        </div>

        {/* Load more */}
        {visible < filtered.length && (
          <div className="mt-12 flex flex-col items-center gap-3">
            <div className="bg-hairline h-1 w-40 overflow-hidden rounded-full">
              <div
                className="bg-ink h-full rounded-full"
                style={{ width: `${Math.min(100, (shown.length / filtered.length) * 100)}%` }}
              />
            </div>
            <Button variant="secondary" onClick={() => setVisible((v) => v + PAGE)}>
              Load more products
            </Button>
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        side="left"
        title="Filters"
        footer={
          <div className="flex gap-3">
            <Button variant="secondary" fullWidth onClick={clearAll}>
              Clear all
            </Button>
            <Button variant="primary" fullWidth onClick={() => setDrawerOpen(false)}>
              Show {filtered.length} results
            </Button>
          </div>
        }
      >
        <div className="px-5 pb-4">{panel}</div>
      </Drawer>
    </div>
  );
}
