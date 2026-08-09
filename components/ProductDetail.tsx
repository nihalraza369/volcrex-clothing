"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { notFound, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import StitchDivider from "@/components/StitchDivider";
import type { Product } from "@/data/products";

export default function ProductDetail({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const router = useRouter();
  const { addItem } = useCart();

  const [size, setSize] = useState(product.sizes[0] ?? "");
  const [color, setColor] = useState(product.colors[0] ?? "");
  const [added, setAdded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [galleryRatio, setGalleryRatio] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const gallery = product.images && product.images.length > 0 ? product.images : [product.image];

  const KNOWN_COLORS = ["gray", "green", "brown", "blue", "red", "black", "white", "beige"];

  const getColorKeyword = (color: string): string | null => {
    const lower = color.toLowerCase();
    return KNOWN_COLORS.find((k) => lower.includes(k)) ?? null;
  };

  const colorMatches = (color: string): number[] => {
    const kw = getColorKeyword(color);
    if (!kw) return [];
    return gallery.reduce<number[]>((acc, src, i) => {
      if (src.toLowerCase().includes(kw)) acc.push(i);
      return acc;
    }, []);
  };

  const selectedColorMatches = colorMatches(color);
  const hasFrontBack = selectedColorMatches.length >= 2;
  const frontIndex = selectedColorMatches[0] ?? -1;
  const backIndex = selectedColorMatches[1] ?? -1;

  useEffect(() => {
    const matches = colorMatches(color);
    if (matches.length > 0) {
      setActiveIndex(matches[0]);
      setTimeout(() => {
        const container = scrollRef.current;
        if (!container) return;
        const child = container.children[matches[0]] as HTMLElement;
        child?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
      }, 50);
    }
  }, [color, gallery]);

  const handleAddToCart = () => {
    addItem(product, size, color, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleBuyNow = () => {
    addItem(product, size, color, 1);
    router.push("/checkout");
  };

  const scrollToImage = (index: number) => {
    setActiveIndex(index);
    const container = scrollRef.current;
    if (!container) return;
    const children = container.children[index] as HTMLElement;
    if (children) {
      children.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;
    const childWidth = container.children[0]?.getBoundingClientRect().width ?? 1;
    const index = Math.round(scrollLeft / childWidth);
    setActiveIndex(index);
  };

  return (
    <main className="mx-auto max-w-7xl px-5 md:px-10 pt-10 pb-24">
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16">
        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Scrollable image strip */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-1 bg-chalk"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {gallery.map((src, i) => (
              <div
                key={i}
                className="relative flex-none w-full snap-start aspect-[3/4] overflow-hidden"
                style={galleryRatio ? { aspectRatio: galleryRatio } : undefined}
              >
                <Image
                  src={src}
                  alt={`${product.name} — image ${i + 1}`}
                  fill
                  priority={i === 0}
                  className="object-cover"
                  onLoad={(e) => {
                    if (i === 0) {
                      const img = e.target as HTMLImageElement;
                      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                        setGalleryRatio(`${img.naturalWidth} / ${img.naturalHeight}`);
                      }
                    }
                  }}
                />
                {i === 0 && product.isNew && (
                  <span className="absolute top-4 left-4 bg-ink text-paper label-tag px-3 py-1 z-10">
                    New
                  </span>
                )}
                {hasFrontBack && (activeIndex === frontIndex || activeIndex === backIndex) && (
                  <span className="absolute top-4 right-4 bg-paper/90 text-ink label-tag px-3 py-1 z-10 border border-ink/20">
                    {activeIndex === backIndex ? "Back" : "Front"}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Thumbnail strip */}
          {gallery.length > 1 && (
            <div className="flex items-center gap-3 mt-4 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => scrollToImage(i)}
                  className={`relative flex-none w-14 sm:w-16 h-16 sm:h-20 overflow-hidden border-2 transition-all duration-300 ${
                    activeIndex === i
                      ? "border-ink opacity-100 ring-1 ring-ink/20"
                      : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Scroll hint for single-image products */}
          {gallery.length > 1 && (
            <p className="text-center text-xs text-ash mt-3 label-tag tracking-wider">
              {activeIndex + 1} / {gallery.length}
            </p>
          )}
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label-tag text-ash text-xs sm:text-sm">{product.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl mt-1 sm:mt-2 leading-tight">{product.name}</h1>

          <div className="flex items-baseline gap-3 mt-3 sm:mt-4">
            <span className="text-xl sm:text-2xl font-medium">Rs {product.price.toLocaleString()}</span>
            {product.compareAtPrice && (
              <span className="text-ash line-through text-lg">
                Rs {product.compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          <p className="text-ash mt-6 leading-relaxed">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="label-tag text-ash block mb-1">Fabric</span>
              <span>{product.fabric}</span>
            </div>
            <div>
              <span className="label-tag text-ash block mb-1">Fit</span>
              <span>{product.fit}</span>
            </div>
          </div>

            {product.colors.length > 0 && (
            <div className="mt-8">
            <span className="label-tag block mb-3">Colour — {color}</span>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
              {product.colors.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm border transition-colors whitespace-nowrap flex-none ${
                    color === c ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {hasFrontBack && (
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => scrollToImage(frontIndex)}
                  className={`flex-1 py-2.5 text-xs sm:text-sm label-tag border transition-colors ${
                    activeIndex === frontIndex ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  Front
                </button>
                <button
                  onClick={() => scrollToImage(backIndex)}
                  className={`flex-1 py-2.5 text-xs sm:text-sm label-tag border transition-colors ${
                    activeIndex === backIndex ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  Back
                </button>
              </div>
            )}
          </div>
          )}

          <div className="mt-6">
            <span className="label-tag block mb-3">Size — {size}</span>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 border text-sm transition-colors ${
                    size === s ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-ink text-paper py-4 label-tag hover:bg-graphite transition-colors relative overflow-hidden"
            >
              {added ? "Added to Bag ✓" : "Add to Bag"}
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-ink py-4 label-tag hover:bg-ink hover:text-paper transition-colors"
            >
              Buy Now
            </button>
          </div>

          <p className="text-xs text-ash mt-4">
            Cash on Delivery available. Karachi delivery in 2–4 business days.
          </p>
        </motion.div>
      </div>

      {related.length > 0 && (
        <>
          <StitchDivider className="my-20 opacity-30" />
          <div>
            <h2 className="font-display text-3xl mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5 gap-y-10">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
