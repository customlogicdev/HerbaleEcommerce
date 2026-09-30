"use client";

import { FormEvent, useState } from "react";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useStore } from "@/store/useStore";

export function AuthModal() {
  const open = useStore((s) => s.authOpen);
  const setAuthOpen = useStore((s) => s.setAuthOpen);
  const login = useStore((s) => s.login);
  const user = useStore((s) => s.user);
  const logout = useStore((s) => s.logout);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      useStore.getState().addToast("Enter a valid email and a 4+ character password", "error");
      return;
    }
    login({ name: name || email.split("@")[0], email });
    setName("");
    setEmail("");
    setPassword("");
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" className="absolute inset-0" aria-label="Close account" onClick={() => setAuthOpen(false)} />
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl"
          >
            <button type="button" onClick={() => setAuthOpen(false)} className="absolute top-4 right-4" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            {user ? (
              <div className="py-4 text-center">
                <p className="font-serif text-3xl">Hello, {user.name.split(" ")[0]}</p>
                <p className="mt-2 text-sm text-muted">{user.email}</p>
                <div className="mt-6 grid gap-2">
                  <Link href="/account" onClick={() => setAuthOpen(false)} className="rounded-full bg-forest py-3 text-sm font-semibold text-white uppercase">
                    View account
                  </Link>
                  <button type="button" onClick={logout} className="rounded-full border border-beige py-3 text-sm">
                    Sign out
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="font-serif text-3xl">Welcome back</p>
                <p className="mt-1 text-sm text-muted">Demo only — no real accounts are created.</p>
                <div className="mt-5 grid grid-cols-2 rounded-full bg-cream p-1 text-sm">
                  {(["login", "register"] as const).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setTab(item)}
                      className={`rounded-full py-2 capitalize ${tab === item ? "bg-white shadow-sm" : "text-muted"}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <form onSubmit={onSubmit} className="mt-5 space-y-3">
                  {tab === "register" && (
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="h-12 w-full rounded-2xl border border-beige px-4 text-sm"
                    />
                  )}
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="h-12 w-full rounded-2xl border border-beige px-4 text-sm"
                  />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="h-12 w-full rounded-2xl border border-beige px-4 text-sm"
                  />
                  <button type="submit" className="h-12 w-full rounded-full bg-forest text-sm font-semibold tracking-wide text-white uppercase">
                    {tab === "login" ? "Sign in" : "Create account"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
