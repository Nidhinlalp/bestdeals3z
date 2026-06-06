import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'border-hairline bg-surface-soft/50 flex flex-col items-center justify-center rounded-xl border border-dashed px-6 py-16 text-center',
        className
      )}
    >
      <div className="bg-primary-tint text-primary mb-5 flex h-16 w-16 items-center justify-center rounded-full">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-display-sm text-ink">{title}</h3>
      {description && <p className="text-body-sm text-muted mt-2 max-w-sm">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
