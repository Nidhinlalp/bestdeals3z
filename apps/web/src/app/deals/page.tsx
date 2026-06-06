import type { Metadata } from 'next';
import { Flame, Zap } from 'lucide-react';
import { getFlashSale, offers, products } from '@/data';
import { discountPercent } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { ProductGrid } from '@/components/product/product-grid';
import { Countdown } from '@/components/sections/countdown';
import { OfferCard } from '@/components/sections/offer-card';
import { PromoBanners } from '@/components/sections/promo-banners';

export const metadata: Metadata = {
  title: 'Deals & offers',
  description: 'Limited-time deals, flash sales and exclusive promo codes at BestDeal3Z.',
};

export default function DealsPage() {
  const flash = getFlashSale();
  const topDeals = [...products]
    .filter((p) => p.mrp > p.price)
    .sort((a, b) => discountPercent(b.mrp, b.price) - discountPercent(a.mrp, a.price))
    .slice(0, 12);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-brand-deep relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute bottom-0 right-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="container-page relative py-12 sm:py-16">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Deals' }]} />
          <div className="mt-5 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-caption inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-semibold backdrop-blur">
                <Flame className="h-4 w-4" /> Hot right now
              </span>
              <h1 className="text-hero mt-4">Deals & offers</h1>
              <p className="text-body-md mt-3 max-w-xl text-white/80">
                Limited-time prices, exclusive codes and flash drops. Move fast — they don&apos;t
                last long.
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
              <p className="text-caption font-semibold text-white/70">
                Today&apos;s flash sale ends in
              </p>
              <Countdown hours={11} variant="dark" className="mt-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Offer codes */}
      <section className="container-page py-12 sm:py-16">
        <SectionHeader
          eyebrow="Save more"
          title="Promo codes & offers"
          subtitle="Apply at checkout or share on WhatsApp."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((o, i) => (
            <Reveal key={o.id} delay={(i % 4) * 0.05}>
              <OfferCard offer={o} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Flash sale grid */}
      {flash.length > 0 && (
        <section className="container-page py-6 sm:py-10">
          <div className="border-hairline bg-surface-soft rounded-2xl border p-6 sm:p-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="bg-primary text-caption inline-flex items-center gap-2 rounded-full px-3 py-1 font-semibold text-white">
                  <Zap className="h-4 w-4 fill-white" /> Flash sale
                </span>
                <h2 className="text-display-2xl text-ink mt-3">Lightning deals</h2>
              </div>
              <Countdown hours={5} variant="light" />
            </div>
            <div className="mt-8">
              <ProductGrid products={flash} priorityCount={4} />
            </div>
          </div>
        </section>
      )}

      {/* Promo banners */}
      <PromoBanners />

      {/* All deals */}
      <section className="container-page py-6 sm:py-12">
        <SectionHeader
          eyebrow="Biggest savings"
          title="Top deals right now"
          subtitle="The steepest discounts across the store."
          action={{ label: 'Shop all', href: '/shop' }}
        />
        <div className="mt-8">
          <ProductGrid products={topDeals} priorityCount={4} />
        </div>
      </section>
    </>
  );
}
