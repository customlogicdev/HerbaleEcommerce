"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#fbfaf4]">
      <div className="pointer-events-none absolute -top-24 right-[18%] h-[420px] w-[420px] rounded-full bg-[#e4eed9] blur-0" />
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="text-xs tracking-[0.28em] text-forest uppercase">Healthy hair · happier you</p>
          <h1 className="mt-4 max-w-xl font-serif text-[2.6rem] leading-[1.08] text-charcoal sm:text-6xl">
            Natural Care for Stronger, Shinier Hair
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            Discover premium haircare products made with natural ingredients. Because your hair deserves the best — every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-forest px-7 py-3.5 text-sm font-semibold tracking-wide text-white uppercase hover:bg-forest-dark"
            >
              Shop now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop?sort=featured"
              className="inline-flex items-center rounded-full border border-forest px-7 py-3.5 text-sm font-semibold tracking-wide text-forest uppercase hover:bg-beige"
            >
              Explore collection
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2.5rem]">
            <Image
              src="/images/hero-model.jpg"
              alt="Woman with long glossy hair enjoying HairBloom ritual"
              fill
              priority
              className="object-cover object-[center_20%]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-6 left-2 w-[46%] overflow-hidden rounded-3xl border-4 border-[#fbfaf4] shadow-[0_18px_50px_rgba(26,26,26,0.12)] sm:left-6">
            <div className="relative aspect-[4/5]">
              <Image src="/images/hero-products.jpg" alt="Nourishing shampoo, repairing conditioner and hair growth serum" fill className="object-cover" />
            </div>
          </div>
          <div className="absolute top-6 right-2 rotate-6 text-forest sm:right-6">
            <p className="handwritten text-lg leading-tight sm:text-2xl">Good hair</p>
            <p className="handwritten text-lg leading-tight sm:text-2xl">good mood ♡</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
