"use client";

import Image from "next/image";
import { testimonials } from "@/data/content";
import { StarRating } from "@/components/ui/StarRating";
import { Reveal } from "@/components/ui/Reveal";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <p className="text-center text-xs tracking-[0.22em] text-forest uppercase">Kind words</p>
        <h2 className="mt-2 text-center font-serif text-4xl">Loved in real bathrooms</h2>
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.08}>
            <figure className="h-full rounded-3xl bg-white p-6 shadow-[0_10px_40px_rgba(58,90,64,0.06)]">
              <StarRating rating={item.rating} />
              <blockquote className="mt-4 text-sm leading-relaxed text-charcoal">“{item.quote}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="relative h-11 w-11 overflow-hidden rounded-full">
                  <Image src={item.avatar} alt={item.name} fill className="object-cover" sizes="44px" />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="text-xs text-muted">{item.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
