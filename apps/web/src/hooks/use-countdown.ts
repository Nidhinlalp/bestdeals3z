'use client';

import { useEffect, useState } from 'react';

export interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function diff(target: number): TimeLeft {
  const total = Math.max(0, target - Date.now());
  return {
    total,
    hours: Math.floor(total / 3_600_000),
    minutes: Math.floor((total % 3_600_000) / 60_000),
    seconds: Math.floor((total % 60_000) / 1000),
  };
}

/**
 * Countdown that begins `hoursFromNow` hours from first client mount.
 * Returns null until mounted so SSR/CSR markup stay in sync.
 */
export function useCountdown(hoursFromNow: number): TimeLeft | null {
  const [target, setTarget] = useState<number | null>(null);
  const [left, setLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const t = Date.now() + hoursFromNow * 3_600_000;
    setTarget(t);
    setLeft(diff(t));
  }, [hoursFromNow]);

  useEffect(() => {
    if (target == null) return;
    const id = window.setInterval(() => setLeft(diff(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  return left;
}
