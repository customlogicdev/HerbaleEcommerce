"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/store/useStore";

export function SearchModal() {
  const open = useStore((s) => s.searchOpen);
  const setSearchOpen = useStore((s) => s.setSearchOpen);
  const [query, setQuery] = useState("");
  const results = useMemo(() => (query.trim() ? searchProducts(query) : products.slice(0, 6)), [query]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-start justify-center bg-charcoal/40 p-4 pt-[10vh]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0" aria-label="Close search" onClick={() => setSearchOpen(false)} />
          <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-beige px-5 py-4">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search serums, oils, rituals..."
                className="h-10 flex-1 bg-transparent text-base outline-none"
              />
              <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.length === 0 ? (
                <p className="px-3 py-10 text-center text-sm text-muted">No matches for “{query}”.</p>
              ) : (
                <ul>
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.slug}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex items-center gap-3 rounded-2xl px-3 py-2 hover:bg-cream"
                      >
                        <span className="relative h-14 w-12 overflow-hidden rounded-lg bg-cream">
                          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="48px" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-medium">{product.name}</span>
                          <span className="text-xs text-muted">{product.shortDescription}</span>
                        </span>
                        <span className="text-sm">{formatPrice(product.price)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
