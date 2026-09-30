"use client";

import Link from "next/link";
import { products } from "@/data/products";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const hydrated = useStore((s) => s.hydrated);
  const items = products.filter((product) => wishlist.includes(product.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-5xl">Wishlist</h1>
      {!hydrated ? (
        <p className="mt-8 text-muted">Loading saved rituals...</p>
      ) : items.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-white px-6 py-16 text-center">
          <p className="text-muted">No favorites yet. Heart a formula you love.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white uppercase">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
