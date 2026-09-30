"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/store/useStore";

export function ContactForm() {
  const addToast = useStore((s) => s.addToast);
  const [pending, setPending] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (form.name.trim().length < 2 || !form.email.includes("@") || form.message.trim().length < 10) {
      addToast("Please complete all fields with a real message.", "error");
      return;
    }
    setPending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      addToast("Message planted. We will write back soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      addToast("Could not send just now.", "error");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] bg-white p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
          className="h-12 rounded-2xl border border-beige px-4 text-sm"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          className="h-12 rounded-2xl border border-beige px-4 text-sm"
        />
      </div>
      <input
        required
        value={form.subject}
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
        placeholder="Subject"
        className="mt-4 h-12 w-full rounded-2xl border border-beige px-4 text-sm"
      />
      <textarea
        required
        rows={6}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Message"
        className="mt-4 w-full rounded-2xl border border-beige px-4 py-3 text-sm"
      />
      <button
        type="submit"
        disabled={pending}
        className="mt-4 h-12 w-full rounded-full bg-forest text-sm font-semibold tracking-wide text-white uppercase disabled:opacity-60"
      >
        {pending ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
