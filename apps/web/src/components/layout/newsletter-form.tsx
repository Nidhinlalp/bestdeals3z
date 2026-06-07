'use client';

import { ArrowRight, Check } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { toast } from '@/store/toast.store';

export function NewsletterForm({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const dark = variant === 'dark';

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (!email.trim()) return;
        setDone(true);
        toast({
          variant: 'success',
          title: 'You’re subscribed!',
          description: 'Watch your inbox for fresh drops & deals.',
        });
        setEmail('');
        setTimeout(() => setDone(false), 2500);
      }}
      className={cn(
        'focus-within:border-ink flex w-full items-center gap-1.5 overflow-hidden rounded-full border p-1.5 pl-4 transition-colors sm:gap-2 sm:pl-5',
        dark ? 'border-white/20 bg-white/10 focus-within:border-white' : 'border-hairline bg-canvas'
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={cn(
          'text-body-sm h-10 min-w-0 flex-1 bg-transparent pr-1 outline-none sm:pr-0',
          dark ? 'text-white placeholder:text-white/50' : 'text-ink placeholder:text-muted-soft'
        )}
      />
      <button
        type="submit"
        className={cn(
          'press text-button-sm flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 font-semibold transition-colors sm:px-5',
          done
            ? 'bg-success text-white'
            : dark
              ? 'text-ink bg-white hover:bg-white/90'
              : 'bg-primary hover:bg-primary-active text-white'
        )}
      >
        {done ? (
          <>
            <Check className="h-4 w-4" /> Done
          </>
        ) : (
          <>
            Subscribe
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
