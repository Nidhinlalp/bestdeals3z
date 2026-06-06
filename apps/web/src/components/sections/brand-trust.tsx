import { brand, stats } from '@/data';
import { getIcon } from '@/lib/icon-map';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { Reveal } from '@/components/ui/reveal';

export function BrandTrust() {
  return (
    <section className="container-page py-14 sm:py-20">
      <div className="border-hairline bg-surface-soft overflow-hidden rounded-2xl border">
        {/* Stats */}
        <div className="divide-hairline border-hairline grid grid-cols-2 divide-x divide-y border-b md:grid-cols-4 md:divide-y-0">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-col items-center justify-center px-4 py-8 text-center"
            >
              <span className="text-display-2xl text-ink font-extrabold">
                <AnimatedCounter value={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </span>
              <span className="text-caption text-muted mt-1">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Value props */}
        <div className="grid gap-6 p-6 sm:grid-cols-2 sm:p-10 lg:grid-cols-4">
          {brand.values.map((v, i) => {
            const Icon = getIcon(v.icon);
            return (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="flex flex-col gap-3">
                  <span className="bg-primary-tint text-primary flex h-12 w-12 items-center justify-center rounded-xl">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-title-md text-ink">{v.title}</h3>
                  <p className="text-body-sm text-muted">{v.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
