"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * The signature element: a single basting-stitch thread that draws itself
 * across the page whenever it scrolls into view. It's the one recurring
 * motif tying every section back to "Sartoria" — the tailor's atelier.
 */
export default function StitchDivider({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const stroke = variant === "dark" ? "#FAF9F6" : "#0A0A0A";

  return (
    <div ref={ref} className={`w-full ${className}`}>
      <svg
        viewBox="0 0 1200 24"
        width="100%"
        height="24"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.line
          x1="0"
          y1="12"
          x2="1200"
          y2="12"
          stroke={stroke}
          strokeWidth="1"
          strokeDasharray="10 8"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
