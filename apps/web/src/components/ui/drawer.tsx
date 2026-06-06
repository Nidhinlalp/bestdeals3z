'use client';

import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useMounted } from '@/hooks/use-mounted';
import { useScrollLock } from '@/hooks/use-scroll-lock';
import { cn } from '@/lib/utils';

type Side = 'left' | 'right' | 'bottom';

const panelClass: Record<Side, string> = {
  left: 'inset-y-0 left-0 h-full w-[88%] max-w-sm rounded-r-xl',
  right: 'inset-y-0 right-0 h-full w-[92%] max-w-md rounded-l-xl',
  bottom: 'inset-x-0 bottom-0 max-h-[88vh] w-full rounded-t-2xl',
};

const variants: Record<
  Side,
  { initial: TargetAndTransition; animate: TargetAndTransition; exit: TargetAndTransition }
> = {
  left: { initial: { x: '-100%' }, animate: { x: 0 }, exit: { x: '-100%' } },
  right: { initial: { x: '100%' }, animate: { x: 0 }, exit: { x: '100%' } },
  bottom: { initial: { y: '100%' }, animate: { y: 0 }, exit: { y: '100%' } },
};

export function Drawer({
  open,
  onClose,
  side = 'right',
  title,
  children,
  footer,
  className,
}: {
  open: boolean;
  onClose: () => void;
  side?: Side;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}) {
  const mounted = useMounted();
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className={cn(
              'bg-canvas absolute flex flex-col shadow-[var(--shadow-float)]',
              panelClass[side],
              className
            )}
            initial={variants[side].initial}
            animate={variants[side].animate}
            exit={variants[side].exit}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
          >
            {(title || true) && (
              <div className="border-hairline flex items-center justify-between border-b px-5 py-4">
                <div className="text-display-sm text-ink">{title}</div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="press bg-surface-strong text-ink hover:bg-hairline flex h-9 w-9 items-center justify-center rounded-full transition-colors"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>
            )}
            <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
            {footer && <div className="border-hairline border-t p-5">{footer}</div>}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
