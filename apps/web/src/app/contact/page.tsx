import type { Metadata } from 'next';
import { Clock, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/sections/page-header';
import { ContactForm } from '@/components/sections/contact-form';
import { socialIconMap } from '@/components/ui/social-icons';

export const metadata: Metadata = {
  title: 'Contact us',
  description: `Get in touch with the ${siteConfig.name} team — by form, phone, email or WhatsApp.`,
};

const contactCards = [
  {
    icon: Phone,
    label: 'Call us',
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, '')}`,
  },
  { icon: Mail, label: 'Email us', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        eyebrow="We’d love to hear from you"
        title="Get in touch"
        subtitle="Questions, feedback or order help — reach us however you like. We reply fast."
      />

      <div className="container-page grid gap-8 py-8 sm:py-10 lg:grid-cols-[1.2fr_0.8fr]">
        {/* Form */}
        <ContactForm />

        {/* Info */}
        <div className="flex flex-col gap-4">
          {/* WhatsApp highlight */}
          <div className="rounded-2xl bg-gradient-to-br from-[#25D366] to-[#1ba94f] p-6 text-white">
            <MessageCircle className="h-8 w-8" />
            <h3 className="text-display-sm mt-3">Chat on WhatsApp</h3>
            <p className="text-body-sm mt-1 text-white/85">
              The fastest way to reach us — order help, product questions, anything.
            </p>
            <Button
              href={waHref(`Hi ${siteConfig.name}! I have a question.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink mt-4 bg-white hover:bg-white/90"
            >
              Start a chat
            </Button>
          </div>

          {/* Quick contacts */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {contactCards.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="border-hairline hover:border-ink flex items-center gap-3 rounded-xl border p-4 transition-colors"
              >
                <span className="bg-primary-tint text-primary flex h-11 w-11 items-center justify-center rounded-full">
                  <c.icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="text-caption text-muted block">{c.label}</span>
                  <span className="text-title-sm text-ink block">{c.value}</span>
                </span>
              </a>
            ))}
          </div>

          {/* Hours */}
          <div className="border-hairline flex items-center gap-3 rounded-xl border p-4">
            <span className="bg-primary-tint text-primary flex h-11 w-11 items-center justify-center rounded-full">
              <Clock className="h-5 w-5" />
            </span>
            <span>
              <span className="text-caption text-muted block">Working hours</span>
              <span className="text-title-sm text-ink block">{siteConfig.hours}</span>
            </span>
          </div>

          {/* Location placeholder */}
          <div className="border-hairline overflow-hidden rounded-xl border">
            <div className="relative flex h-40 items-center justify-center bg-[linear-gradient(135deg,#f2f2f2_25%,transparent_25%),linear-gradient(225deg,#f2f2f2_25%,transparent_25%),linear-gradient(45deg,#f2f2f2_25%,transparent_25%),linear-gradient(315deg,#f2f2f2_25%,#fff_25%)] [background-position:10px_0,10px_0,0_0,0_0] [background-size:20px_20px]">
              <span className="text-muted flex flex-col items-center">
                <MapPin className="text-primary h-7 w-7" />
                <span className="text-caption mt-1">Map preview</span>
              </span>
            </div>
            <div className="flex items-start gap-3 p-4">
              <MapPin className="text-primary mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-body-sm text-body">{siteConfig.address}</p>
            </div>
          </div>

          {/* Socials */}
          <div className="border-hairline rounded-xl border p-4">
            <p className="text-caption text-muted">Follow us</p>
            <div className="mt-2 flex gap-2">
              {siteConfig.socials.map((s) => {
                const Icon = socialIconMap[s.name];
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    aria-label={s.name}
                    className="press border-hairline text-ink hover:border-ink hover:bg-ink flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
                  >
                    {Icon ? <Icon className="h-4.5 w-4.5" /> : s.name[0]}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
