"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image — mobile */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat md:hidden"
        style={{ backgroundImage: "url(/herobgmobile.png)" }}
      />
      {/* Background image — desktop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden md:block"
        style={{ backgroundImage: "url(/herobgmobile.png)" }}
      />

      {/* Yellow overlay for text readability */}
      <div className="absolute inset-0 bg-ink/50" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 pt-24 pb-20 w-full">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.span
            variants={item}
            className="label-tag text-white/80 tracking-widest2 uppercase block mb-8"
          >
            Expert Bridal Dress — Karachi
          </motion.span>

          <motion.h1
            variants={item}
            className="font-display text-[14vw] leading-[0.88] md:text-[5.5vw] md:leading-[0.92] text-white"
          >
            Crafted for
            <br />
            your special day.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-lg text-white/90 text-lg md:text-xl leading-relaxed font-light"
          >
            Bridal elegance, redefined. Sharara, Gharara, Lehnga, Sarhee, and
            Party Wear — designed to make every bride feel extraordinary.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-12 flex flex-wrap items-center gap-8"
          >
            <Link
              href="/shop"
              className="bg-white text-ink px-10 py-4 label-tag hover:bg-chalk transition-colors duration-300"
            >
              Explore Collection
            </Link>
            <Link
              href="/about"
              className="label-tag text-white/80 border-b border-white/40 pb-1 hover:text-white hover:border-white transition-colors duration-300"
            >
              Our Story
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-16 flex items-center gap-10 text-white/60 label-tag text-xs tracking-widest2"
          >
            <span>Cash on Delivery</span>
            <span className="w-px h-3 bg-white/30" />
            <span>Karachi</span>
            <span className="w-px h-3 bg-white/30" />
            <span>Premium Quality</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
