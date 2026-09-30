"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Heart, Menu, Search, ShoppingBag, User } from "lucide-react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Logo } from "@/components/layout/Logo";
import { useStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const setSearchOpen = useStore((s) => s.setSearchOpen);
  const setAuthOpen = useStore((s) => s.setAuthOpen);
  const setCartOpen = useStore((s) => s.setCartOpen);
  const setMobileOpen = useStore((s) => s.setMobileOpen);
  const cart = useStore((s) => s.cart);
  const wishlist = useStore((s) => s.wishlist);
  const hydrated = useStore((s) => s.hydrated);
  const cartCount = hydrated ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;
  const wishCount = hydrated ? wishlist.length : 0;

  return (
    <header className="sticky top-0 z-50">
      <AnnouncementBar />
      <div className="border-b border-beige/80 bg-[#fbfaf4]/90 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full lg:hidden"
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => {
              const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-[13px] tracking-[0.12em] uppercase transition",
                    active ? "text-forest" : "text-charcoal/80 hover:text-forest",
                  )}
                >
                  {item.label}
                  {active && <span className="absolute -bottom-1 left-0 h-px w-full bg-forest" />}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton label="Account" onClick={() => setAuthOpen(true)}>
              <User className="h-[18px] w-[18px]" />
            </IconButton>
            <Link href="/wishlist" className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-beige/60" aria-label="Wishlist">
              <Heart className="h-[18px] w-[18px]" />
              {wishCount > 0 && <CountBadge value={wishCount} />}
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-beige/60"
              aria-label="Open bag"
            >
              <ShoppingBag className="h-[18px] w-[18px]" />
              {cartCount > 0 && <CountBadge value={cartCount} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconButton({
  children,
  label,
  onClick,
}: {
  children: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="grid h-10 w-10 place-items-center rounded-full hover:bg-beige/60"
    >
      {children}
    </button>
  );
}

function CountBadge({ value }: { value: number }) {
  return (
    <span className="absolute top-1 right-1 grid h-4 min-w-4 place-items-center rounded-full bg-forest px-1 text-[10px] font-semibold text-white">
      {value}
    </span>
  );
}
