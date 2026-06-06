'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Search, TrendingUp, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { searchProducts, searchSuggestions } from '@/data';
import { useMounted } from '@/hooks/use-mounted';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { formatPrice } from '@/lib/utils';
import { useUIStore } from '@/store/ui.store';

export function SearchOverlay() {
  const mounted = useMounted();
  const router = useRouter();
  const open = useUIStore((s) => s.isSearchOpen);
  const close = useUIStore((s) => s.closeSearch);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useScrollLock(open);

  useEffect(() => {
    if (open) {
      setQuery('');
      const t = setTimeout(() => inputRef.current?.focus(), 120);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  const results = query.trim() ? searchProducts(query).slice(0, 6) : [];

  const submit = (q: string) => {
    if (!q.trim()) return;
    close();
    router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[110]">
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
          <motion.div
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -24, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="bg-canvas absolute inset-x-0 top-0 max-h-[92vh] overflow-y-auto rounded-b-2xl shadow-[var(--shadow-float)]"
          >
            <div className="container-page py-4 sm:py-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  submit(query);
                }}
                className="border-hairline bg-canvas focus-within:border-ink flex items-center gap-3 rounded-full border px-4 py-1 shadow-[var(--shadow-card)]"
              >
                <Search className="text-muted h-5 w-5 shrink-0" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for gadgets, audio, home…"
                  className="text-body-md text-ink placeholder:text-muted-soft h-12 flex-1 bg-transparent outline-none"
                />
                <button
                  type="button"
                  onClick={close}
                  aria-label="Close search"
                  className="press bg-surface-strong text-ink hover:bg-hairline flex h-9 w-9 items-center justify-center rounded-full"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </form>

              <div className="mt-6">
                {query.trim() === '' ? (
                  <div>
                    <p className="text-caption text-muted mb-3 flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" /> Popular searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {searchSuggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => submit(s)}
                          className="press border-hairline text-button-sm text-ink hover:border-ink hover:bg-surface-soft rounded-full border px-4 py-2 capitalize transition-colors"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : results.length > 0 ? (
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-caption text-muted">Products</p>
                      <button
                        type="button"
                        onClick={() => submit(query)}
                        className="text-button-sm text-ink hover:text-primary group inline-flex items-center gap-1 font-semibold"
                      >
                        See all results
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                    <ul className="divide-hairline divide-y">
                      {results.map((p) => (
                        <li key={p.slug}>
                          <Link
                            href={`/product/${p.slug}`}
                            onClick={close}
                            className="hover:bg-surface-soft flex items-center gap-4 py-3 transition-colors"
                          >
                            <span className="bg-surface-soft relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                              <Image
                                src={p.images[0]}
                                alt=""
                                fill
                                sizes="56px"
                                className="object-cover"
                              />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="text-title-sm text-ink block truncate">
                                {p.name}
                              </span>
                              <span className="text-caption-sm text-muted">{p.categoryName}</span>
                            </span>
                            <span className="text-title-sm text-ink font-bold">
                              {formatPrice(p.price)}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="py-10 text-center">
                    <p className="text-display-sm text-ink">No matches for “{query}”</p>
                    <p className="text-body-sm text-muted mt-1">
                      Try a different keyword or browse our categories.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
