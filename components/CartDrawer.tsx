"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const { items, isCartOpen, setCartOpen, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-ink/50 z-50"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-paper z-50 flex flex-col"
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-ink/10">
              <span className="label-tag">Your Bag ({items.length})</span>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                  <p className="font-display text-2xl">Your bag is empty</p>
                  <p className="text-ash text-sm">Nothing here yet — go pick an outfit.</p>
                  <Link
                    href="/shop"
                    onClick={() => setCartOpen(false)}
                    className="mt-4 label-tag border-b border-ink pb-1"
                  >
                    Browse Shop
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-6">
                  {items.map((item, index) => (
                    <li key={index} className="flex gap-4">
                      <div className="relative w-20 h-24 bg-chalk flex-shrink-0 overflow-hidden">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-body text-sm font-medium">{item.product.name}</p>
                            <p className="text-xs text-ash mt-0.5">
                              Size {item.size}
                            </p>
                          </div>
                          <button onClick={() => removeItem(index)} aria-label="Remove item">
                            <Trash2 size={15} strokeWidth={1.5} className="text-ash hover:text-ink" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-ink/20">
                            <button
                              onClick={() => updateQuantity(index, item.quantity - 1)}
                              className="w-7 h-7 flex items-center justify-center"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(index, item.quantity + 1)}
                              className="w-7 h-7 flex items-center justify-center"
                              aria-label="Increase quantity"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <span className="text-sm font-medium">
                            Rs {(item.product.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-ink/10 px-6 py-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="label-tag">Subtotal</span>
                  <span className="font-display text-2xl">Rs {subtotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-ash mb-4">Shipping calculated at checkout. Pakistan-wide delivery.</p>
                <Link
                  href="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="block w-full text-center bg-ink text-paper py-4 label-tag hover:bg-graphite transition-colors"
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
