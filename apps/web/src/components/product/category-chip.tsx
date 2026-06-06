import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function CategoryChip({
  label,
  active,
  count,
  onClick,
  href,
  icon,
}: {
  label: string;
  active?: boolean;
  count?: number;
  onClick?: () => void;
  href?: string;
  icon?: ReactNode;
}) {
  const className = cn(
    'press inline-flex items-center gap-2 whitespace-nowrap rounded-full border px-4 py-2 text-button-sm transition-all',
    active ? 'border-ink bg-ink text-white' : 'border-hairline bg-canvas text-ink hover:border-ink'
  );
  const inner = (
    <>
      {icon}
      {label}
      {count != null && (
        <span className={cn('text-xs', active ? 'text-white/70' : 'text-muted')}>{count}</span>
      )}
    </>
  );
  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={className}>
      {inner}
    </button>
  );
}
