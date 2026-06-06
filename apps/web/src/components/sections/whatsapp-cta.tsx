import { MessageCircle, MousePointerClick, PackageCheck, Send } from 'lucide-react';
import { siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';

const steps = [
  {
    icon: MousePointerClick,
    title: 'Pick your products',
    text: 'Add what you love to your cart — no account needed.',
  },
  {
    icon: Send,
    title: 'Send on WhatsApp',
    text: 'Your cart becomes a ready-to-send message. Just hit send.',
  },
  {
    icon: PackageCheck,
    title: 'Confirm & relax',
    text: 'We confirm, you pay your way, and it ships in 48 hours.',
  },
];

export function WhatsAppCta() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="bg-gradient-brand-deep relative overflow-hidden rounded-2xl px-6 py-12 text-white sm:px-12 sm:py-16">
        <div className="pointer-events-none absolute -right-10 -top-10 h-60 w-60 rounded-full bg-white/10 blur-2xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <span className="text-caption inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 font-semibold">
            <MessageCircle className="h-4 w-4" /> The fastest checkout in retail
          </span>
          <h2 className="text-display-2xl mt-4">Order in seconds on WhatsApp</h2>
          <p className="text-body-md mx-auto mt-3 max-w-xl text-white/80">
            No long forms, no friction. Shop the site, then place your order with a single message —
            and get real human help every step of the way.
          </p>
        </div>

        <div className="relative mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="flex h-full flex-col items-center rounded-xl bg-white/10 p-6 text-center backdrop-blur-sm">
                <span className="text-primary flex h-12 w-12 items-center justify-center rounded-full bg-white">
                  <s.icon className="h-6 w-6" />
                </span>
                <p className="text-title-md mt-4">
                  {i + 1}. {s.title}
                </p>
                <p className="text-body-sm mt-1 text-white/75">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="relative mt-10 flex justify-center">
          <Button
            href={waHref(`Hi ${siteConfig.name}! I'd like to place an order.`)}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="text-ink bg-white hover:bg-white/90"
          >
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            Start your order on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
