import { Gift } from 'lucide-react';
import { NewsletterForm } from '@/components/layout/newsletter-form';

export function NewsletterSection() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="bg-primary-tint border-hairline relative overflow-hidden rounded-2xl border px-6 py-12 sm:px-12">
        <div className="bg-primary/15 pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full blur-3xl" />
        <div className="bg-plus/10 pointer-events-none absolute -right-8 -top-10 h-48 w-48 rounded-full blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-2">
          <div>
            <span className="border-hairline bg-canvas text-caption text-ink inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-semibold">
              <Gift className="text-primary h-4 w-4" /> Join the club
            </span>
            <h2 className="text-display-2xl text-ink mt-4">Get 10% off your first order</h2>
            <p className="text-body-md text-muted mt-2 max-w-md">
              Subscribe for early access to drops, members-only flash deals, and a welcome treat.
            </p>
          </div>
          <div className="lg:w-full lg:max-w-md lg:justify-self-end">
            <NewsletterForm />
            <p className="text-caption-sm text-muted mt-3">
              No spam, ever. Unsubscribe anytime in one tap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
