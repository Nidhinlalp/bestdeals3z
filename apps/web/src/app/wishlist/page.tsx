import type { Metadata } from 'next';
import { PageHeader } from '@/components/sections/page-header';
import { WishlistClient } from '@/components/sections/wishlist-client';

export const metadata: Metadata = {
  title: 'Wishlist',
  description: 'Your saved products at BestDeal3Z.',
};

export default function WishlistPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
        eyebrow="Saved for later"
        title="Your wishlist"
        subtitle="All the products you love, ready when you are."
      />
      <WishlistClient />
    </>
  );
}
