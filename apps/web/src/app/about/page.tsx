import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { brand, categories, siteConfig, stats, trustBadges } from '@/data';
import { getIcon } from '@/lib/icon-map';
import { img } from '@/lib/utils';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/ui/reveal';
import { SectionHeader } from '@/components/ui/section-header';
import { CtaBand } from '@/components/sections/cta-band';

export const metadata: Metadata = {
  title: 'About us',
  description: `The story behind ${siteConfig.name} — fast, futuristic, customer-obsessed retail.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-primary/15 absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl" />
          <div className="bg-plus/10 absolute right-0 top-20 h-80 w-80 rounded-full blur-3xl" />
        </div>
        <div className="container-page py-12 sm:py-20">
          <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <div className="mt-6 max-w-3xl">
            <span className="text-uppercase-tag text-primary">Our story</span>
            <h1 className="text-hero text-ink mt-3">
              Shopping, <span className="text-gradient-brand">reimagined</span> for a new
              generation.
            </h1>
            <p className="text-body-md text-muted mt-5 max-w-2xl sm:text-lg">{brand.mission}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/shop" variant="dark" size="md">
                Shop the store
                <ArrowRight className="h-4.5 w-4.5" />
              </Button>
              <Button href="/contact" variant="ghost" size="md" className="border-hairline border">
                Get in touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Story + images */}
      <section className="container-page py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                <Image
                  src={img('about-1', 600, 800)}
                  alt="Our products"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              </div>
              <div className="mt-8 grid gap-4">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={img('about-2', 600, 600)}
                    alt="Our team"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src={img('about-3', 600, 600)}
                    alt="Packaging"
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="text-uppercase-tag text-primary">How it started</span>
              <h2 className="text-display-2xl text-ink mt-2">
                Built to make buying feel good again
              </h2>
              <div className="text-body-md text-body mt-5 space-y-4">
                {brand.story.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="container-page py-6 sm:py-10">
        <div className="bg-gradient-ink grid grid-cols-2 gap-4 rounded-2xl p-6 text-white sm:p-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="text-display-2xl font-extrabold">
                <AnimatedCounter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </span>
              <span className="text-caption mt-1 block text-white/60">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-page py-12 sm:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <span className="text-uppercase-tag text-primary">Why shop with us</span>
            <h2 className="text-display-2xl text-ink mt-2">
              Everything you&apos;d want, none of the friction
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {brand.whyChooseUs.map((w, i) => (
                <Reveal as="li" key={w} delay={(i % 2) * 0.05}>
                  <span className="text-body-md text-body flex items-start gap-2.5">
                    <span className="bg-primary mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    {w}
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src={img('about-why', 900, 700)}
                alt="Customer support"
                fill
                sizes="(max-width:1024px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quality promise / service highlights */}
      <section className="container-page py-12 sm:py-16">
        <SectionHeader eyebrow="Our promise" title="Service you can count on" align="center" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {trustBadges.map((b, i) => {
            const Icon = getIcon(b.icon);
            return (
              <Reveal key={b.title} delay={(i % 4) * 0.05}>
                <div className="border-hairline flex h-full flex-col items-center rounded-2xl border p-6 text-center transition-shadow hover:shadow-[var(--shadow-card)]">
                  <span className="bg-primary-tint text-primary flex h-14 w-14 items-center justify-center rounded-full">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h3 className="text-title-md text-ink mt-4">{b.title}</h3>
                  <p className="text-body-sm text-muted mt-1">{b.subtitle}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Category coverage */}
      <section className="container-page py-12 sm:py-16">
        <SectionHeader
          eyebrow="What we sell"
          title="Coverage across every category"
          subtitle="From the latest tech to everyday essentials."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {categories.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="press border-hairline bg-canvas text-button-sm text-ink hover:border-ink hover:bg-surface-soft rounded-full border px-5 py-2.5 transition-colors"
            >
              {c.name} <span className="text-muted">· {c.productCount}</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
