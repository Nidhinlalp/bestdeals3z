'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info, AlertCircle, ShoppingCart, X } from 'lucide-react';
import { useMounted } from '@/hooks/use-mounted';
import { useToastStore, type ToastVariant } from '@/store/toast.store';

const icons: Record<ToastVariant, React.ReactNode> = {
  success: <CheckCircle2 className="text-success h-5 w-5" />,
  info: <Info className="text-legal-link h-5 w-5" />,
  error: <AlertCircle className="text-error h-5 w-5" />,
  cart: <ShoppingCart className="text-primary h-5 w-5" />,
};

export function Toaster() {
  const mounted = useMounted();
  const toasts = useToastStore((s) => s.toasts);
  const dismiss = useToastStore((s) => s.dismiss);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[120] flex flex-col items-center gap-2 px-4 sm:bottom-6 sm:left-auto sm:right-6 sm:items-end">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.18 } }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="border-hairline bg-canvas pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-md border p-4 shadow-[var(--shadow-float)]"
          >
            <div className="mt-0.5 shrink-0">{icons[t.variant]}</div>
            <div className="min-w-0 flex-1">
              <p className="text-title-sm text-ink font-semibold">{t.title}</p>
              {t.description && <p className="text-body-sm text-muted mt-0.5">{t.description}</p>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
              className="press text-muted hover:text-ink -m-1 shrink-0 rounded-full p-1 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
