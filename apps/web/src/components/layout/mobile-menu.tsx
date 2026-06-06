'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Heart, MessageCircle } from 'lucide-react';
import { categories, navLinks, siteConfig } from '@/data';
import { cn } from '@/lib/utils';
import { waHref } from '@/lib/whatsapp';
import { useUIStore } from '@/store/ui.store';
import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { Logo } from '@/components/ui/logo';

export function MobileMenu() {
  const pathname = usePathname();
  const open = useUIStore((s) => s.isMobileMenuOpen);
  const close = useUIStore((s) => s.closeMobileMenu);

  return (
    <Drawer open={open} onClose={close} side="left" title={<Logo />}>
      <nav className="flex flex-col px-2 py-2">
        {navLinks.map((l) => {
          const active = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              onClick={close}
              className={cn(
                'text-display-sm flex items-center justify-between rounded-lg px-3 py-3 transition-colors',
                active ? 'bg-primary-tint text-primary' : 'text-ink hover:bg-surface-soft'
              )}
            >
              {l.label}
              <ChevronRight className="h-5 w-5 opacity-40" />
            </Link>
          );
        })}
      </nav>

      <div className="border-hairline mt-2 border-t px-5 py-4">
        <p className="text-uppercase-tag text-muted mb-3">Shop by category</p>
        <div className="flex flex-col gap-1">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              onClick={close}
              className="text-body-md text-body hover:bg-surface-soft hover:text-ink flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors"
            >
              {c.name}
              <span className="text-caption-sm text-muted">{c.productCount}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-hairline border-t px-5 py-4">
        <Link
          href="/wishlist"
          onClick={close}
          className="text-body-md text-ink hover:bg-surface-soft flex items-center gap-3 rounded-lg px-3 py-3 transition-colors"
        >
          <Heart className="h-5 w-5" />
          My wishlist
        </Link>
      </div>

      <div className="px-5 py-4">
        <Button
          href={waHref(`Hi ${siteConfig.name}! I have a question.`)}
          target="_blank"
          rel="noopener noreferrer"
          variant="whatsapp"
          fullWidth
          onClick={close}
        >
          <MessageCircle className="h-4.5 w-4.5" />
          Chat with us
        </Button>
      </div>
    </Drawer>
  );
}
