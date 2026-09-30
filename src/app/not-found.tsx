import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-xs tracking-[0.22em] text-forest uppercase">404</p>
      <h1 className="mt-3 font-serif text-5xl">This page wandered off</h1>
      <p className="mt-4 text-muted">
        The path you followed does not grow here. Return to the garden — the bestsellers are in bloom.
      </p>
      <Link href="/" className="mt-8 rounded-full bg-forest px-6 py-3 text-sm font-semibold tracking-wide text-white uppercase">
        Back to home
      </Link>
    </section>
  );
}
