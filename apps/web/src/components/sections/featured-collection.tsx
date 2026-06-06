import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { collections, getProductsBySlugs } from '@/data';
import { Button } from '@/components/ui/button';
import { ProductRail } from '@/components/product/product-rail';

export function FeaturedCollection() {
  const collection = collections[0];
  const products = getProductsBySlugs(collection.productSlugs);

  return (
    <section className="container-page py-14 sm:py-20">
      <div className="grid gap-6 lg:grid-cols-[0.85fr_2fr] lg:items-stretch lg:gap-8">
        {/* Collection cover */}
        <div className="group relative min-h-64 overflow-hidden rounded-2xl p-7">
          <Image
            src={collection.image}
            alt={collection.title}
            fill
            sizes="(max-width:1024px) 100vw, 33vw"
            className="zoom-img object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative flex h-full flex-col justify-end text-white">
            <span className="text-uppercase-tag text-white/80">Featured collection</span>
            <h2 className="text-display-2xl mt-2">{collection.title}</h2>
            <p className="text-body-sm mt-1 max-w-xs text-white/75">{collection.subtitle}</p>
            <Button
              href="/shop"
              variant="dark"
              size="sm"
              className="text-ink mt-5 w-fit bg-white hover:bg-white/90"
            >
              Shop the collection
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Products */}
        <div className="lg:pt-10">
          <ProductRail products={products} />
        </div>
      </div>
    </section>
  );
}
