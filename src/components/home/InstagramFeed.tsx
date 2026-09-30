"use client";

import Image from "next/image";
import { instagramImages } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export function InstagramFeed() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.22em] text-forest uppercase">@hairbloom</p>
        <h2 className="mt-2 text-center font-serif text-4xl">Follow the ritual</h2>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        {instagramImages.map((image) => (
          <a
            key={image.src}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-square overflow-hidden rounded-2xl"
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover transition duration-500 group-hover:scale-110" sizes="200px" />
            <span className="absolute inset-0 grid place-items-center bg-forest/0 text-xs tracking-wide text-white uppercase opacity-0 transition group-hover:bg-forest/45 group-hover:opacity-100">
              Follow us
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
