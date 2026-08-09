"use client";

import { useState } from "react";
import StitchDivider from "@/components/StitchDivider";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-5 md:px-10 pt-14 pb-24">
      <span className="label-tag text-ash">Get in Touch</span>
      <h1 className="font-display text-5xl mt-2 mb-10">Contact Us</h1>
      <StitchDivider className="mb-10 opacity-30" />

      {sent ? (
        <div className="border border-ink/10 p-8 text-center">
          <p className="font-display text-2xl">Message sent.</p>
          <p className="text-ash mt-2">We&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="flex flex-col gap-4"
        >
          <input required type="text" placeholder="Name" className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink" />
          <input required type="tel" placeholder="Phone Number" className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink" />
          <textarea required placeholder="Your message" rows={5} className="border border-ink/20 px-4 py-3 text-sm focus:outline-none focus:border-ink" />
          <button type="submit" className="bg-ink text-paper py-4 label-tag hover:bg-graphite transition-colors">
            Send Message
          </button>
        </form>
      )}

      <div className="mt-14 grid sm:grid-cols-3 gap-8 text-sm">
        <div>
          <span className="label-tag text-ash block mb-2">Location</span>
          <span>Karachi, Pakistan</span>
        </div>
        <div>
          <span className="label-tag text-ash block mb-2">Delivery Area</span>
          <span>Karachi only, for now</span>
        </div>
        <div>
          <span className="label-tag text-ash block mb-2">Payments Accepted</span>
          <span>Cash on Delivery</span>
        </div>
      </div>
    </main>
  );
}
