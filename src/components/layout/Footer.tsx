import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/home/NewsletterForm";

const columns = [
  {
    title: "Shop",
    links: [
      { href: "/shop", label: "All products" },
      { href: "/shop?category=shampoo", label: "Hair care" },
      { href: "/shop?category=personal-care", label: "Skin care" },
      { href: "/shop?category=wellness", label: "Wellness" },
      { href: "/shop?sort=featured", label: "Best sellers" },
    ],
  },
  {
    title: "Customer care",
    links: [
      { href: "/contact", label: "Help & FAQs" },
      { href: "/contact", label: "Shipping & delivery" },
      { href: "/contact", label: "Returns & refunds" },
      { href: "/cart", label: "Track order" },
      { href: "/contact", label: "Contact us" },
    ],
  },
  {
    title: "About us",
    links: [
      { href: "/about", label: "Our story" },
      { href: "/about", label: "Our ingredients" },
      { href: "/about", label: "Our values" },
      { href: "/about", label: "Sustainability" },
      { href: "/blog", label: "Journal" },
    ],
  },
];

const socials = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4V10c0-.6.4-1 1-1Z" />
      </svg>
    ),
  },
  {
    label: "Pinterest",
    href: "https://pinterest.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 3C7 3 3.5 6.6 3.5 11.2c0 3.4 2 6.3 4.9 7.4-.1-.6-.2-1.6 0-2.3.2-.6 1.3-5.5 1.3-5.5s-.3-.7-.3-1.6c0-1.5.9-2.6 2-2.6.9 0 1.4.7 1.4 1.5 0 .9-.6 2.3-.9 3.5-.3 1.1.5 1.9 1.6 1.9 1.9 0 3.2-2.4 3.2-5.3 0-2.2-1.5-3.8-4.2-3.8-3.1 0-5 2.3-5 4.8 0 .9.3 1.8.7 2.4.1.1.1.2.1.3l-.3 1.1c0 .2-.1.3-.3.2-1.2-.5-1.8-1.8-1.8-3.3 0-2.5 2.1-5.5 6.3-5.5 3.4 0 5.6 2.4 5.6 5.1 0 3.5-1.9 6.1-4.8 6.1-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.8-1.2 2.4.9.3 1.9.4 2.9.4 5 0 8.5-3.6 8.5-8.8C20.5 6.6 16.9 3 12 3Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 5 12 5 12 5s-6 0-7.7.3a2.7 2.7 0 0 0-1.9 1.9A28 28 0 0 0 2 12a28 28 0 0 0 .4 4.8 2.7 2.7 0 0 0 1.9 1.9C6 19 12 19 12 19s6 0 7.7-.3a2.7 2.7 0 0 0 1.9-1.9A28 28 0 0 0 22 12a28 28 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" />
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="mt-20 bg-[#f7f4ea] text-charcoal">
      <div className="border-y border-beige bg-cream/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <div className="flex items-center gap-3">
            <span className="text-forest">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
                <path d="M8 24c6-10 10-14 16-18-2 8-4 14-8 18-4 4-8 4-8 0Z" fill="currentColor" />
              </svg>
            </span>
            <div>
              <p className="text-sm font-semibold tracking-[0.12em] uppercase">Be the first to know</p>
              <p className="text-sm text-muted">Subscribe for exclusive offers, new arrivals & tips.</p>
            </div>
          </div>
          <div className="w-full flex-1">
            <NewsletterForm compact />
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            We believe in pure, natural & sustainable living for healthier hair, calmer skin, and a quieter planet.
          </p>
          <div className="mt-5 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full border border-sage/50 text-forest hover:bg-forest hover:text-white"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-xs font-semibold tracking-[0.16em] text-forest uppercase">{column.title}</p>
            <ul className="mt-4 space-y-2">
              {column.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-muted hover:text-forest">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-forest text-cream">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} HairBloom Organic Living. All rights reserved.</p>
          <div className="flex items-center gap-3 tracking-[0.14em] uppercase">
            <span className="rounded bg-white px-2 py-1 font-bold text-[#1a1f71]">VISA</span>
            <span className="rounded bg-white px-2 py-1 font-bold text-[#eb001b]">MC</span>
            <span className="rounded bg-[#003087] px-2 py-1 font-bold text-white">PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
