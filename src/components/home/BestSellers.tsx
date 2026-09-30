import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Reveal } from "@/components/ui/Reveal";

export function BestSellers() {
  const items = getFeaturedProducts().slice(0, 8);
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs tracking-[0.22em] text-forest uppercase">Best sellers</p>
            <h2 className="mt-2 font-serif text-4xl">Customer Favorites</h2>
          </div>
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm text-forest">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
