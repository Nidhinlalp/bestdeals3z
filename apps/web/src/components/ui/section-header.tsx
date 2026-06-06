import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
  className,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: { label: string; href: string };
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between',
        align === 'center' && 'sm:flex-col sm:items-center sm:text-center',
        className
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && (
          <span className="text-uppercase-tag text-primary mb-2 inline-flex items-center gap-2">
            <span className="bg-primary h-1.5 w-1.5 rounded-full" />
            {eyebrow}
          </span>
        )}
        <h2 className="text-display-2xl text-ink">{title}</h2>
        {subtitle && <p className="text-body-md text-muted mt-2">{subtitle}</p>}
      </div>
      {action && (
        <Link
          href={action.href}
          className="text-title-sm text-ink hover:text-primary group inline-flex shrink-0 items-center gap-1.5 font-semibold transition-colors"
        >
          {action.label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
