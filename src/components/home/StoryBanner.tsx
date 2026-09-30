"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function StoryBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Reveal>
        <div className="grid overflow-hidden rounded-[2rem] bg-[#eef3e6] md:grid-cols-2">
          <div className="flex flex-col justify-center px-8 py-12 sm:px-12">
            <p className="text-xs tracking-[0.22em] text-forest uppercase">Nature. Science. You.</p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-charcoal sm:text-5xl">
              Thoughtful Skincare for a Healthier You
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              At HairBloom, we blend the best of nature with advanced botanical science to nourish hair and skin — quietly, daily, honestly.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex w-fit items-center rounded-full bg-forest px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase"
            >
              Our story
            </Link>
            <div className="mt-8 flex flex-wrap gap-5 text-xs text-forest">
              <span className="inline-flex items-center gap-1.5">
                <Leaf className="h-4 w-4" /> Clean ingredients
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" /> Ethically sourced
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Heart className="h-4 w-4" /> Made with love
              </span>
            </div>
          </div>
          <div className="relative min-h-72">
            <Image src="/images/story-woman.jpg" alt="Woman with glowing skin surrounded by leaves" fill className="object-cover" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
