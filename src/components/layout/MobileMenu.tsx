"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Logo } from "@/components/layout/Logo";
import { categories } from "@/data/categories";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/account", label: "Account" },
];

export function MobileMenu() {
  const open = useStore((s) => s.mobileOpen);
  const setMobileOpen = useStore((s) => s.setMobileOpen);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-[60] bg-charcoal/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            className="fixed top-0 left-0 z-[61] flex h-full w-[84%] max-w-sm flex-col bg-[#fbfaf4] p-5 lg:hidden"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button type="button" onClick={() => setMobileOpen(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full bg-white">
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-serif text-3xl text-charcoal"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <p className="text-xs tracking-[0.18em] text-forest uppercase">Categories</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/shop?category=${category.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-2xl bg-white px-3 py-3 text-sm"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
