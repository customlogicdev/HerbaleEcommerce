"use client";

import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

export function PromoBanners() {
  return (
    <section className="mx-auto grid max-w-7xl gap-5 px-4 py-8 sm:px-6 lg:grid-cols-2">
      <Reveal>
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[#eef3e6]">
          <div className="relative z-10 max-w-sm px-8 py-10">
            <p className="text-xs tracking-[0.2em] text-forest uppercase">Limited time offer</p>
            <h3 className="mt-2 font-serif text-4xl">20% Off Sitewide</h3>
            <p className="mt-2 text-sm text-muted">
              Use code <span className="font-semibold text-forest">ORGANIC20</span>
            </p>
            <Link href="/shop" className="mt-6 inline-flex rounded-full bg-forest px-5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase">
              Shop the offer
            </Link>
          </div>
          <div className="absolute right-0 bottom-0 h-full w-[48%]">
            <Image src="/images/promo-still.jpg" alt="Organic HairBloom still life" fill className="object-cover" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="relative overflow-hidden rounded-[1.6rem] bg-[#e9edc9]">
          <div className="relative z-10 flex h-full flex-col justify-between gap-6 px-8 py-10 sm:flex-row sm:items-center">
            <div className="max-w-xs">
              <p className="text-xs tracking-[0.2em] text-forest uppercase">Join HairBloom Rewards</p>
              <h3 className="mt-2 font-serif text-4xl leading-tight">Earn points. Get rewarded.</h3>
              <p className="mt-2 text-sm text-muted">Earn on every order and enjoy exclusive rituals.</p>
              <Link href="/account" className="mt-6 inline-flex rounded-full bg-forest px-5 py-2.5 text-xs font-semibold tracking-wide text-white uppercase">
                Join now
              </Link>
            </div>
            <div className="relative h-40 w-64 shrink-0 rotate-6 rounded-2xl bg-forest p-5 text-cream shadow-xl">
              <p className="text-[10px] tracking-[0.25em] uppercase">HairBloom</p>
              <p className="mt-8 font-serif text-2xl">Rewards</p>
              <p className="mt-6 text-[10px] tracking-[0.2em] uppercase opacity-70">Member since 2026</p>
              <span className="absolute top-4 right-4 opacity-70">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4c2.8 5.2 4 8.4 4 12.2C20 21.4 18.2 25 16 28c-2.2-3-4-6.6-4-11.8C12 12.4 13.2 9.2 16 4Z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
