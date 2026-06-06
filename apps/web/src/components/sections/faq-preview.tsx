import { MessageCircle } from 'lucide-react';
import { faqs, siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Accordion } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

export function FaqPreview() {
  const items = faqs.slice(0, 5).map((f) => ({ id: f.id, title: f.question, content: f.answer }));
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <span className="text-uppercase-tag text-primary">Got questions?</span>
          <h2 className="text-display-2xl text-ink mt-2">Answers, fast.</h2>
          <p className="text-body-md text-muted mt-3">
            Everything about ordering, shipping and returns. Still stuck? Our team replies in
            minutes on WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/faq" variant="secondary">
              View all FAQs
            </Button>
            <Button
              href={waHref(`Hi ${siteConfig.name}! I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Ask on WhatsApp
            </Button>
          </div>
        </div>
        <Accordion items={items} defaultOpenId={items[0]?.id} />
      </div>
    </section>
  );
}
