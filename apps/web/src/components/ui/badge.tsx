import type { ReactNode } from 'react';
import { Flame, Sparkles, TrendingUp, Star, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ProductBadge } from '@/data/types';

const styles: Record<ProductBadge, { label: string; className: string; icon: ReactNode }> = {
  new: {
    label: 'New',
    className: 'bg-ink text-white',
    icon: <Sparkles className="h-3 w-3" />,
  },
  bestseller: {
    label: 'Bestseller',
    className: 'bg-white text-ink shadow-[var(--shadow-card)]',
    icon: <Star className="fill-ink h-3 w-3" />,
  },
  trending: {
    label: 'Trending',
    className: 'bg-white text-ink shadow-[var(--shadow-card)]',
    icon: <TrendingUp className="h-3 w-3" />,
  },
  flash: {
    label: 'Flash deal',
    className: 'bg-gradient-brand text-white',
    icon: <Flame className="h-3 w-3" />,
  },
  limited: {
    label: 'Limited',
    className: 'bg-plus text-white',
    icon: <Clock className="h-3 w-3" />,
  },
};

export function ProductBadgePill({ badge }: { badge: ProductBadge }) {
  const s = styles[badge];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold leading-none',
        s.className
      )}
    >
      {s.icon}
      {s.label}
    </span>
  );
}

export function Badge({
  children,
  variant = 'soft',
  className,
}: {
  children: ReactNode;
  variant?: 'soft' | 'solid' | 'outline' | 'success';
  className?: string;
}) {
  const variants = {
    soft: 'bg-primary-tint text-primary',
    solid: 'bg-primary text-white',
    outline: 'border border-hairline text-ink',
    success: 'bg-[#e6f5ec] text-success',
  } as const;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
