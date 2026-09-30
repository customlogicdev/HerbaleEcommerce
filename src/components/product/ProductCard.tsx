"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { StarRating } from "@/components/ui/StarRating";
import { QuickView } from "@/components/product/QuickView";

export function ProductCard({ product, layout = "grid" }: { product: Product; layout?: "grid" | "list" }) {
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const hydrated = useStore((s) => s.hydrated);
  const wished = hydrated && wishlist.includes(product.id);
  const [quick, setQuick] = useState(false);

  if (layout === "list") {
    return (
      <>
        <article className="flex flex-col gap-5 rounded-3xl border border-beige bg-white p-4 sm:flex-row sm:items-center">
          <Link href={`/product/${product.slug}`} className="relative h-48 w-full shrink-0 overflow-hidden rounded-2xl bg-cream sm:h-40 sm:w-40">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="160px" />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="text-xs uppercase tracking-[0.16em] text-forest">{product.category.replace("-", " ")}</p>
            <Link href={`/product/${product.slug}`} className="mt-1 block font-serif text-2xl text-charcoal hover:text-forest">
              {product.name}
            </Link>
            <p className="mt-2 line-clamp-2 text-sm text-muted">{product.shortDescription}</p>
            <div className="mt-3">
              <StarRating rating={product.rating} count={product.reviewCount} />
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <Price product={product} />
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-white hover:bg-forest-dark"
            >
              Add to cart
            </button>
          </div>
        </article>
      </>
    );
  }

  return (
    <>
      <article className="group relative flex flex-col">
        <div className="relative overflow-hidden rounded-2xl bg-cream">
          <Link href={`/product/${product.slug}`} className="relative block aspect-[4/5]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </Link>
          {product.badge && (
            <span className="absolute top-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-forest uppercase">
              {product.badge}
            </span>
          )}
          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            onClick={() => toggleWishlist(product.id)}
            className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-charcoal shadow-sm transition hover:text-forest"
          >
            <Heart className={wished ? "h-4 w-4 fill-forest text-forest" : "h-4 w-4"} />
          </button>
          <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 max-md:translate-y-0 max-md:opacity-100">
            <button
              type="button"
              onClick={() => addToCart(product)}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-forest py-2.5 text-xs font-semibold tracking-wide text-white uppercase hover:bg-forest-dark"
            >
              <ShoppingBag className="h-3.5 w-3.5" /> Add to cart
            </button>
            <button
              type="button"
              onClick={() => setQuick(true)}
              aria-label="Quick view"
              className="grid h-10 w-10 place-items-center rounded-full bg-white text-charcoal"
            >
              <Eye className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <Link href={`/product/${product.slug}`} className="font-medium text-charcoal hover:text-forest">
            {product.name}
          </Link>
          <Price product={product} />
          <StarRating rating={product.rating} count={product.reviewCount} />
        </div>
      </article>
      {quick && <QuickView product={product} onClose={() => setQuick(false)} />}
    </>
  );
}

function Price({ product }: { product: Product }) {
  return (
    <p className="flex items-baseline gap-2">
      <span className="font-medium text-charcoal">{formatPrice(product.price)}</span>
      {product.originalPrice && product.originalPrice > product.price && (
        <span className="text-sm text-muted line-through">{formatPrice(product.originalPrice)}</span>
      )}
    </p>
  );
}
