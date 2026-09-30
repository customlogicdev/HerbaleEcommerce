"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { calcCartTotals, formatPrice } from "@/lib/utils";
import Link from "next/link";

export default function CheckoutPage() {
  const cart = useStore((s) => s.cart);
  const clearCart = useStore((s) => s.clearCart);
  const addToast = useStore((s) => s.addToast);
  const user = useStore((s) => s.user);
  const totals = useMemo(() => calcCartTotals(cart), [cart]);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [placed, setPlaced] = useState<string | null>(null);
  const [form, setForm] = useState({
    customerName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    country: "United States",
    card: "",
    expiry: "",
    cvc: "",
    notes: "",
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (cart.length === 0) return;
    if (form.customerName.length < 2 || !form.email.includes("@") || form.address.length < 5) {
      addToast("Please complete shipping details.", "error");
      return;
    }
    if (form.card.replace(/\s/g, "").length < 12 || form.cvc.length < 3) {
      addToast("Enter demo card details to continue.", "error");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          email: form.email,
          phone: form.phone || "000-000-0000",
          address: form.address,
          city: form.city,
          zip: form.zip,
          country: form.country,
          notes: form.notes,
          items: cart,
          subtotal: totals.subtotal,
          shipping: totals.shipping,
          tax: totals.tax,
          total: totals.total,
        }),
      });
      const data = (await res.json()) as { orderNumber?: string };
      if (!res.ok) throw new Error("failed");
      setPlaced(data.orderNumber ?? "HB-DEMO");
      clearCart();
      addToast("Order placed successfully");
    } catch {
      addToast("Could not place order.", "error");
    } finally {
      setPending(false);
    }
  }

  if (cart.length === 0 && !placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <h1 className="font-serif text-4xl">Nothing to check out</h1>
        <Link href="/shop" className="mt-6 inline-flex rounded-full bg-forest px-6 py-3 text-sm text-white uppercase">
          Shop now
        </Link>
      </div>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-xs tracking-[0.22em] text-forest uppercase">Demo checkout</p>
        <h1 className="mt-2 font-serif text-5xl">Order planted</h1>
        <p className="mt-4 text-muted">
          Your demo order <span className="font-semibold text-charcoal">{placed}</span> was saved. No payment was taken.
        </p>
        <button type="button" onClick={() => router.push("/shop")} className="mt-8 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-white uppercase">
          Keep browsing
        </button>
      </div>
    );
  }

  const field = (key: keyof typeof form, placeholder: string, extra = "") => (
    <input
      required={key !== "notes" && key !== "phone"}
      value={form[key]}
      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
      placeholder={placeholder}
      className={`h-12 rounded-2xl border border-beige px-4 text-sm ${extra}`}
    />
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-serif text-5xl">Checkout</h1>
      <form onSubmit={onSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <section className="rounded-3xl bg-white p-6">
            <h2 className="font-serif text-2xl">Shipping address</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {field("customerName", "Full name", "sm:col-span-2")}
              {field("email", "Email")}
              {field("phone", "Phone")}
              {field("address", "Street address", "sm:col-span-2")}
              {field("city", "City")}
              {field("zip", "ZIP")}
              {field("country", "Country", "sm:col-span-2")}
            </div>
          </section>
          <section className="rounded-3xl bg-white p-6">
            <h2 className="font-serif text-2xl">Payment</h2>
            <p className="mt-1 text-xs text-muted">Demo only. Try 4242 4242 4242 4242.</p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {field("card", "Card number", "sm:col-span-2")}
              {field("expiry", "MM/YY")}
              {field("cvc", "CVC")}
            </div>
          </section>
        </div>
        <aside className="h-fit rounded-3xl bg-white p-6">
          <h2 className="font-serif text-2xl">Order summary</h2>
          <ul className="mt-4 space-y-3 text-sm">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between gap-3">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1 border-t border-beige pt-4 text-sm">
            <p className="flex justify-between">
              <span className="text-muted">Shipping</span>
              <span>{totals.shipping === 0 ? "Free" : formatPrice(totals.shipping)}</span>
            </p>
            <p className="flex justify-between">
              <span className="text-muted">Tax</span>
              <span>{formatPrice(totals.tax)}</span>
            </p>
            <p className="flex justify-between pt-2 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(totals.total)}</span>
            </p>
          </div>
          <button
            type="submit"
            disabled={pending}
            className="mt-6 h-12 w-full rounded-full bg-forest text-sm font-semibold tracking-wide text-white uppercase disabled:opacity-60"
          >
            {pending ? "Placing..." : "Place order"}
          </button>
        </aside>
      </form>
    </div>
  );
}
