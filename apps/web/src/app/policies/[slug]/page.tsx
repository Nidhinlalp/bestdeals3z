import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronRight, MessageCircle } from 'lucide-react';
import { policies, siteConfig } from '@/data';
import { waHref } from '@/lib/whatsapp';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';

type PolicyKey = keyof typeof policies;

const nav: { slug: PolicyKey; label: string }[] = [
  { slug: 'privacy', label: 'Privacy Policy' },
  { slug: 'terms', label: 'Terms & Conditions' },
  { slug: 'shipping', label: 'Shipping Policy' },
  { slug: 'returns', label: 'Return & Exchange' },
];

export function generateStaticParams() {
  return nav.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const policy = policies[slug as PolicyKey];
  if (!policy) return { title: 'Policy not found' };
  return { title: policy.title, description: policy.intro };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = policies[slug as PolicyKey];
  if (!policy) notFound();

  return (
    <div className="container-page py-6 sm:py-10">
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Policies' }, { label: policy.title }]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[260px_1fr] lg:gap-16">
        {/* Sidebar nav */}
        <aside className="lg:sticky lg:top-44 lg:self-start">
          <p className="text-uppercase-tag text-muted">Legal</p>
          <nav className="mt-3 flex flex-col gap-1">
            {nav.map((n) => {
              const active = n.slug === slug;
              return (
                <Link
                  key={n.slug}
                  href={`/policies/${n.slug}`}
                  className={`text-body-sm flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors ${
                    active
                      ? 'bg-primary-tint text-primary font-semibold'
                      : 'text-body hover:bg-surface-soft'
                  }`}
                >
                  {n.label}
                  {active && <ChevronRight className="h-4 w-4" />}
                </Link>
              );
            })}
          </nav>
          <div className="border-hairline mt-6 rounded-xl border p-4">
            <p className="text-title-sm text-ink">Need clarity?</p>
            <p className="text-caption-sm text-muted mt-1">We&apos;re happy to explain anything.</p>
            <Button
              href={waHref(
                `Hi ${siteConfig.name}! I have a question about your ${policy.title.toLowerCase()}.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              variant="whatsapp"
              size="sm"
              fullWidth
              className="mt-3"
            >
              <MessageCircle className="h-4 w-4" /> Ask us
            </Button>
          </div>
        </aside>

        {/* Content */}
        <article className="max-w-2xl">
          <h1 className="text-display-2xl text-ink">{policy.title}</h1>
          <p className="text-caption text-muted mt-2">{policy.updated}</p>
          <p className="text-body-md text-body mt-5">{policy.intro}</p>

          <div className="mt-8 space-y-8">
            {policy.sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="text-display-sm text-ink">
                  {i + 1}. {s.heading}
                </h2>
                <p className="text-body-md text-body mt-2 leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="bg-surface-soft text-caption-sm text-muted mt-10 rounded-xl p-5">
            This is mock policy content created for design review only and does not constitute a
            binding legal agreement.
          </div>
        </article>
      </div>
    </div>
  );
}
