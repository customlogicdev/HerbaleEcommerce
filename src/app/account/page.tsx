"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { products } from "@/data/products";

export default function AccountPage() {
  const user = useStore((s) => s.user);
  const login = useStore((s) => s.login);
  const logout = useStore((s) => s.logout);
  const wishlist = useStore((s) => s.wishlist);
  const [tab, setTab] = useState<"orders" | "wishlist" | "addresses">("orders");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const addToast = useStore((s) => s.addToast);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      addToast("Enter a valid email and password (4+ characters).", "error");
      return;
    }
    login({ name: name || "Garden Guest", email });
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="font-serif text-4xl">Account</h1>
        <p className="mt-2 text-sm text-muted">Demo login only — nothing is stored on a server except optional orders.</p>
        <form onSubmit={onSubmit} className="mt-8 space-y-3 rounded-3xl bg-white p-6">
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="h-12 w-full rounded-2xl border border-beige px-4 text-sm" />
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="h-12 w-full rounded-2xl border border-beige px-4 text-sm" />
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="h-12 w-full rounded-2xl border border-beige px-4 text-sm" />
          <button type="submit" className="h-12 w-full rounded-full bg-forest text-sm font-semibold text-white uppercase">
            Sign in / register
          </button>
        </form>
      </div>
    );
  }

  const saved = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs tracking-[0.22em] text-forest uppercase">Member</p>
          <h1 className="font-serif text-4xl">{user.name}</h1>
          <p className="text-sm text-muted">{user.email}</p>
        </div>
        <button type="button" onClick={logout} className="text-sm text-forest underline-offset-4 hover:underline">
          Sign out
        </button>
      </div>
      <div className="mt-8 flex gap-2">
        {(["orders", "wishlist", "addresses"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`rounded-full px-4 py-2 text-sm capitalize ${tab === item ? "bg-forest text-white" : "bg-white"}`}
          >
            {item === "wishlist" ? "My wishlist" : item === "orders" ? "My orders" : "Addresses"}
          </button>
        ))}
      </div>
      <div className="mt-6 rounded-3xl bg-white p-6">
        {tab === "orders" && (
          <div>
            <p className="text-sm text-muted">Demo orders appear after checkout. No live payments are processed.</p>
            <div className="mt-4 rounded-2xl border border-dashed border-beige px-4 py-8 text-center text-sm text-muted">
              No orders yet — your first ritual is waiting in the shop.
            </div>
          </div>
        )}
        {tab === "wishlist" && (
          <ul className="space-y-2 text-sm">
            {saved.length === 0 && <li className="text-muted">Wishlist is empty.</li>}
            {saved.map((product) => (
              <li key={product.id}>
                <Link href={`/product/${product.slug}`} className="hover:text-forest">
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {tab === "addresses" && (
          <div className="text-sm leading-6 text-muted">
            <p className="font-medium text-charcoal">Default address</p>
            <p>123 Greenway Blvd</p>
            <p>San Francisco, CA 94107</p>
            <p>United States</p>
          </div>
        )}
      </div>
    </div>
  );
}
