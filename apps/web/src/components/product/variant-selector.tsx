'use client';

import { Check } from 'lucide-react';
import type { Product } from '@/data/types';
import { cn } from '@/lib/utils';

export function VariantSelector({
  product,
  selected,
  onChange,
  size = 'md',
}: {
  product: Product;
  selected: Record<string, string>;
  onChange: (group: string, value: string) => void;
  size?: 'sm' | 'md';
}) {
  if (!product.variants.length) return null;

  return (
    <div className={cn('flex flex-col', size === 'sm' ? 'gap-3' : 'gap-4')}>
      {product.variants.map((group) => {
        const isColour = group.name.toLowerCase() === 'colour';
        const current = selected[group.name];
        return (
          <div key={group.name}>
            <div className="mb-2 flex items-center gap-1.5">
              <span className="text-caption text-muted">{group.name}</span>
              <span className="text-caption text-ink font-semibold">
                {group.options.find((o) => o.value === current)?.label}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.options.map((opt) => {
                const active = current === opt.value;
                if (isColour) {
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      aria-label={opt.label}
                      aria-pressed={active}
                      onClick={() => onChange(group.name, opt.value)}
                      className={cn(
                        'press relative h-9 w-9 rounded-full border transition-all',
                        active
                          ? 'border-ink ring-ink ring-2 ring-offset-2'
                          : 'border-hairline hover:border-border-strong'
                      )}
                      style={{ backgroundColor: opt.swatch }}
                    >
                      {active && (
                        <Check
                          className="absolute inset-0 m-auto h-4 w-4"
                          style={{ color: isLight(opt.swatch) ? '#222' : '#fff' }}
                        />
                      )}
                    </button>
                  );
                }
                return (
                  <button
                    key={opt.value}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange(group.name, opt.value)}
                    className={cn(
                      'press text-button-sm min-w-12 rounded-sm border px-3.5 py-2 transition-all',
                      active
                        ? 'border-ink bg-ink text-white'
                        : 'border-hairline text-ink hover:border-ink'
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function isLight(hex?: string): boolean {
  if (!hex) return false;
  const c = hex.replace('#', '');
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}
