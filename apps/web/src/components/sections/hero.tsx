'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageCircle, RotateCcw, Search, Sparkles, Truck } from 'lucide-react';
import { useState } from 'react';
import { getFeatured } from '@/data';
import { Button } from '@/components/ui/button';

const ease = [0.22, 1, 0.36, 1] as const;
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.08, ease } }),
};

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState('');
  const featured = getFeatured().slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      {/* Background mesh + blob */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/15 absolute -left-24 -top-24 h-96 w-96 rounded-full blur-3xl" />
        <div className="bg-plus/10 absolute -right-16 top-32 h-80 w-80 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,56,92,0.06),transparent)]" />
      </div>

      <div className="container-page grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
        {/* Copy */}
        <div className="max-w-xl">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="border-hairline bg-canvas text-caption text-ink inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-semibold shadow-[var(--shadow-card)]"
          >
            <Sparkles className="text-primary h-4 w-4" />
            New season drops — up to 45% off
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-hero text-ink mt-5"
          >
            Shop the <span className="text-gradient-brand">future</span> of everyday.
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-body-md text-muted mt-5 sm:text-lg"
          >
            Gadgets, electronics, home, toys & lifestyle — curated, fairly priced, and delivered
            fast. Discover it here, order it in seconds on WhatsApp.
          </motion.p>

          {/* Search */}
          <motion.form
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            onSubmit={(e) => {
              e.preventDefault();
              router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/shop');
            }}
            className="border-hairline bg-canvas focus-within:border-ink mt-7 flex items-center gap-2 rounded-full border p-1.5 pl-5 shadow-[var(--shadow-card)]"
          >
            <Search className="text-muted h-5 w-5 shrink-0" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search gadgets, audio, home…"
              className="text-body-md text-ink placeholder:text-muted-soft h-11 flex-1 bg-transparent outline-none"
            />
            <button
              type="submit"
              className="press bg-primary text-button-md hover:bg-primary-active flex h-11 items-center gap-1.5 rounded-full px-5 font-semibold text-white transition-colors"
            >
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="h-4.5 w-4.5 sm:hidden" />
            </button>
          </motion.form>

          {/* CTAs */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="mt-5 flex flex-wrap items-center gap-3"
          >
            <Button href="/shop" variant="dark" size="md">
              Shop all products
              <ArrowRight className="h-4.5 w-4.5" />
            </Button>
            <Button href="/deals" variant="ghost" size="md" className="border-hairline border">
              🔥 Today&apos;s deals
            </Button>
          </motion.div>

          {/* Trust pills */}
          <motion.ul
            custom={5}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-caption text-muted mt-7 flex flex-wrap gap-x-5 gap-y-2"
          >
            <li className="flex items-center gap-1.5">
              <Truck className="text-primary h-4 w-4" /> Free shipping over ₹999
            </li>
            <li className="flex items-center gap-1.5">
              <RotateCcw className="text-primary h-4 w-4" /> 7-day returns
            </li>
            <li className="flex items-center gap-1.5">
              <MessageCircle className="text-primary h-4 w-4" /> WhatsApp ordering
            </li>
          </motion.ul>
        </div>

        {/* Visual collage */}
        <div className="relative hidden h-[460px] lg:block">
          <div className="animate-blob bg-gradient-brand absolute right-6 top-1/2 h-80 w-80 -translate-y-1/2 opacity-90" />
          <FloatCard
            product={featured[0]}
            className="left-2 top-6 w-56 rotate-[-6deg]"
            delay={0}
            priority
          />
          <FloatCard
            product={featured[1]}
            className="right-2 top-24 w-52 rotate-[5deg]"
            delay={1.4}
          />
          <FloatCard
            product={featured[2]}
            className="bottom-2 left-24 w-52 rotate-[3deg]"
            delay={0.7}
          />
        </div>

        {/* Mobile visual */}
        <div className="relative h-56 overflow-hidden rounded-xl lg:hidden">
          <Image
            src={featured[0]?.images[0] ?? ''}
            alt={featured[0]?.name ?? 'Featured product'}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-uppercase-tag opacity-80">Featured</p>
            <p className="text-display-sm">{featured[0]?.name}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatCard({
  product,
  className,
  delay,
  priority,
}: {
  product?: { name: string; images: string[]; categoryName: string };
  className?: string;
  delay: number;
  priority?: boolean;
}) {
  if (!product) return null;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 + delay * 0.2, ease }}
      className={`absolute ${className}`}
    >
      <div
        className="animate-float bg-canvas overflow-hidden rounded-xl p-2 shadow-[var(--shadow-float)]"
        style={{ animationDelay: `${delay}s` }}
      >
        <div className="bg-surface-soft relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="240px"
            className="object-cover"
            priority={priority}
          />
        </div>
        <div className="px-2 py-2">
          <p className="text-uppercase-tag text-muted">{product.categoryName}</p>
          <p className="text-title-sm text-ink line-clamp-1">{product.name}</p>
        </div>
      </div>
    </motion.div>
  );
}
