'use client';

import { CheckCircle2, Send } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Field, Input, Select, Textarea } from '@/components/ui/form';
import { toast } from '@/store/toast.store';

const topics = [
  'General enquiry',
  'Order support',
  'Returns & refunds',
  'Product question',
  'Partnership',
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });

  if (sent) {
    return (
      <div className="border-hairline bg-surface-soft flex flex-col items-center justify-center rounded-2xl border px-6 py-14 text-center">
        <span className="text-success flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f5ec]">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h3 className="text-display-sm text-ink mt-4">Message sent!</h3>
        <p className="text-body-sm text-muted mt-2 max-w-sm">
          Thanks {form.name || 'there'} — we&apos;ll get back to you within a few hours. For
          anything urgent, ping us on WhatsApp.
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setSent(false)}>
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
        toast({ variant: 'success', title: 'Message sent!', description: 'We’ll reply shortly.' });
      }}
      className="border-hairline rounded-2xl border p-6 sm:p-8"
    >
      <h2 className="text-display-sm text-ink">Send us a message</h2>
      <p className="text-body-sm text-muted mt-1">We typically reply within a few hours.</p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Field label="Your name" required>
          <Input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
          />
        </Field>
        <Field label="Email" required>
          <Input
            required
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@email.com"
          />
        </Field>
        <Field label="Topic" className="sm:col-span-2">
          <Select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {topics.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </Select>
        </Field>
        <Field label="Message" required className="sm:col-span-2">
          <Textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help?"
            className="min-h-32"
          />
        </Field>
      </div>
      <Button type="submit" variant="primary" size="lg" className="mt-5 w-full sm:w-auto">
        <Send className="h-4.5 w-4.5" />
        Send message
      </Button>
    </form>
  );
}
