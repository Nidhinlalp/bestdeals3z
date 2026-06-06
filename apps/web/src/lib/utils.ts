// cn() — Tailwind CSS class merger
// Combines clsx and tailwind-merge to merge Tailwind classes without conflicts.
// Used by all Shadcn UI components.
//
// Usage:
//   import { cn } from '@/lib/utils';
//   <div className={cn('base-class', condition && 'conditional-class', className)} />
//
// TODO: Install clsx and tailwind-merge to enable this:
//   pnpm --filter web add clsx tailwind-merge
//
// import { clsx, type ClassValue } from 'clsx';
// import { twMerge } from 'tailwind-merge';
//
// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

export {};
