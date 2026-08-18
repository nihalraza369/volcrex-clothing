"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import StitchDivider from "@/components/StitchDivider";

type PaymentMethod = "cod";

const PAKISTAN_CITIES = [
  "Karachi", "Lahore", "Islamabad", "Rawalpindi", "Faisalabad",
  "Multan", "Peshawar", "Quetta", "Hyderabad", "Sialkot",
  "Gujranwala", "Bahawalpur", "Sargodha", "Sukkur", "Abbottabad", "Other",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(PAKISTAN_CITIES[0]);
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState<PaymentMethod>("cod");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const delivery = 100;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-2xl px-5 pt-24 pb-32 text-center">
        <h1 className="font-display text-4xl">Your bag is empty</h1>
        <p className="text-ash mt-3">Add an item before checking out.</p>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in your name, phone number, and address.");
      return;
    }
    if (!/^03\d{9}$/.test(phone.trim())) {
      setError("Enter a valid Pakistani mobile number (e.g. 03xxxxxxxxx).");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: total,
          paymentMethod: method,
          customer: { name, phone, address: `${address}, ${city}` },
          items: items.map((i) => ({
            name: i.product.name,
            size: i.size,
            color: i.color,
            quantity: i.quantity,
            price: i.product.price,
          })),
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      // Real gateway mode: auto-submit a form to JazzCash/EasyPaisa's action URL.
      if (data.actionUrl && data.fields) {
        clearCart();
        const form = document.createElement("form");
        form.method = "POST";
        form.action = data.actionUrl;
        Object.entries(data.fields).forEach(([key, value]) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = key;
          input.value = String(value);
          form.appendChild(input);
        });
        document.body.appendChild(form);
        form.submit();
        return;
      }

      // Demo mode / COD: go straight to confirmation.
      clearCart();
      router.push(data.redirectUrl);
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-5 md:px-10 pt-14 pb-24">
      <span className="label-tag text-ash">Checkout</span>
      <h1 className="font-display text-3xl sm:text-5xl mt-2 mb-8 sm:mb-10">Complete Your Order</h1>
      <StitchDivider className="mb-10 opacity-30" />

      <div className="grid md:grid-cols-3 gap-12">
        <form onSubmit={handleSubmit} className="md:col-span-2 flex flex-col gap-8">
          <div>
            <span className="label-tag block mb-4">Delivery Details</span>
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink sm:col-span-2"
              />
              <input
                type="tel"
                placeholder="Mobile Number (03xxxxxxxxx)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink"
              />
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink bg-paper"
              >
                {PAKISTAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <textarea
                placeholder="House / Street / Landmark"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink sm:col-span-2"
              />
            </div>
          </div>

          <div>
            <span className="label-tag block mb-4">Payment Method</span>
            <div className="flex flex-col gap-3">
              {[
                { id: "cod" as const, label: "Cash on Delivery", note: "Pay in cash when your order arrives", tag: "Recommended" },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  onClick={() => setMethod(opt.id)}
                  className={`flex items-center justify-between border px-5 py-4 text-left transition-colors ${
                    method === opt.id ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"
                  }`}
                >
                  <span>
                    <span className="block text-sm font-medium">
                      {opt.label}
                      {opt.tag && (
                        <span className={`ml-2 label-tag text-[10px] px-2 py-0.5 align-middle ${
                          method === opt.id ? "bg-paper text-ink" : "bg-ink text-paper"
                        }`}>
                          {opt.tag}
                        </span>
                      )}
                    </span>
                    <span className={`block text-xs ${method === opt.id ? "text-smoke" : "text-ash"}`}>
                      {opt.note}
                    </span>
                  </span>
                  <span
                    className={`w-4 h-4 rounded-full border flex-shrink-0 ${
                      method === opt.id ? "border-paper bg-paper" : "border-ink/40"
                    }`}
                  />
                </button>
              ))}
            </div>

            {method === "cod" && (
              <p className="text-xs text-ash mt-3 bg-chalk px-4 py-3 border border-ink/10">
                No advance needed — pay Rs {total.toLocaleString()} in cash when your order arrives.
                Our team will call you to confirm before dispatch, so keep your phone close.
              </p>
            )}
          </div>

          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-ink bg-chalk px-4 py-3 border border-ink/20">
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-paper py-4 label-tag hover:bg-graphite transition-colors disabled:opacity-50"
          >
            {loading ? "Processing..." : `Place Order — Rs ${total.toLocaleString()}`}
          </button>
        </form>

        <div className="md:col-span-1">
          <div className="border border-ink/10 p-6 md:sticky md:top-28">
            <span className="label-tag block mb-6">Order Summary</span>
            <ul className="flex flex-col gap-4 mb-6">
              {items.map((item, i) => (
                <li key={i} className="flex justify-between text-sm">
                  <span className="text-ash">
                    {item.product.name} (Size {item.size}) × {item.quantity}
                  </span>
                  <span>Rs {(item.product.price * item.quantity).toLocaleString()}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-ash">Subtotal</span>
              <span>Rs {subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span className="text-ash">Delivery (Pakistan)</span>
              <span>Rs {delivery}</span>
            </div>
            <div className="border-t border-ink/10 pt-4 flex justify-between items-baseline">
              <span className="label-tag">Total</span>
              <span className="font-display text-2xl">Rs {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
