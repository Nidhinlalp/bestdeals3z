'use client';

import { Check, Copy, Ticket } from 'lucide-react';
import { useState } from 'react';
import type { Offer } from '@/data/types';
import { toast } from '@/store/toast.store';

export function OfferCard({ offer }: { offer: Offer }) {
  const [copied, setCopied] = useState(false);
  const copyable = !offer.code.includes(' ');

  const copy = () => {
    if (!copyable) return;
    navigator.clipboard?.writeText(offer.code);
    setCopied(true);
    toast({ variant: 'success', title: 'Code copied!', description: offer.code });
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="border-hairline bg-canvas relative flex flex-col overflow-hidden rounded-2xl border p-6">
      <span
        className="absolute right-0 top-0 h-24 w-24 rounded-bl-full opacity-10"
        style={{ backgroundColor: offer.accent }}
      />
      <span
        className="text-caption inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 font-bold text-white"
        style={{ backgroundColor: offer.accent }}
      >
        <Ticket className="h-3.5 w-3.5" />
        {offer.discount}
      </span>
      <h3 className="text-title-md text-ink mt-4">{offer.title}</h3>
      <p className="text-body-sm text-muted mt-1 flex-1">{offer.description}</p>

      <button
        type="button"
        onClick={copy}
        disabled={!copyable}
        className="press border-border-strong bg-surface-soft enabled:hover:border-ink mt-4 flex items-center justify-between gap-2 rounded-lg border border-dashed px-4 py-3 text-left transition-colors"
      >
        <span className="text-title-sm text-ink font-mono font-bold tracking-wide">
          {offer.code}
        </span>
        {copyable && (
          <span className="text-button-sm text-primary flex items-center gap-1 font-semibold">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? 'Copied' : 'Copy'}
          </span>
        )}
      </button>
      <p className="text-caption-sm text-muted mt-3">{offer.expiresLabel}</p>
    </div>
  );
}
