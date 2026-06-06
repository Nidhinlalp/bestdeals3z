'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ArrowRight, MessageCircle, RotateCcw, Search, Sparkles, Truck } from 'lucide-react';
import { useState } from 'react';
import { categories, getBestsellers, getFeatured, getTrending } from '@/data';
import type { Product } from '@/data/types';
import { cn, formatPrice } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};
const word = {
  hidden: { opacity: 0, y: '0.5em', rotateX: -40 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease } },
};

const headline = ['Shop', 'the', 'future', 'of', 'everyday.'];
const gradientWord = 2;

export function Hero() {
  const router = useRouter();
  const [q, setQ] = useState('');

  // De-duplicated pool for the marquee
  const pool = Array.from(
    new Map(
      [...getFeatured(), ...getTrending(), ...getBestsellers()].map((p) => [p.slug, p])
    ).values()
  );
  const row1 = pool.slice(0, 7);
  const row2 = (pool.length >= 12 ? pool.slice(7, 14) : [...pool].reverse()).slice(0, 7);

  return (
    <section className="bg-canvas text-ink relative overflow-hidden">
      {/* Soft, airy brand wash (light — no dark mode per design system) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-float bg-primary/10 absolute left-0 top-0 h-72 w-72 -translate-x-1/2 -translate-y-1/3 rounded-full blur-[90px] sm:h-96 sm:w-96" />
        <div className="animate-float-slow bg-plus/8 absolute right-0 top-10 h-72 w-72 translate-x-1/2 rounded-full blur-[90px] sm:h-96 sm:w-96" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,56,92,0.06),transparent)]" />
        {/* faint hairline dot grid for subtle texture */}
        <div className="absolute inset-0 opacity-[0.5] [background-image:radial-gradient(circle,rgba(34,34,34,0.05)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(70%_55%_at_50%_20%,black,transparent)]" />
      </div>

      {/* Copy */}
      <div className="container-page relative">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl pt-12 text-center sm:pt-16 lg:pt-20"
        >
          <motion.span
            variants={item}
            className="border-hairline bg-canvas text-caption text-ink inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-semibold shadow-[var(--shadow-card)]"
          >
            <Sparkles className="text-primary h-4 w-4" />
            New season drops — up to 45% off
          </motion.span>

          <motion.h1 variants={container} className="text-hero text-ink mt-5 [perspective:800px]">
            {headline.map((w, i) => (
              <motion.span
                key={w + i}
                variants={word}
                className={cn(
                  'mr-[0.22em] inline-block',
                  i === gradientWord && 'text-gradient-brand'
                )}
              >
                {w}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            variants={item}
            className="text-body-md text-muted mx-auto mt-5 max-w-xl sm:text-lg"
          >
            Gadgets, electronics, home, toys & lifestyle — curated, fairly priced, and delivered
            fast. Discover it here, order it in seconds on WhatsApp.
          </motion.p>

          {/* Search — design-system pill + Rausch button */}
          <motion.form
            variants={item}
            onSubmit={(e) => {
              e.preventDefault();
              router.push(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/shop');
            }}
            className="border-hairline bg-canvas focus-within:border-ink mx-auto mt-7 flex max-w-xl items-center gap-2 rounded-full border p-1.5 pl-5 shadow-[var(--shadow-card)]"
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
              aria-label="Search"
              className="press bg-primary text-button-md hover:bg-primary-active flex h-11 items-center gap-1.5 rounded-full px-5 font-semibold text-white transition-colors"
            >
              <span className="hidden sm:inline">Search</span>
              <ArrowRight className="h-4.5 w-4.5 sm:hidden" />
            </button>
          </motion.form>

          {/* Category chips */}
          <motion.div
            variants={item}
            className="no-scrollbar -mx-4 mt-5 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0"
          >
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/categories/${c.slug}`}
                className="press border-hairline bg-canvas text-button-sm text-ink hover:border-ink hover:bg-surface-soft shrink-0 rounded-full border px-4 py-2 transition-colors"
              >
                {c.name}
              </Link>
            ))}
          </motion.div>

          {/* Trust row */}
          <motion.ul
            variants={item}
            className="text-caption text-muted mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2"
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
        </motion.div>
      </div>

      {/* Product marquee — photography-led, on white */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        className="relative mt-10 space-y-3 pb-12 sm:mt-14 sm:space-y-4 sm:pb-16"
      >
        <MarqueeRow items={row1} duration={42} priority />
        <MarqueeRow items={row2} duration={34} reverse />
        {/* edge fades to canvas */}
        <div className="from-canvas pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r to-transparent sm:w-28" />
        <div className="from-canvas pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l to-transparent sm:w-28" />
      </motion.div>
    </section>
  );
}

function MarqueeRow({
  items,
  duration,
  reverse = false,
  priority = false,
}: {
  items: Product[];
  duration: number;
  reverse?: boolean;
  priority?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="group flex overflow-hidden">
      <div
        className={cn(
          'animate-marquee flex w-max gap-3 pr-3 group-hover:[animation-play-state:paused] sm:gap-4 sm:pr-4',
          reverse && '[animation-direction:reverse]'
        )}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((p, i) => (
          <Link
            key={`${p.slug}-${i}`}
            href={`/product/${p.slug}`}
            aria-label={p.name}
            className="group/card border-hairline bg-canvas w-32 shrink-0 overflow-hidden rounded-md border transition-shadow hover:shadow-[var(--shadow-card)] sm:w-44"
          >
            <div className="bg-surface-soft relative aspect-square w-full overflow-hidden">
              <Image
                src={p.images[0]}
                alt={p.name}
                fill
                sizes="(max-width:744px) 128px, 176px"
                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                priority={priority && i < 4}
              />
            </div>
            <div className="p-2.5">
              <p className="text-caption text-ink line-clamp-1 font-semibold">{p.name}</p>
              <p className="text-caption-sm text-ink font-bold">{formatPrice(p.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
