"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";

const METHOD_LABELS: Record<string, string> = {
  cod: "Cash on Delivery",
  jazzcash: "JazzCash",
  easypaisa: "EasyPaisa",
};

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "—";
  const method = searchParams.get("method") || "cod";
  const isDemo = searchParams.get("demo") === "1";

  return (
    <main className="mx-auto max-w-xl px-5 pt-24 pb-32 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-16 h-16 rounded-full bg-ink text-paper flex items-center justify-center mx-auto mb-6"
      >
        <Check size={28} strokeWidth={2} />
      </motion.div>

      <span className="label-tag text-ash">Order Confirmed</span>
      <h1 className="font-display text-4xl md:text-5xl mt-3">Thank you.</h1>
      <p className="text-ash mt-4 leading-relaxed">
        Your order <span className="text-ink font-medium">#{orderId}</span> has been placed
        with <span className="text-ink font-medium">{METHOD_LABELS[method] || method}</span>.
        We&apos;ll call to confirm before it leaves the atelier.
      </p>

      {method === "cod" && (
        <p className="text-sm font-medium text-ink mt-5">
          Please keep the exact cash amount ready — our rider will collect it on delivery.
        </p>
      )}

      {isDemo && (method === "jazzcash" || method === "easypaisa") && (
        <p className="text-xs text-ash mt-6 bg-chalk px-4 py-3 border border-ink/10">
          Demo mode: this order was recorded without a live {METHOD_LABELS[method]} charge
          because merchant credentials haven&apos;t been added yet. See the README for setup.
        </p>
      )}

      <div className="mt-10 flex items-center justify-center gap-6">
        <Link href="/shop" className="bg-ink text-paper px-8 py-4 label-tag hover:bg-graphite transition-colors">
          Continue Shopping
        </Link>
        <Link href="/" className="label-tag border-b border-ink pb-1">
          Back Home
        </Link>
      </div>
    </main>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center label-tag">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
