import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'pill' | 'whatsapp' | 'dark';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

const base =
  'press inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap rounded-sm transition-[background,color,box-shadow,border] duration-200 select-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-active shadow-[0_6px_20px_-8px_rgba(255,56,92,0.6)] hover:shadow-[0_10px_28px_-8px_rgba(255,56,92,0.7)]',
  secondary: 'bg-canvas text-ink border border-ink hover:bg-surface-soft',
  ghost: 'bg-transparent text-ink hover:bg-surface-soft',
  pill: 'bg-primary text-white hover:bg-primary-active rounded-full',
  whatsapp:
    'bg-[#25D366] text-white hover:bg-[#1ebe5a] rounded-full shadow-[0_6px_20px_-8px_rgba(37,211,102,0.7)]',
  dark: 'bg-ink text-white hover:bg-black rounded-full',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.95rem]',
  lg: 'h-14 px-8 text-base',
  icon: 'h-11 w-11 rounded-full',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  children?: ReactNode;
}

type ButtonAsButton = CommonProps &
  Omit<ComponentProps<'button'>, 'className' | 'children'> & { href?: undefined };
type ButtonAsLink = CommonProps &
  Omit<ComponentProps<typeof Link>, 'className' | 'children' | 'href'> & { href: string };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth,
    className,
    children,
    ...rest
  } = props as CommonProps & { href?: string } & Record<string, unknown>;

  const classes = cn(base, variants[variant], sizes[size], fullWidth && 'w-full', className);

  if (typeof (props as ButtonAsLink).href === 'string') {
    const { href, ...linkRest } = rest as { href: string } & Record<string, unknown>;
    return (
      <Link href={href} className={classes} {...linkRest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<'button'>)}>
      {children}
    </button>
  );
}
