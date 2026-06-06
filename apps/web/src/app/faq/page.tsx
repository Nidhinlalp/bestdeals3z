import type { Metadata } from 'next';
import { MessageCircle } from 'lucide-react';
import { faqs, siteConfig } from '@/data';
import type { Faq } from '@/data/types';
import { waHref } from '@/lib/whatsapp';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/sections/page-header';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about ordering, shipping, products and returns.',
};

const groups: Faq['category'][] = ['Orders', 'WhatsApp', 'Shipping', 'Products', 'Returns'];

export default function FaqPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'FAQ' }]}
        eyebrow="Help centre"
        title="Frequently asked questions"
        subtitle="Everything you need to know about shopping with us. Can't find it? We're a message away."
      />

      <div className="container-page grid gap-10 py-8 sm:py-12 lg:grid-cols-[1fr_320px]">
        {/* Groups */}
        <div className="space-y-10">
          {groups.map((g) => {
            const items = faqs
              .filter((f) => f.category === g)
              .map((f) => ({ id: f.id, title: f.question, content: f.answer }));
            if (!items.length) return null;
            return (
              <div key={g}>
                <h2 className="text-display-sm text-ink mb-2">{g}</h2>
                <Accordion items={items} />
              </div>
            );
          })}
        </div>

        {/* Help card */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <div className="border-hairline bg-surface-soft rounded-2xl border p-6 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white">
              <MessageCircle className="h-7 w-7" />
            </span>
            <h3 className="text-display-sm text-ink mt-4">Still have questions?</h3>
            <p className="text-body-sm text-muted mt-2">
              Our team replies in minutes on WhatsApp — for orders, products and anything else.
            </p>
            <Button
              href={waHref(`Hi ${siteConfig.name}! I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              fullWidth
              className="mt-5"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Ask on WhatsApp
            </Button>
            <Button href="/contact" variant="secondary" fullWidth className="mt-2.5">
              Contact form
            </Button>
          </div>
        </aside>
      </div>
    </>
  );
}
