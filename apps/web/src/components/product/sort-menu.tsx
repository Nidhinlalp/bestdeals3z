'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpDown, Check, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { sortOptions, type SortKey } from '@/data';
import { cn } from '@/lib/utils';

export function SortMenu({ value, onChange }: { value: SortKey; onChange: (k: SortKey) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = sortOptions.find((o) => o.key === value);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="press border-hairline bg-canvas text-button-sm text-ink hover:border-ink inline-flex h-11 items-center gap-2 rounded-full border px-4 transition-colors"
      >
        <ArrowUpDown className="h-4 w-4" />
        <span className="hidden sm:inline">Sort:</span>
        <span className="font-semibold">{current?.label}</span>
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="border-hairline bg-canvas absolute right-0 z-40 mt-2 w-56 overflow-hidden rounded-md border py-1.5 shadow-[var(--shadow-float)]"
          >
            {sortOptions.map((o) => (
              <li key={o.key}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  className={cn(
                    'text-body-sm hover:bg-surface-soft flex w-full items-center justify-between px-4 py-2.5 text-left transition-colors',
                    value === o.key ? 'text-ink font-semibold' : 'text-body'
                  )}
                >
                  {o.label}
                  {value === o.key && <Check className="text-primary h-4 w-4" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
