import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Star rating. Per the design system, stars render in ink (not gold) for a
 * premium, non-cheap feel. Supports half-star fill via a clipped overlay.
 */
export function Rating({
  value,
  reviews,
  size = 14,
  showValue = false,
  className,
}: {
  value: number;
  reviews?: number;
  size?: number;
  showValue?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn('flex items-center gap-1.5', className)}
      aria-label={`Rated ${value} out of 5`}
    >
      <span className="flex items-center" style={{ gap: 2 }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const fill = Math.max(0, Math.min(1, value - i));
          return (
            <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
              <Star
                className="text-hairline absolute inset-0"
                style={{ width: size, height: size }}
              />
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${fill * 100}%` }}
              >
                <Star className="text-ink fill-ink" style={{ width: size, height: size }} />
              </span>
            </span>
          );
        })}
      </span>
      {showValue && <span className="text-ink text-sm font-semibold">{value.toFixed(1)}</span>}
      {reviews != null && (
        <span className="text-muted text-xs">({reviews.toLocaleString('en-IN')})</span>
      )}
    </div>
  );
}
