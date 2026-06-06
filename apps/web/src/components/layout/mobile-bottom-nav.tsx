'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Home, Search, ShoppingBag, Store } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { useCartStore, selectCount } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useUIStore } from '@/store/ui.store';

export function MobileBottomNav() {
  const pathname = usePathname();
  const mounted = useMounted();
  const cartCount = useCartStore(selectCount);
  const wishCount = useWishlistStore((s) => s.slugs.length);
  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useCartStore((s) => s.openCart);

  const item = (active: boolean) =>
    cn(
      'press relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[0.625rem] font-medium transition-colors',
      active ? 'text-primary' : 'text-muted'
    );

  const Tab = ({
    href,
    icon: Icon,
    label,
    active,
    count,
  }: {
    href: string;
    icon: LucideIcon;
    label: string;
    active: boolean;
    count?: number;
  }) => (
    <Link href={href} className={item(active)}>
      <span className="relative">
        <Icon className={cn('h-5.5 w-5.5', active && 'fill-primary/10')} />
        {mounted && count != null && count > 0 && (
          <span className="bg-primary absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.5625rem] font-bold leading-none text-white">
            {count > 9 ? '9+' : count}
          </span>
        )}
      </span>
      {label}
    </Link>
  );

  return (
    <nav className="border-hairline bg-canvas/95 pb-safe-nav fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t backdrop-blur-lg lg:hidden">
      <Tab href="/" icon={Home} label="Home" active={pathname === '/'} />
      <Tab href="/shop" icon={Store} label="Shop" active={pathname.startsWith('/shop')} />
      <button type="button" onClick={openSearch} className={item(false)}>
        <Search className="h-5.5 w-5.5" />
        Search
      </button>
      <Tab
        href="/wishlist"
        icon={Heart}
        label="Wishlist"
        active={pathname.startsWith('/wishlist')}
        count={wishCount}
      />
      <button type="button" onClick={openCart} className={item(false)}>
        <span className="relative">
          <ShoppingBag className="h-5.5 w-5.5" />
          {mounted && cartCount > 0 && (
            <span className="bg-primary absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.5625rem] font-bold leading-none text-white">
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </span>
        Cart
      </button>
    </nav>
  );
}
