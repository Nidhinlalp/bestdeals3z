import Image from 'next/image';
import { Quote } from 'lucide-react';
import { testimonials } from '@/data';
import { Rating } from '@/components/ui/rating';
import { SectionHeader } from '@/components/ui/section-header';
import { Reveal } from '@/components/ui/reveal';

export function Testimonials() {
  return (
    <section className="container-page py-14 sm:py-20">
      <SectionHeader
        eyebrow="Loved by shoppers"
        title="Real people. Real upgrades."
        subtitle="Over 120,000 happy customers and counting across India."
        align="center"
      />

      <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.06}>
            <figure className="border-hairline bg-canvas break-inside-avoid rounded-xl border p-6 transition-shadow hover:shadow-[var(--shadow-card)]">
              <Quote className="text-primary/30 h-7 w-7" />
              <blockquote className="text-body-md text-body mt-3">“{t.quote}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="bg-surface-soft relative h-11 w-11 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill sizes="44px" className="object-cover" />
                </span>
                <div className="min-w-0">
                  <p className="text-title-sm text-ink">{t.name}</p>
                  <p className="text-caption-sm text-muted">{t.location}</p>
                </div>
                <Rating value={t.rating} size={13} className="ml-auto" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
