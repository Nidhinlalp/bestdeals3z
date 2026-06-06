'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function ProductGallery({
  images,
  alt,
  layout = 'detail',
}: {
  images: string[];
  alt: string;
  layout?: 'detail' | 'compact';
}) {
  const [active, setActive] = useState(0);

  return (
    <div
      className={cn(
        layout === 'detail' ? 'flex flex-col-reverse gap-3 sm:flex-row' : 'flex flex-col gap-3'
      )}
    >
      {/* Thumbnails */}
      <div
        className={cn(
          'no-scrollbar flex gap-3',
          layout === 'detail'
            ? 'flex-row overflow-x-auto sm:flex-col sm:overflow-visible'
            : 'flex-row overflow-x-auto'
        )}
      >
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`View image ${i + 1}`}
            className={cn(
              'relative h-16 w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all',
              active === i ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'
            )}
          >
            <Image src={src} alt="" fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="bg-surface-soft group relative aspect-square flex-1 overflow-hidden rounded-lg">
        <Image
          key={images[active]}
          src={images[active]}
          alt={alt}
          fill
          sizes="(max-width: 744px) 100vw, 50vw"
          className="zoom-img animate-fade-up object-cover"
          priority
        />
      </div>
    </div>
  );
}
