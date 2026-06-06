'use client';

import { Check, Star } from 'lucide-react';
import type { Category } from '@/data/types';
import { formatPrice } from '@/lib/utils';
import { cn } from '@/lib/utils';

export interface ShopFilters {
  categories: string[];
  brands: string[];
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
}

export const emptyFilters = (maxPrice: number): ShopFilters => ({
  categories: [],
  brands: [],
  maxPrice,
  minRating: 0,
  inStockOnly: false,
});

export function activeFilterCount(f: ShopFilters, bounds: { max: number }): number {
  return (
    f.categories.length +
    f.brands.length +
    (f.maxPrice < bounds.max ? 1 : 0) +
    (f.minRating > 0 ? 1 : 0) +
    (f.inStockOnly ? 1 : 0)
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-hairline border-b py-5">
      <h3 className="text-title-sm text-ink mb-3">{title}</h3>
      {children}
    </div>
  );
}

function CheckRow({
  label,
  count,
  checked,
  onToggle,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center gap-3 py-1.5 text-left"
    >
      <span
        className={cn(
          'flex h-5 w-5 shrink-0 items-center justify-center rounded-[5px] border transition-colors',
          checked ? 'border-ink bg-ink text-white' : 'border-border-strong'
        )}
      >
        {checked && <Check className="h-3.5 w-3.5" />}
      </span>
      <span className="text-body-sm text-body flex-1">{label}</span>
      {count != null && <span className="text-caption-sm text-muted">{count}</span>}
    </button>
  );
}

export function FilterPanel({
  filters,
  onChange,
  bounds,
  brands,
  categories,
}: {
  filters: ShopFilters;
  onChange: (f: ShopFilters) => void;
  bounds: { min: number; max: number };
  brands: string[];
  categories: Category[];
}) {
  const toggleIn = (key: 'categories' | 'brands', value: string) =>
    onChange({
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((v) => v !== value)
        : [...filters[key], value],
    });

  return (
    <div className="flex flex-col">
      {categories.length > 0 && (
        <Section title="Category">
          <div className="flex flex-col">
            {categories.map((c) => (
              <CheckRow
                key={c.slug}
                label={c.name}
                count={c.productCount}
                checked={filters.categories.includes(c.slug)}
                onToggle={() => toggleIn('categories', c.slug)}
              />
            ))}
          </div>
        </Section>
      )}

      <Section title="Price">
        <div className="text-body-sm text-ink flex items-center justify-between">
          <span>{formatPrice(bounds.min)}</span>
          <span className="font-semibold">Up to {formatPrice(filters.maxPrice)}</span>
        </div>
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={100}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="bg-hairline accent-primary mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full"
          aria-label="Maximum price"
        />
      </Section>

      <Section title="Rating">
        <div className="flex flex-col gap-1">
          {[4, 3, 2].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => onChange({ ...filters, minRating: filters.minRating === r ? 0 : r })}
              className={cn(
                'text-body-sm flex items-center gap-2 rounded-full px-1 py-1.5 transition-colors',
                filters.minRating === r ? 'text-ink font-semibold' : 'text-body'
              )}
            >
              <span className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn('h-3.5 w-3.5', i < r ? 'fill-ink text-ink' : 'text-hairline')}
                  />
                ))}
              </span>
              & up
            </button>
          ))}
        </div>
      </Section>

      <Section title="Availability">
        <CheckRow
          label="In stock only"
          checked={filters.inStockOnly}
          onToggle={() => onChange({ ...filters, inStockOnly: !filters.inStockOnly })}
        />
      </Section>

      {brands.length > 0 && (
        <Section title="Brand">
          <div className="flex max-h-56 flex-col overflow-y-auto pr-1">
            {brands.map((b) => (
              <CheckRow
                key={b}
                label={b}
                checked={filters.brands.includes(b)}
                onToggle={() => toggleIn('brands', b)}
              />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

/** Apply a ShopFilters set to a product list. */
export function applyFilters<
  T extends {
    category: string;
    brand: string;
    price: number;
    rating: number;
    inStock: boolean;
  },
>(list: T[], f: ShopFilters): T[] {
  return list.filter(
    (p) =>
      (f.categories.length === 0 || f.categories.includes(p.category)) &&
      (f.brands.length === 0 || f.brands.includes(p.brand)) &&
      p.price <= f.maxPrice &&
      p.rating >= f.minRating &&
      (!f.inStockOnly || p.inStock)
  );
}
