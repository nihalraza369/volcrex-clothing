import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import StitchDivider from "@/components/StitchDivider";
import { getProducts } from "@/lib/products-repo";
import { categories } from "@/data/products";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const featured = products.filter((p) => p.isNew).concat(products.slice(0, 4)).slice(0, 8);
  const shownCategories = categories.filter((c) => c !== "All");

  return (
    <main>
      <Hero />

      <StitchDivider className="mt-4 mb-16 opacity-30" />

      {/* Category strip */}
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-4xl">Shop by Category</h2>
          <Link href="/shop" className="label-tag hidden sm:block border-b border-ink pb-1">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {shownCategories.map((cat) => {
            const sample = products.find((p) => p.category === cat);
            return (
              <Link
                key={cat}
                href={`/shop?category=${encodeURIComponent(cat)}`}
                className="group relative aspect-[3/4] overflow-hidden bg-chalk block"
              >
                {sample && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sample.image}
                    alt={cat}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale"
                  />
                )}
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/45 transition-colors" />
                <span className="absolute bottom-4 left-4 label-tag text-white">{cat}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <StitchDivider className="my-20 opacity-30" />

      {/* Featured products */}
      <section className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-display text-4xl">New &amp; Notable</h2>
          <Link href="/shop" className="label-tag hidden sm:block border-b border-ink pb-1">
            Full Collection
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="mt-10 flex justify-center sm:hidden">
          <Link href="/shop" className="label-tag border-b border-ink pb-1">
            View Full Collection
          </Link>
        </div>
      </section>

      <StitchDivider className="my-20 opacity-30" />

      {/* Brand statement */}
      <section className="mx-auto max-w-4xl px-5 md:px-10 text-center pb-8">
        <span className="label-tag text-ash">The Expert Bridal Dress Standard</span>
        <p className="font-display text-3xl md:text-5xl mt-6 leading-tight">
          No compromise on elegance. Just fabric, fit, and a stitch that holds.
        </p>
        <p className="text-ash mt-6 max-w-xl mx-auto leading-relaxed">
          Every Expert Bridal Dress piece is crafted for your special day —
          Sharara, Gharara, Lehnga, Sarhee, and Party Wear delivered across Pakistan.
          Cash on Delivery accepted.
        </p>
      </section>
    </main>
  );
}
