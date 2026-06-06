import { ChevronDown } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const fieldBase =
  'w-full rounded-sm border border-hairline bg-canvas px-3.5 text-body-md text-ink placeholder:text-muted-soft transition-colors focus:border-ink focus:outline-none focus:ring-0';

export function Field({
  label,
  hint,
  required,
  children,
  className,
}: {
  label?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={cn('flex flex-col gap-1.5', className)}>
      {label && (
        <span className="text-caption text-ink">
          {label}
          {required && <span className="text-primary"> *</span>}
        </span>
      )}
      {children}
      {hint && <span className="text-caption-sm text-muted">{hint}</span>}
    </label>
  );
}

export function Input({ className, ...props }: ComponentProps<'input'>) {
  return <input className={cn(fieldBase, 'h-14', className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<'textarea'>) {
  return <textarea className={cn(fieldBase, 'min-h-28 resize-y py-3', className)} {...props} />;
}

export function Select({ className, children, ...props }: ComponentProps<'select'>) {
  return (
    <div className="relative">
      <select
        className={cn(fieldBase, 'h-14 cursor-pointer appearance-none pr-10', className)}
        {...props}
      >
        {children}
      </select>
      <ChevronDown className="text-muted pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
  );
}
