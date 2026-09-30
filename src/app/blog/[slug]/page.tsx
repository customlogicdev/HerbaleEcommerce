import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, posts } from "@/data/blog";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Journal" };
  return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const related = getRelatedPosts(post.slug);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <p className="text-xs tracking-[0.22em] text-forest uppercase">
        {post.category} · {post.date} · {post.readTime}
      </p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">By {post.author}</p>
      <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[2rem]">
        <Image src={post.image} alt={post.title} fill className="object-cover" priority />
      </div>
      <div className="mt-10 space-y-5 text-[17px] leading-8 text-charcoal/90">
        {post.content.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <section className="mt-16">
        <h2 className="font-serif text-3xl">Keep reading</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {related.map((item) => (
            <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-2xl bg-white p-4 hover:text-forest">
              <p className="text-[11px] tracking-[0.16em] text-forest uppercase">{item.category}</p>
              <p className="mt-1 font-medium">{item.title}</p>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
