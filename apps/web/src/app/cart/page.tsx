import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { CartClient } from '@/components/sections/cart-client';

export const metadata: Metadata = {
  title: 'Your cart',
  description: 'Review the items in your cart and checkout via WhatsApp.',
};

export default function CartPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} title="Your cart" />
      <CartClient />
    </>
  );
}
