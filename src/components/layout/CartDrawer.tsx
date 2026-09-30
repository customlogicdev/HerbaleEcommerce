"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { calcCartTotals, formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const open = useStore((s) => s.cartOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const cart = useStore((s) => s.cart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const totals = calcCartTotals(cart);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close bag"
            className="fixed inset-0 z-[60] bg-charcoal/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 right-0 z-[61] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-beige px-5 py-4">
              <div>
                <p className="font-serif text-2xl">Your bag</p>
                <p className="text-xs text-muted">{cart.length} item{cart.length === 1 ? "" : "s"}</p>
              </div>
              <button type="button" onClick={() => setCartOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-cream">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {cart.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <p className="font-serif text-2xl">Your bag is empty</p>
                  <p className="mt-2 text-sm text-muted">The garden is full. Start with a bestseller.</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-6 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white uppercase"
                  >
                    Shop now
                  </Link>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-3">
                      <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl bg-cream">
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      </Link>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <Link href={`/product/${item.slug}`} onClick={() => setCartOpen(false)} className="font-medium hover:text-forest">
                              {item.name}
                            </Link>
                            <p className="text-xs text-muted">{item.size}</p>
                          </div>
                          <button type="button" aria-label="Remove" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4 text-muted hover:text-charcoal" />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center rounded-full border border-beige">
                            <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease">
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase">
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <p className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-beige px-5 py-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="mt-1 flex justify-between text-sm">
                  <span className="text-muted">Shipping</span>
                  <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
                </div>
                <p className="mt-2 text-xs text-forest">
                  {totals.subtotal >= 49 ? "You unlocked free shipping." : `Add ${formatPrice(49 - totals.subtotal)} for free shipping.`}
                </p>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="mt-4 flex h-12 items-center justify-center rounded-full bg-forest text-sm font-semibold tracking-wide text-white uppercase hover:bg-forest-dark"
                >
                  Checkout · {formatPrice(totals.total)}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setCartOpen(false)}
                  className="mt-2 flex h-11 items-center justify-center text-sm text-forest underline-offset-4 hover:underline"
                >
                  View bag
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
