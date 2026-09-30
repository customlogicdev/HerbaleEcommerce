"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useStore } from "@/store/useStore";
import { calcCartTotals, formatPrice } from "@/lib/utils";

export default function CartPage() {
  const cart = useStore((s) => s.cart);
  const updateQuantity = useStore((s) => s.updateQuantity);
  const removeFromCart = useStore((s) => s.removeFromCart);
  const totals = calcCartTotals(cart);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-5xl">Your bag</h1>
      {cart.length === 0 ? (
        <div className="mt-12 rounded-3xl bg-white px-6 py-16 text-center">
          <p className="text-muted">Nothing here yet.</p>
          <Link href="/shop" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white uppercase">
            Continue shopping
          </Link>
        </div>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="overflow-hidden rounded-3xl bg-white">
            <table className="hidden w-full text-sm md:table">
              <thead className="text-left text-xs tracking-[0.16em] text-muted uppercase">
                <tr>
                  <th className="px-5 py-4">Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-t border-beige">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="relative h-16 w-14 overflow-hidden rounded-xl bg-cream">
                          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                        </span>
                        <div>
                          <Link href={`/product/${item.slug}`} className="font-medium hover:text-forest">
                            {item.name}
                          </Link>
                          <p className="text-xs text-muted">{item.size}</p>
                        </div>
                      </div>
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <div className="inline-flex items-center rounded-full border border-beige">
                        <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </td>
                    <td>{formatPrice(item.price * item.quantity)}</td>
                    <td className="pr-5">
                      <button type="button" onClick={() => removeFromCart(item.id)} aria-label="Remove">
                        <Trash2 className="h-4 w-4 text-muted" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <ul className="divide-y divide-beige md:hidden">
              {cart.map((item) => (
                <li key={item.id} className="flex gap-3 p-4">
                  <span className="relative h-20 w-16 overflow-hidden rounded-xl">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm">{formatPrice(item.price)}</p>
                    <div className="mt-2 inline-flex items-center rounded-full border border-beige">
                      <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <button type="button" className="px-2 py-1" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  <button type="button" onClick={() => removeFromCart(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <aside className="h-fit rounded-3xl bg-white p-6">
            <h2 className="font-serif text-2xl">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatPrice(totals.subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Shipping</dt>
                <dd>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Tax</dt>
                <dd>{formatPrice(totals.tax)}</dd>
              </div>
              <div className="flex justify-between border-t border-beige pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatPrice(totals.total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="mt-6 flex h-12 items-center justify-center rounded-full bg-forest text-sm font-semibold tracking-wide text-white uppercase">
              Proceed to checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  );
}
