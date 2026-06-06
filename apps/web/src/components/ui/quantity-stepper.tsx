'use client';

import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  size = 'md',
  className,
}: {
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md';
  className?: string;
}) {
  const dim = size === 'sm' ? 'h-9 w-9' : 'h-11 w-11';
  const btn =
    'flex items-center justify-center text-ink transition-colors hover:bg-surface-soft disabled:opacity-30 disabled:hover:bg-transparent press';
  return (
    <div
      className={cn(
        'border-hairline bg-canvas inline-flex items-center rounded-full border',
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        className={cn(btn, dim, 'rounded-l-full')}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className={cn('text-title-sm min-w-8 text-center font-semibold tabular-nums')}>
        {value}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        className={cn(btn, dim, 'rounded-r-full')}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}
