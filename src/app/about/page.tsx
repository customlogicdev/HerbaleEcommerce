import type { Metadata } from "next";
import Image from "next/image";
import { team, values } from "@/data/content";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: "The HairBloom story — botanists, Ayurvedic doctors, and a quieter kind of beauty.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[52vh] min-h-80 overflow-hidden">
        <Image src="/images/story-woman.jpg" alt="HairBloom founder story" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-charcoal/35" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
            <p className="text-xs tracking-[0.22em] text-cream uppercase">Our story</p>
            <h1 className="mt-2 max-w-2xl font-serif text-4xl text-white sm:text-6xl">Grown slowly. Formulated quietly.</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <p className="font-serif text-3xl leading-snug text-charcoal">
          HairBloom began as a kitchen experiment with rosemary, sesame, and a stubborn dry scalp. It became a studio, then a small factory by a river, then a brand that still refuses to shout.
        </p>
        <p className="mt-6 text-sm leading-7 text-muted">
          We work with growers who know their plants by season, not SKU. Every formula is dermatologically tested, cruelty-free, and bottled in recyclable glass or PCR plastic. If an ingredient cannot be explained at a dinner table, it does not go in.
        </p>
      </section>

      <section className="mx-auto grid max-w-7xl gap-5 px-4 pb-16 sm:px-6 md:grid-cols-3">
        {values.map((value) => (
          <Reveal key={value.title}>
            <article className="h-full rounded-3xl bg-white p-7">
              <h2 className="font-serif text-2xl">{value.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{value.body}</p>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <h2 className="font-serif text-4xl">The people behind the bottles</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {team.map((member) => (
            <article key={member.name} className="overflow-hidden rounded-3xl bg-white">
              <div className="relative aspect-[4/5]">
                <Image src={member.image} alt={member.name} fill className="object-cover" sizes="33vw" />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-2xl">{member.name}</h3>
                <p className="text-xs tracking-[0.16em] text-forest uppercase">{member.role}</p>
                <p className="mt-3 text-sm text-muted">{member.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
