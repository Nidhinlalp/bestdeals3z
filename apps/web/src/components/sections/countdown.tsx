'use client';

import { useCountdown } from '@/hooks/use-countdown';
import { cn } from '@/lib/utils';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function Countdown({
  hours = 11,
  variant = 'light',
  className,
}: {
  hours?: number;
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const left = useCountdown(hours);
  const dark = variant === 'dark';

  const cell = cn(
    'flex h-11 w-11 items-center justify-center rounded-lg text-display-sm font-bold tabular-nums sm:h-12 sm:w-12',
    dark ? 'bg-white/15 text-white' : 'bg-ink text-white'
  );

  const parts = left
    ? [
        { v: pad(left.hours), l: 'Hrs' },
        { v: pad(left.minutes), l: 'Min' },
        { v: pad(left.seconds), l: 'Sec' },
      ]
    : [
        { v: '--', l: 'Hrs' },
        { v: '--', l: 'Min' },
        { v: '--', l: 'Sec' },
      ];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {parts.map((p, i) => (
        <div key={p.l} className="flex items-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className={cell}>{p.v}</span>
            <span
              className={cn(
                'text-[0.625rem] font-semibold uppercase tracking-wider',
                dark ? 'text-white/60' : 'text-muted'
              )}
            >
              {p.l}
            </span>
          </div>
          {i < parts.length - 1 && (
            <span
              className={cn(
                'text-display-sm -mt-4 font-bold',
                dark ? 'text-white/50' : 'text-muted'
              )}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
