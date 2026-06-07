'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, Lock, MessageCircle, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useMounted } from '@/hooks/use-mounted';
import { shippingFor } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { checkoutMessage, waHref } from '@/lib/whatsapp';
import { useCartStore, selectSubtotal } from '@/store/cart.store';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { Field, Input, Select, Textarea } from '@/components/ui/form';

const areas = ['Same city (1–2 days)', 'Metro city (2–3 days)', 'Rest of India (3–5 days)'];

interface Form {
  name: string;
  phone: string;
  address: string;
  area: string;
  note: string;
}

export function CheckoutClient() {
  const mounted = useMounted();
  const { items, clear } = useCartStore();
  const subtotal = useCartStore(selectSubtotal);
  const shipping = shippingFor(subtotal);
  const total = subtotal + shipping;

  const [form, setForm] = useState<Form>({
    name: '',
    phone: '',
    address: '',
    area: areas[0],
    note: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [placed, setPlaced] = useState(false);
  const orderId = 'BD3Z-' + (1000 + items.length * 7 + (subtotal % 9999)).toString().slice(0, 5);

  const set = (k: keyof Form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = 'Please enter your name';
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) e.phone = 'Enter a valid phone number';
    if (form.address.trim().length < 8) e.address = 'Please enter your full address';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  if (!mounted) {
    return (
      <div className="container-page py-10">
        <div className="skeleton h-80 w-full rounded-xl" />
      </div>
    );
  }

  if (items.length === 0 && !placed) {
    return (
      <div className="container-page py-10">
        <EmptyState
          icon={ShoppingBag}
          title="Nothing to checkout"
          description="Add some products to your cart first."
          action={<Button href="/shop">Browse products</Button>}
        />
      </div>
    );
  }

  if (placed) {
    return (
      <div className="container-page py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-hairline mx-auto max-w-lg rounded-2xl border p-8 text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
            className="text-success mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#e6f5ec]"
          >
            <CheckCircle2 className="h-9 w-9" />
          </motion.span>
          <h2 className="text-display-xl text-ink mt-5">Your order is ready!</h2>
          <p className="text-body-md text-muted mt-2">
            Order <span className="text-ink font-semibold">{orderId}</span> is prepared. Send it on
            WhatsApp and our team will confirm everything in minutes.
          </p>

          <div className="bg-surface-soft text-body-sm mt-6 rounded-xl p-4 text-left">
            <p className="text-ink font-semibold">Delivering to</p>
            <p className="text-muted mt-1">
              {form.name} · {form.phone}
              <br />
              {form.address}
              <br />
              {form.area}
            </p>
            <div className="border-hairline text-ink mt-3 flex justify-between border-t pt-3">
              <span>Total ({items.length} items)</span>
              <span className="font-bold">{formatPrice(total)}</span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-2.5">
            <Button
              href={waHref(checkoutMessage({ ...form, items, subtotal, shipping }))}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="lg"
              fullWidth
            >
              <MessageCircle className="h-5 w-5" />
              Send order on WhatsApp
            </Button>
            <Button
              variant="ghost"
              className="border-hairline border"
              onClick={() => {
                clear();
              }}
              href="/"
            >
              Back to home
            </Button>
          </div>
          <p className="text-caption-sm text-muted mt-4">
            This is a demo checkout — no payment is processed.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container-page py-8 sm:py-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Form */}
        <div>
          <div className="border-hairline rounded-xl border p-6">
            <h2 className="text-display-sm text-ink">Delivery details</h2>
            <p className="text-body-sm text-muted mt-1">
              We&apos;ll use these to confirm your order on WhatsApp. No account needed.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" required className="sm:col-span-1" hint={errors.name}>
                <Input
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  placeholder="Your name"
                  aria-invalid={!!errors.name}
                />
              </Field>
              <Field label="Phone number" required hint={errors.phone}>
                <Input
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  placeholder="+91 79948 67698"
                  inputMode="tel"
                  aria-invalid={!!errors.phone}
                />
              </Field>
              <Field
                label="Delivery address"
                required
                className="sm:col-span-2"
                hint={errors.address}
              >
                <Textarea
                  value={form.address}
                  onChange={(e) => set('address', e.target.value)}
                  placeholder="House / flat, street, city, state, PIN code"
                />
              </Field>
              <Field label="Delivery area" className="sm:col-span-1">
                <Select value={form.area} onChange={(e) => set('area', e.target.value)}>
                  {areas.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </Select>
              </Field>
              <Field label="Order note (optional)" className="sm:col-span-2">
                <Textarea
                  value={form.note}
                  onChange={(e) => set('note', e.target.value)}
                  placeholder="Any delivery instructions or preferences?"
                  className="min-h-20"
                />
              </Field>
            </div>
          </div>

          <div className="bg-surface-soft text-caption text-muted mt-4 flex items-center gap-2 rounded-xl p-4">
            <Lock className="text-primary h-4 w-4" />
            Your details stay private and are only shared with our order team via WhatsApp.
          </div>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <div className="border-hairline rounded-xl border p-6">
            <h2 className="text-display-sm text-ink">Order summary</h2>
            <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <li key={`${item.slug}-${item.variant ?? ''}`} className="flex items-center gap-3">
                  <span className="bg-surface-soft relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                    <span className="bg-ink absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.625rem] font-bold text-white">
                      {item.quantity}
                    </span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="text-body-sm text-ink block truncate font-medium">
                      {item.name}
                    </span>
                    {item.variant && (
                      <span className="text-caption-sm text-muted">{item.variant}</span>
                    )}
                  </span>
                  <span className="text-body-sm text-ink font-semibold">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>

            <dl className="border-hairline text-body-sm mt-5 space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd className="text-ink font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd className="text-ink font-medium">
                  {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                </dd>
              </div>
            </dl>
            <div className="border-hairline mt-3 flex items-baseline justify-between border-t pt-3">
              <span className="text-title-md text-ink">Total</span>
              <span className="text-display-md text-ink font-bold">{formatPrice(total)}</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              className="mt-5"
              onClick={() => {
                if (validate()) setPlaced(true);
              }}
            >
              Review & place order
            </Button>
            <p className="text-caption-sm text-muted mt-3 text-center">
              You&apos;ll confirm on WhatsApp — no payment taken here.
            </p>
          </div>
          <Link
            href="/cart"
            className="text-button-sm text-ink hover:text-primary mt-4 block text-center font-semibold"
          >
            ← Back to cart
          </Link>
        </aside>
      </div>
    </div>
  );
}
