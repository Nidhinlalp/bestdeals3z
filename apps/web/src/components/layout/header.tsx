'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Menu, Search, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { categories, navLinks } from '@/data';
import { useMounted } from '@/hooks/use-mounted';
import { cn } from '@/lib/utils';
import { useCartStore, selectCount } from '@/store/cart.store';
import { useWishlistStore } from '@/store/wishlist.store';
import { useUIStore } from '@/store/ui.store';
import { Logo } from '@/components/ui/logo';

function CountDot({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="h-4.5 min-w-4.5 bg-primary absolute -right-1 -top-1 flex items-center justify-center rounded-full px-1 text-[0.625rem] font-bold leading-none text-white">
      {count > 99 ? '99+' : count}
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const mounted = useMounted();
  const [scrolled, setScrolled] = useState(false);

  const cartCount = useCartStore(selectCount);
  const wishCount = useWishlistStore((s) => s.slugs.length);
  const openMenu = useUIStore((s) => s.openMobileMenu);
  const openSearch = useUIStore((s) => s.openSearch);
  const openCart = useCartStore((s) => s.openCart);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled ? 'glass border-hairline/80 border-b' : 'bg-canvas border-b border-transparent'
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-3 sm:h-20">
        {/* Left */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Open menu"
            onClick={openMenu}
            className="press text-ink hover:bg-surface-soft -ml-1 flex h-10 w-10 items-center justify-center rounded-full sm:hidden"
          >
            <Menu className="h-5.5 w-5.5" />
          </button>
          <Logo />
        </div>

        {/* Center nav (desktop) */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  'text-nav-link relative rounded-full px-3.5 py-2 transition-colors',
                  active ? 'text-ink' : 'text-muted hover:text-ink'
                )}
              >
                {l.label}
                {active && (
                  <span className="bg-primary absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Desktop search pill */}
          <button
            type="button"
            onClick={openSearch}
            className="press border-hairline bg-canvas text-body-sm text-muted hover:border-ink hidden h-11 items-center gap-2 rounded-full border px-4 transition-all hover:shadow-[var(--shadow-card)] md:flex"
          >
            <Search className="h-4 w-4" />
            <span className="pr-6">Search products…</span>
          </button>
          {/* Mobile search icon */}
          <button
            type="button"
            aria-label="Search"
            onClick={openSearch}
            className="press text-ink hover:bg-surface-soft flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          >
            <Search className="h-5 w-5" />
          </button>

          <Link
            href="/wishlist"
            aria-label="Wishlist"
            className="press text-ink hover:bg-surface-soft relative hidden h-10 w-10 items-center justify-center rounded-full sm:flex"
          >
            <Heart className="h-5 w-5" />
            {mounted && <CountDot count={wishCount} />}
          </Link>

          <button
            type="button"
            aria-label="Open cart"
            onClick={openCart}
            className="press text-ink hover:bg-surface-soft relative flex h-10 w-10 items-center justify-center rounded-full"
          >
            <ShoppingBag className="h-5 w-5" />
            {mounted && <CountDot count={cartCount} />}
          </button>
        </div>
      </div>

      {/* Category strip (desktop / tablet) */}
      <div className="border-hairline/70 hidden border-t sm:block">
        <div className="container-page no-scrollbar flex items-center gap-5 overflow-x-auto py-2.5">
          <Link
            href="/shop"
            className="text-button-sm text-ink hover:text-primary shrink-0 font-semibold transition-colors"
          >
            All products
          </Link>
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="text-button-sm text-muted hover:text-ink shrink-0 transition-colors"
            >
              {c.name}
            </Link>
          ))}
          <Link
            href="/deals"
            className="text-button-sm text-primary ml-auto shrink-0 font-semibold"
          >
            🔥 Today&apos;s deals
          </Link>
        </div>
      </div>
    </header>
  );
}
