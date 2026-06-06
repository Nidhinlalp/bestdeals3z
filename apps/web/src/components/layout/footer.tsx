import Link from 'next/link';
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { categories, siteConfig, trustBadges } from '@/data';
import { getIcon } from '@/lib/icon-map';
import { Logo } from '@/components/ui/logo';
import { socialIconMap } from '@/components/ui/social-icons';
import { NewsletterForm } from './newsletter-form';

const footerNav = {
  Shop: [
    { label: 'All products', href: '/shop' },
    { label: "Today's deals", href: '/deals' },
    { label: 'New arrivals', href: '/shop?sort=newest' },
    { label: 'Bestsellers', href: '/shop' },
    { label: 'Wishlist', href: '/wishlist' },
  ],
  Company: [
    { label: 'About us', href: '/about' },
    { label: 'Our brand', href: '/brand' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQ', href: '/faq' },
  ],
  Support: [
    { label: 'Shipping policy', href: '/policies/shipping' },
    { label: 'Returns & exchange', href: '/policies/returns' },
    { label: 'Privacy policy', href: '/policies/privacy' },
    { label: 'Terms & conditions', href: '/policies/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-hairline bg-surface-soft pb-safe-footer mt-10 border-t">
      {/* Trust strip */}
      <div className="border-hairline border-b">
        <div className="container-page grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
          {trustBadges.map((b) => {
            const Icon = getIcon(b.icon);
            return (
              <div key={b.title} className="flex items-center gap-3">
                <span className="bg-primary-tint text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-title-sm text-ink">{b.title}</p>
                  <p className="text-caption-sm text-muted">{b.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main footer */}
      <div className="container-page grid grid-cols-2 gap-x-6 gap-y-10 py-12 md:grid-cols-12">
        {/* Brand + newsletter */}
        <div className="col-span-2 md:col-span-4">
          <Logo />
          <p className="text-body-sm text-muted mt-4 max-w-xs">{siteConfig.description}</p>
          <p className="text-caption text-ink mt-5">Get fresh drops & deals</p>
          <div className="mt-2 max-w-sm">
            <NewsletterForm />
          </div>
          <div className="mt-5 flex gap-2">
            {siteConfig.socials.map((s) => {
              const Icon = socialIconMap[s.name];
              return (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="press border-hairline bg-canvas text-ink hover:border-ink hover:bg-ink flex h-10 w-10 items-center justify-center rounded-full border transition-colors hover:text-white"
                >
                  {Icon ? <Icon className="h-4.5 w-4.5" /> : s.name[0]}
                </a>
              );
            })}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerNav).map(([title, links]) => (
          <div key={title} className="md:col-span-2">
            <h3 className="text-title-sm text-ink">{title}</h3>
            <ul className="mt-3 flex flex-col gap-2.5">
              {links.map((l) => (
                <li key={l.href + l.label}>
                  <Link
                    href={l.href}
                    className="text-body-sm text-muted hover:text-ink transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact */}
        <div className="col-span-2 md:col-span-2">
          <h3 className="text-title-sm text-ink">Get in touch</h3>
          <ul className="text-body-sm text-muted mt-3 flex flex-col gap-2.5">
            <li className="flex items-start gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" /> {siteConfig.phone}
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" /> {siteConfig.email}
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {siteConfig.address}
            </li>
            <li>
              <a
                href="/contact"
                className="mt-1 inline-flex items-center gap-1.5 font-semibold text-[#1a9c4d]"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Categories quick links */}
      <div className="border-hairline border-t">
        <div className="container-page text-caption-sm text-muted flex flex-wrap items-center gap-x-4 gap-y-2 py-5">
          <span className="text-ink font-semibold">Popular:</span>
          {categories.map((c) => (
            <Link key={c.slug} href={`/categories/${c.slug}`} className="hover:text-ink">
              {c.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Legal band */}
      <div className="border-hairline border-t">
        <div className="container-page text-caption-sm text-muted flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p>© 2026 {siteConfig.name}. All rights reserved. Mock storefront for design review.</p>
          <div className="flex items-center gap-3">
            <span className="border-hairline bg-canvas text-ink rounded-md border px-2 py-1 font-semibold">
              UPI
            </span>
            <span className="border-hairline bg-canvas text-ink rounded-md border px-2 py-1 font-semibold">
              Cards
            </span>
            <span className="border-hairline bg-canvas text-ink rounded-md border px-2 py-1 font-semibold">
              COD
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
