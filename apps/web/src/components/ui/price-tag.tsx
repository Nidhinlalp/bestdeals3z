import { cn } from '@/lib/utils';
import { discountPercent, formatPrice } from '@/lib/utils';

export function PriceTag({
  price,
  mrp,
  size = 'md',
  className,
}: {
  price: number;
  mrp: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const off = discountPercent(mrp, price);
  const priceClass = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <div className={cn('flex flex-wrap items-baseline gap-x-2 gap-y-0.5', className)}>
      <span className={cn('text-ink font-bold', priceClass)}>{formatPrice(price)}</span>
      {off > 0 && (
        <>
          <span className={cn('text-muted line-through', size === 'lg' ? 'text-base' : 'text-xs')}>
            {formatPrice(mrp)}
          </span>
          <span className={cn('text-success font-semibold', size === 'lg' ? 'text-sm' : 'text-xs')}>
            {off}% off
          </span>
        </>
      )}
    </div>
  );
}
