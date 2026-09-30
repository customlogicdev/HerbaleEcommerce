import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { posts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Journal",
  description: "Hair rituals, ingredient stories, and a slower bathroom — the HairBloom journal.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-forest uppercase">The journal</p>
      <h1 className="mt-2 font-serif text-5xl">Notes from the garden</h1>
      <p className="mt-3 max-w-xl text-muted">Essays on rosemary, ritual, and the science hiding in your shower.</p>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group overflow-hidden rounded-3xl bg-white">
            <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/11]">
              <Image src={post.image} alt={post.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes="33vw" />
            </Link>
            <div className="p-6">
              <p className="text-[11px] tracking-[0.18em] text-forest uppercase">
                {post.category} · {post.readTime}
              </p>
              <h2 className="mt-2 font-serif text-2xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-forest">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="mt-4 inline-block text-sm text-forest">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
