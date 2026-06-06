import { Gift } from 'lucide-react';
import { NewsletterForm } from '@/components/layout/newsletter-form';

export function NewsletterSection() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="bg-gradient-ink relative overflow-hidden rounded-2xl px-6 py-12 sm:px-12">
        <div className="bg-primary/30 pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="text-caption inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 font-semibold text-white">
              <Gift className="text-primary h-4 w-4" /> Join the club
            </span>
            <h2 className="text-display-2xl mt-4 text-white">Get 10% off your first order</h2>
            <p className="text-body-md mt-2 max-w-md text-white/70">
              Subscribe for early access to drops, members-only flash deals, and a welcome treat.
            </p>
          </div>
          <div className="lg:w-full lg:max-w-md lg:justify-self-end">
            <NewsletterForm variant="dark" />
            <p className="text-caption-sm mt-3 text-white/50">
              No spam, ever. Unsubscribe anytime in one tap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
