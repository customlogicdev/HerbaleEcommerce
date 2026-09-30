"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Reveal } from "@/components/ui/Reveal";

export function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.22em] text-forest uppercase">Shop by category</p>
            <h2 className="mt-2 font-serif text-4xl text-charcoal">Find What Your Hair Needs</h2>
            <p className="mt-3 max-w-md text-sm text-muted">
              From cleansing to care, explore our complete range of haircare essentials.
            </p>
          </div>
          <Link href="/shop" className="hidden items-center gap-1 text-sm text-forest sm:flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal key={category.slug} delay={index * 0.05}>
            <Link
              href={`/shop?category=${category.slug}`}
              className={`group flex h-full flex-col justify-between overflow-hidden rounded-3xl p-4 transition hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(58,90,64,0.12)] ${category.tint}`}
            >
              <div>
                <p className="font-serif text-xl text-charcoal">{category.name}</p>
                <p className="mt-1 text-xs text-muted">{category.description}</p>
                <span className="mt-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-charcoal/15 text-charcoal">
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="relative mt-4 ml-auto h-28 w-28 overflow-hidden rounded-2xl">
                <Image src={category.image} alt={category.name} fill className="object-cover transition duration-500 group-hover:scale-110" sizes="112px" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
