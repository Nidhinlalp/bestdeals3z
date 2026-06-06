import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { CheckoutClient } from '@/components/sections/checkout-client';

export const metadata: Metadata = {
  title: 'Checkout',
  description: 'Complete your order via WhatsApp — fast, secure and personal.',
};

export default function CheckoutPage() {
  return (
    <>
      <PageHeader
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Cart', href: '/cart' },
          { label: 'Checkout' },
        ]}
        title="Checkout"
        subtitle="Almost there — just your delivery details and you're done."
      />
      <CheckoutClient />
    </>
  );
}
