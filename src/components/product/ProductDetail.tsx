"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Minus, Plus, ShieldCheck, Truck } from "lucide-react";
import { useState } from "react";
import type { Product, Review } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { StarRating } from "@/components/ui/StarRating";
import { ProductCard } from "@/components/product/ProductCard";

export function ProductDetail({
  product,
  reviews,
  related,
}: {
  product: Product;
  reviews: Review[];
  related: Product[];
}) {
  const [active, setActive] = useState(product.gallery[0] ?? product.image);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"description" | "ingredients" | "how" | "reviews">("description");
  const addToCart = useStore((s) => s.addToCart);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const wishlist = useStore((s) => s.wishlist);
  const hydrated = useStore((s) => s.hydrated);
  const wished = hydrated && wishlist.includes(product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="text-xs text-muted">
        <Link href="/" className="hover:text-forest">Home</Link>
        <span className="px-2">/</span>
        <Link href="/shop" className="hover:text-forest">Shop</Link>
        <span className="px-2">/</span>
        <Link href={`/shop?category=${product.category}`} className="hover:text-forest capitalize">
          {product.category.replace("-", " ")}
        </Link>
        <span className="px-2">/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-cream">
            <Image src={active} alt={product.name} fill className="object-cover" priority sizes="50vw" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {product.gallery.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className={`relative aspect-square overflow-hidden rounded-2xl border-2 ${active === src ? "border-forest" : "border-transparent"}`}
              >
                <Image src={src} alt="" fill className="object-cover" sizes="120px" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.badge && (
            <span className="rounded-full bg-beige px-3 py-1 text-[11px] font-semibold tracking-wide text-forest uppercase">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={product.rating} count={product.reviewCount} size="md" />
            <span className="text-sm text-muted">{product.size}</span>
          </div>
          <p className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-medium">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{product.description}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-full border border-beige">
              <button type="button" className="px-4 py-3" onClick={() => setQty((n) => Math.max(1, n - 1))} aria-label="Decrease quantity">
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button type="button" className="px-4 py-3" onClick={() => setQty((n) => n + 1)} aria-label="Increase quantity">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => addToCart(product, qty)}
              className="rounded-full bg-forest px-8 py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-forest-dark"
            >
              Add to cart
            </button>
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              className="grid h-12 w-12 place-items-center rounded-full border border-beige"
              aria-label="Wishlist"
            >
              <Heart className={wished ? "h-4 w-4 fill-forest text-forest" : "h-4 w-4"} />
            </button>
          </div>

          <div className="mt-8 grid gap-3 text-sm text-muted">
            <p className="inline-flex items-center gap-2">
              <Truck className="h-4 w-4 text-forest" /> Free shipping over $49 · 30-day returns
            </p>
            <p className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-forest" /> {product.inStock ? "In stock — ships within 24 hours" : "Currently restocking"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-14">
        <div className="flex flex-wrap gap-2 border-b border-beige">
          {(
            [
              ["description", "Description"],
              ["ingredients", "Ingredients"],
              ["how", "How to use"],
              ["reviews", "Reviews"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className={`border-b-2 px-4 py-3 text-sm ${tab === key ? "border-forest text-forest" : "border-transparent text-muted"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="py-8">
          {tab === "description" && <p className="max-w-3xl text-sm leading-7 text-muted">{product.description}</p>}
          {tab === "ingredients" && (
            <ul className="grid max-w-2xl gap-2 sm:grid-cols-2">
              {product.ingredients.map((item) => (
                <li key={item} className="rounded-2xl bg-white px-4 py-3 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          )}
          {tab === "how" && <p className="max-w-3xl text-sm leading-7 text-muted">{product.howToUse}</p>}
          {tab === "reviews" && (
            <div className="grid gap-4 md:grid-cols-2">
              {reviews.map((review) => (
                <article key={review.id} className="rounded-3xl bg-white p-5">
                  <StarRating rating={review.rating} />
                  <h3 className="mt-2 font-medium">{review.title}</h3>
                  <p className="mt-2 text-sm text-muted">{review.body}</p>
                  <p className="mt-3 text-xs text-muted">
                    {review.author} · {review.date}
                  </p>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="font-serif text-3xl">You may also like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
