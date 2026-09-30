"use client";

import { useState } from "react";
import { Leaf, RotateCcw, Truck, X } from "lucide-react";

export function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;

  return (
    <div className="relative bg-forest text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-4 py-2 text-[11px] tracking-[0.14em] uppercase">
        <span className="hidden items-center gap-1.5 sm:flex">
          <Truck className="h-3.5 w-3.5" /> Free shipping on orders over $49
        </span>
        <span className="hidden h-3 w-px bg-white/30 lg:block" />
        <span>Use code: GLOW20</span>
        <span className="hidden h-3 w-px bg-white/30 lg:block" />
        <span className="hidden items-center gap-1.5 md:flex">
          <Leaf className="h-3.5 w-3.5" /> 100% organic & natural
        </span>
        <span className="hidden h-3 w-px bg-white/30 lg:block" />
        <span className="hidden items-center gap-1.5 lg:flex">
          <RotateCcw className="h-3.5 w-3.5" /> 30-day easy returns
        </span>
      </div>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute top-1/2 right-3 -translate-y-1/2 opacity-80 hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
