import { ArrowRight, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';

export function CtaBand({
  title = 'Ready to find your next favourite?',
  subtitle = 'Thousands of curated products, futuristic shopping, and the fastest checkout in retail.',
}: {
  title?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="bg-gradient-brand-deep relative overflow-hidden rounded-2xl px-6 py-12 text-center text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-52 w-52 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-2xl">
          <h2 className="text-display-2xl">{title}</h2>
          <p className="text-body-md mx-auto mt-3 max-w-xl text-white/80">{subtitle}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/shop" size="lg" className="text-ink bg-white hover:bg-white/90">
              Shop all products
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              href={waHref(`Hi ${siteConfig.name}! I'd like to know more.`)}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              className="bg-[#25D366] text-white hover:bg-[#1ebe5a]"
            >
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
