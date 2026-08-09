"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Atelier" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, setCartOpen } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md border-b border-ink/10">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl md:text-3xl tracking-wide text-ink">
              VOLCREX
            </span>
      
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label-tag text-ink hover:text-ash transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setCartOpen(true)}
              aria-label="Open cart"
              className="relative flex items-center justify-center w-10 h-10 border border-ink/20 hover:border-ink transition-colors"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-ink text-paper text-[10px] flex items-center justify-center font-body"
                >
                  {itemCount}
                </motion.span>
              )}
            </button>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden border-t border-ink/10 bg-paper"
          >
            <div className="flex flex-col px-5 py-6 gap-5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="label-tag text-ink text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
