"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/store/useStore";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const addToast = useStore((s) => s.addToast);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (!email.includes("@")) {
      addToast("Please enter a valid email", "error");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("failed");
      addToast("You are on the list. Welcome to the garden.");
      setEmail("");
    } catch {
      addToast("Could not subscribe just now. Try again.", "error");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "flex w-full gap-2" : "mx-auto flex max-w-lg gap-2"}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email address"
        className="h-12 flex-1 rounded-full border border-sage/40 bg-white px-5 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="h-12 rounded-full bg-forest px-6 text-sm font-semibold tracking-wide text-white uppercase hover:bg-forest-dark disabled:opacity-60"
      >
        {pending ? "..." : "Subscribe"}
      </button>
    </form>
  );
}
