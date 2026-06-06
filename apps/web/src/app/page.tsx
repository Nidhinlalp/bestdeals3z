import { getBestsellers, getFeatured, getNewArrivals, getTrending } from '@/data';
import { Hero } from '@/components/sections/hero';
import { CategoryShowcase } from '@/components/sections/category-showcase';
import { ProductRailSection } from '@/components/sections/product-rail-section';
import { FlashSale } from '@/components/sections/flash-sale';
import { PromoBanners } from '@/components/sections/promo-banners';
import { FeaturedCollection } from '@/components/sections/featured-collection';
import { BrandTrust } from '@/components/sections/brand-trust';
import { Testimonials } from '@/components/sections/testimonials';
import { FaqPreview } from '@/components/sections/faq-preview';
import { WhatsAppCta } from '@/components/sections/whatsapp-cta';
import { NewsletterSection } from '@/components/sections/newsletter-section';

export default function HomePage() {
  return (
    <>
      <Hero />

      <CategoryShowcase />

      <ProductRailSection
        eyebrow="Handpicked"
        title="Featured products"
        subtitle="Our team's current favourites across every category."
        products={getFeatured()}
        action={{ label: 'Shop all', href: '/shop' }}
      />

      <FlashSale />

      <ProductRailSection
        eyebrow="Hot right now"
        title="Trending this week"
        subtitle="What everyone's adding to cart."
        products={getTrending()}
        action={{ label: 'View more', href: '/shop' }}
        tinted
      />

      <PromoBanners />

      <ProductRailSection
        eyebrow="Crowd favourites"
        title="Bestsellers"
        subtitle="Tried, tested and loved by thousands."
        products={getBestsellers()}
        action={{ label: 'Shop bestsellers', href: '/shop' }}
      />

      <FeaturedCollection />

      <BrandTrust />

      <ProductRailSection
        eyebrow="Just landed"
        title="New arrivals"
        subtitle="The latest additions to the BestDeal3Z lineup."
        products={getNewArrivals()}
        action={{ label: 'See what’s new', href: '/shop?sort=newest' }}
        tinted
      />

      <Testimonials />

      <WhatsAppCta />

      <FaqPreview />

      <NewsletterSection />
    </>
  );
}
