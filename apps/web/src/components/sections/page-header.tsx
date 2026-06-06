import type { ReactNode } from 'react';
import { Breadcrumb, type Crumb } from '@/components/ui/breadcrumb';

export function PageHeader({
  crumbs,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  crumbs?: Crumb[];
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="container-page pt-6 sm:pt-8">
      {crumbs && <Breadcrumb items={crumbs} />}
      {eyebrow && <p className="text-uppercase-tag text-primary mt-4">{eyebrow}</p>}
      <h1 className="text-display-2xl text-ink mt-2">{title}</h1>
      {subtitle && <p className="text-body-md text-muted mt-2 max-w-2xl">{subtitle}</p>}
      {children}
    </div>
  );
}
