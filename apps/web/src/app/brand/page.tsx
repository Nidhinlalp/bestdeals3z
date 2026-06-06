import type { Metadata } from 'next';
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { CategoryShowcase } from '@/components/sections/category-showcase';
import { BrandTrust } from '@/components/sections/brand-trust';
import { Testimonials } from '@/components/sections/testimonials';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata: Metadata = {
  title: 'The brand',
  description: `Discover ${siteConfig.name} — a futuristic retail brand for a new generation.`,
};

export default function BrandPage() {
  return (
    <>
      {/* Brand hero */}
      <section className="bg-gradient-ink relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="bg-primary/30 absolute left-1/4 top-0 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-plus/30 absolute bottom-0 right-1/4 h-80 w-80 rounded-full blur-3xl" />
        </div>
        <div className="container-page relative flex flex-col items-center py-20 text-center sm:py-28">
          <span className="text-caption inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-semibold backdrop-blur">
            <Sparkles className="text-primary h-4 w-4" /> A new kind of retail brand
          </span>
          <h1 className="text-hero mt-6 max-w-4xl">
            Fresh. Fast. <span className="text-gradient-brand">Fearlessly modern.</span>
          </h1>
          <p className="text-body-md mt-5 max-w-2xl text-white/70 sm:text-lg">
            {siteConfig.name} brings together the best of gadgets, electronics, home, toys and
            lifestyle — curated with taste, priced with honesty, and delivered at the speed of now.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/shop" size="lg" className="text-ink bg-white hover:bg-white/90">
              Browse products
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={waHref(`Hi ${siteConfig.name}! I'd love to learn more about the brand.`)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Brand identity strip */}
      <section className="container-page py-14 sm:py-20">
        <div className="border-hairline grid items-center gap-10 rounded-2xl border p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col items-start gap-5">
            <Logo />
            <p className="text-display-sm text-ink">“{siteConfig.tagline}”</p>
          </div>
          <div className="text-body-md text-body space-y-4">
            <p>
              We believe shopping should feel effortless and a little bit magical. Every detail —
              from the way a product page animates to the second it lands at your door — is designed
              to delight.
            </p>
            <p>
              No clutter. No gimmicks. No endless forms. Just a beautiful storefront, honest prices,
              and a friendly team a single WhatsApp message away.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {['Futuristic', 'Premium', 'Honest', 'Fast', 'Youthful', 'Trustworthy'].map((t) => (
                <span
                  key={t}
                  className="bg-primary-tint text-button-sm text-primary rounded-full px-3.5 py-1.5 font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CategoryShowcase />
      <BrandTrust />
      <Testimonials />
      <CtaBand
        title="Join the BestDeal3Z movement"
        subtitle="Be part of a smarter, faster, more delightful way to shop."
      />
    </>
  );
}
