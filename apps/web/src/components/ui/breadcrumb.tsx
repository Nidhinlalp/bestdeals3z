import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Fragment } from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-body-sm text-muted flex items-center gap-1.5">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <Fragment key={`${c.label}-${i}`}>
            {c.href && !last ? (
              <Link href={c.href} className="hover:text-ink transition-colors">
                {c.label}
              </Link>
            ) : (
              <span className={last ? 'text-ink font-medium' : ''}>{c.label}</span>
            )}
            {!last && <ChevronRight className="text-muted-soft h-3.5 w-3.5" />}
          </Fragment>
        );
      })}
    </nav>
  );
}
