"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/store/useStore";
import { StarRating } from "@/components/ui/StarRating";

export function QuickView({ product, onClose }: { product: Product; onClose: () => void }) {
  const addToCart = useStore((s) => s.addToCart);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-charcoal/40" aria-label="Close" onClick={onClose} />
      <div className="relative grid w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90"
          aria-label="Close quick view"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="relative min-h-64 bg-cream">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-3 p-6">
          <p className="text-xs tracking-[0.2em] text-forest uppercase">{product.size}</p>
          <h3 className="font-serif text-3xl text-charcoal">{product.name}</h3>
          <StarRating rating={product.rating} count={product.reviewCount} />
          <p className="text-lg font-medium">{formatPrice(product.price)}</p>
          <p className="text-sm leading-relaxed text-muted">{product.shortDescription}</p>
          <button
            type="button"
            onClick={() => {
              addToCart(product);
              onClose();
            }}
            className="mt-2 rounded-full bg-forest py-3 text-sm font-semibold tracking-wide text-white uppercase hover:bg-forest-dark"
          >
            Add to cart
          </button>
          <Link href={`/product/${product.slug}`} onClick={onClose} className="text-center text-sm text-forest underline-offset-4 hover:underline">
            View full details
          </Link>
        </div>
      </div>
    </div>
  );
}
