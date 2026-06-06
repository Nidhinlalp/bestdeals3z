import Link from 'next/link';
import { cn } from '@/lib/utils';

/** BestDeal3Z wordmark — geometric “B3Z” orb + wordmark. */
export function Logo({
  className,
  showText = true,
  invert = false,
}: {
  className?: string;
  showText?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="BestDeal3Z home"
      className={cn('group inline-flex items-center gap-2', className)}
    >
      <span className="bg-gradient-brand relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl text-white shadow-[0_6px_18px_-6px_rgba(255,56,92,0.7)] transition-transform duration-300 group-hover:scale-105">
        <span className="text-[0.95rem] font-extrabold tracking-tight">3Z</span>
        <span className="absolute -right-3 -top-3 h-7 w-7 rounded-full bg-white/20 blur-md" />
      </span>
      {showText && (
        <span
          className={cn(
            'text-display-sm font-extrabold tracking-tight',
            invert ? 'text-white' : 'text-ink'
          )}
        >
          BestDeal<span className="text-primary">3Z</span>
        </span>
      )}
    </Link>
  );
}
