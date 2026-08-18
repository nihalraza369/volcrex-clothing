"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import StitchDivider from "@/components/StitchDivider";
import { categories } from "@/data/products";
import type { Product } from "@/data/products";

export default function ShopContent({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sort, setSort] = useState<"default" | "price-asc" | "price-desc">("default");

  const filtered = useMemo(() => {
    let list =
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory);

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [activeCategory, sort, products]);

  return (
    <main className="mx-auto max-w-7xl px-5 md:px-10 pt-14 pb-24">
      <div className="mb-10">
        <span className="label-tag text-ash">Collection</span>
        <h1 className="font-display text-5xl md:text-6xl mt-2">All Dresses</h1>
      </div>

      <StitchDivider className="mb-10 opacity-30" />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`label-tag px-4 py-2 border transition-colors ${
                activeCategory === cat
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/20 text-ink hover:border-ink"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          className="label-tag border border-ink/20 px-4 py-2 bg-paper focus:outline-none focus:border-ink"
        >
          <option value="default">Sort: Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ash text-center py-24">No dresses found in this category yet.</p>
      ) : (
        <motion.div
          layout
          className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-12"
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>
      )}
    </main>
  );
}
