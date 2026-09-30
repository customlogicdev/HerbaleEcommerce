import { NewsletterForm } from "@/components/home/NewsletterForm";

export function Newsletter() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="rounded-[2rem] bg-beige/70 px-6 py-14 text-center">
        <p className="text-xs tracking-[0.22em] text-forest uppercase">The garden letter</p>
        <h2 className="mt-2 font-serif text-4xl">Be the first to know</h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted">
          New moons, new formulas, and the occasional 20% off. No noise.
        </p>
        <div className="mt-8">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
