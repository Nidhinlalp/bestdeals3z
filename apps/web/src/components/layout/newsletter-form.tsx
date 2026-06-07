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
        'focus-within:border-ink flex w-full flex-col gap-2.5 transition-colors sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:border sm:p-1.5 sm:pl-5',
        dark
          ? 'sm:border-white/20 sm:bg-white/10 sm:focus-within:border-white'
          : 'sm:border-hairline sm:bg-canvas'
      )}
    >
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className={cn(
          'text-body-sm h-11 min-w-0 flex-1 rounded-full border px-5 outline-none transition-colors sm:h-10 sm:border-0 sm:bg-transparent sm:px-0',
          dark
            ? 'border-white/20 bg-white/10 text-white placeholder:text-white/50 focus:border-white'
            : 'border-hairline bg-canvas text-ink placeholder:text-muted-soft focus:border-ink'
        )}
      />
      <button
        type="submit"
        className={cn(
          'press text-button-sm flex h-11 w-full shrink-0 items-center justify-center gap-1.5 rounded-full px-5 font-semibold transition-colors sm:h-10 sm:w-auto',
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
