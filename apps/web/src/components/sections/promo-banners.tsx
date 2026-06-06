import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { promoBanners } from '@/data';
import { cn } from '@/lib/utils';
import { Reveal } from '@/components/ui/reveal';

export function PromoBanners() {
  const [feature, ...rest] = promoBanners;
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Feature banner */}
        <Reveal className="lg:col-span-2">
          <Banner banner={feature} large />
        </Reveal>
        <div className="grid gap-4">
          {rest.map((b, i) => (
            <Reveal key={b.id} delay={(i + 1) * 0.06}>
              <Banner banner={b} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Banner({
  banner,
  large = false,
}: {
  banner: (typeof promoBanners)[number];
  large?: boolean;
}) {
  const dark = banner.theme !== 'light';
  return (
    <Link
      href={banner.href}
      className={cn(
        'group relative flex flex-col justify-end overflow-hidden rounded-2xl p-6 sm:p-8',
        large ? 'min-h-72 lg:min-h-[26rem]' : 'min-h-44'
      )}
    >
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        sizes={large ? '(max-width:1024px) 100vw, 66vw' : '(max-width:1024px) 100vw, 33vw'}
        className="zoom-img object-cover"
      />
      <div
        className={cn(
          'absolute inset-0',
          banner.theme === 'brand'
            ? 'from-primary/85 via-plus/55 bg-gradient-to-tr to-transparent'
            : dark
              ? 'bg-gradient-to-t from-black/80 via-black/30 to-transparent'
              : 'bg-gradient-to-t from-white/90 via-white/40 to-transparent'
        )}
      />
      <div className={cn('relative max-w-md', dark ? 'text-white' : 'text-ink')}>
        <span className={cn('text-uppercase-tag', dark ? 'text-white/80' : 'text-primary')}>
          {banner.eyebrow}
        </span>
        <h3 className={cn('mt-2', large ? 'text-display-2xl' : 'text-display-sm')}>
          {banner.title}
        </h3>
        <p className={cn('text-body-sm mt-1', dark ? 'text-white/75' : 'text-muted')}>
          {banner.subtitle}
        </p>
        <span
          className={cn(
            'text-button-sm mt-4 inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-semibold transition-transform group-hover:gap-2.5',
            dark ? 'text-ink bg-white' : 'bg-ink text-white'
          )}
        >
          {banner.cta}
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}
