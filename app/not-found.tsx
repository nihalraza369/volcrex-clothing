import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-5 pt-32 pb-32 text-center">
      <span className="label-tag text-ash">404</span>
      <h1 className="font-display text-5xl mt-3">This shirt isn&apos;t in the collection.</h1>
      <p className="text-ash mt-4">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/shop" className="inline-block mt-8 bg-ink text-paper px-8 py-4 label-tag">
        Back to Shop
      </Link>
    </main>
  );
}
