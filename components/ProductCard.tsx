"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link href={`/product/${product.slug}`} className="group block">
        <div className="relative aspect-[3/4] overflow-hidden bg-chalk">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-ink text-paper label-tag px-2.5 py-1 text-[10px]">
              New
            </span>
          )}
          {product.compareAtPrice && (
            <span className="absolute top-3 right-3 bg-paper text-ink label-tag px-2.5 py-1 text-[10px] border border-ink/10">
              Sale
            </span>
          )}

          {/* Hover-reveal panel */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out bg-paper/95 backdrop-blur-sm px-4 py-3">
            <span className="label-tag text-ink">View Details →</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-start">
          <div>
            <p className="font-body text-sm font-medium text-ink">{product.name}</p>
            <p className="text-xs text-ash mt-1">{product.fabric}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-ink">Rs {product.price.toLocaleString()}</p>
            {product.compareAtPrice && (
              <p className="text-xs text-ash line-through">
                Rs {product.compareAtPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
