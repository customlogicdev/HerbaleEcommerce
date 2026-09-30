import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="group flex items-center gap-2">
      <span className={light ? "text-cream" : "text-forest"}>
        <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
          <path
            d="M16 4c2.8 5.2 4 8.4 4 12.2C20 21.4 18.2 25 16 28c-2.2-3-4-6.6-4-11.8C12 12.4 13.2 9.2 16 4Z"
            fill="currentColor"
          />
          <path
            d="M16 14c4.6-1.2 7.4-1 10.6.6-1.8 4.2-4.2 6.6-8.2 8.2C16.8 20.4 16 17.4 16 14Z"
            fill="currentColor"
            opacity="0.7"
          />
          <path
            d="M16 14c-4.6-1.2-7.4-1-10.6.6 1.8 4.2 4.2 6.6 8.2 8.2C15.2 20.4 16 17.4 16 14Z"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      </span>
      <span className="leading-none">
        <span className={`block font-serif text-[22px] tracking-tight ${light ? "text-cream" : "text-charcoal"}`}>
          HairBloom
        </span>
        <span className={`hidden text-[9px] tracking-[0.28em] uppercase sm:block ${light ? "text-sage" : "text-forest"}`}>
          Organic living
        </span>
      </span>
    </Link>
  );
}
