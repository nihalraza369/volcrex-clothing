"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import StitchDivider from "@/components/StitchDivider";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-5 md:px-10 pt-24 pb-32 text-center">
        <span className="label-tag text-ash">Your Bag</span>
        <h1 className="font-display text-5xl mt-3">It&apos;s empty in here.</h1>
        <p className="text-ash mt-4">Nothing here yet — go pick an outfit.</p>
        <Link href="/shop" className="inline-block mt-8 bg-ink text-paper px-8 py-4 label-tag">
          Browse the Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-5 md:px-10 pt-14 pb-24">
      <span className="label-tag text-ash">Your Bag</span>
      <h1 className="font-display text-3xl sm:text-5xl mt-2 mb-8 sm:mb-10">Shopping Bag</h1>
      <StitchDivider className="mb-10 opacity-30" />

      <div className="grid md:grid-cols-3 gap-12">
        <ul className="md:col-span-2 flex flex-col gap-8">
          {items.map((item, index) => (
            <motion.li
              key={index}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-5 border-b border-ink/10 pb-8"
            >
              <div className="relative w-28 h-36 bg-chalk flex-shrink-0 overflow-hidden">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" sizes="112px" />
              </div>
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <Link href={`/product/${item.product.slug}`} className="font-display text-xl hover:underline">
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-ash mt-1">Size {item.size}</p>
                    <p className="text-sm text-ash">{item.product.fabric}</p>
                  </div>
                  <button onClick={() => removeItem(index)} aria-label="Remove item">
                    <Trash2 size={16} strokeWidth={1.5} className="text-ash hover:text-ink" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4">
                  <div className="flex items-center border border-ink/20">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center">
                      <Minus size={13} />
                    </button>
                    <span className="w-10 text-center text-sm">{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center">
                      <Plus size={13} />
                    </button>
                  </div>
                  <span className="font-medium">Rs {(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="md:col-span-1">
          <div className="border border-ink/10 p-6 md:sticky md:top-28">
            <span className="label-tag block mb-6">Order Summary</span>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-ash">Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-ash">Delivery (Pakistan)</span>
              <span>Rs 100</span>
            </div>
            <div className="border-t border-ink/10 pt-4 flex justify-between items-baseline mb-6">
              <span className="label-tag">Total</span>
              <span className="font-display text-2xl">
                Rs {(subtotal + 100).toLocaleString()}
              </span>
            </div>
            <Link
              href="/checkout"
              className="block w-full text-center bg-ink text-paper py-4 label-tag hover:bg-graphite transition-colors"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
