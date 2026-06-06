'use client';

import { Heart } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { getProductBySlug } from '@/data';
import { useWishlistStore } from '@/store/wishlist.store';
import { toast } from '@/store/toast.store';

export function WishlistButton({
  slug,
  className,
  size = 'md',
}: {
  slug: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const mounted = useMounted();
  const active = useWishlistStore((s) => s.slugs.includes(slug));
  const toggle = useWishlistStore((s) => s.toggle);
  const saved = mounted && active;

  return (
    <button
      type="button"
      aria-label={saved ? 'Remove from wishlist' : 'Add to wishlist'}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(slug);
        toast({
          variant: 'success',
          title: saved ? 'Removed from wishlist' : 'Saved to wishlist',
          description: getProductBySlug(slug)?.name,
        });
      }}
      className={cn(
        'press bg-canvas/90 text-ink flex items-center justify-center rounded-full shadow-[var(--shadow-card)] backdrop-blur transition-transform hover:scale-110',
        size === 'md' ? 'h-9 w-9' : 'h-8 w-8',
        className
      )}
    >
      <Heart
        className={cn(
          'transition-all',
          size === 'md' ? 'h-[18px] w-[18px]' : 'h-4 w-4',
          saved ? 'fill-primary text-primary scale-110' : 'text-ink'
        )}
      />
    </button>
  );
}
