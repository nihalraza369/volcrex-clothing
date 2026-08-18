"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ArrowRight, Loader2 } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error === "Wrong password" ? "Ghalat password" : data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setError("Kuch ghalt ho gaya. Dobara koshish karo.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="label-tag text-smoke">Expert Bridal Dress</p>
          <h1 className="font-display text-4xl md:text-5xl text-paper mt-3 tracking-wide">
            Admin Studio
          </h1>
          <div className="w-16 h-px bg-smoke/40 mx-auto mt-5" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="border border-smoke/20 bg-charcoal p-8"
        >
          <label className="block label-tag text-smoke mb-3" htmlFor="password">
            Owner Password
          </label>
          <div className="relative">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-smoke" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              autoFocus
              className="w-full bg-ink border border-smoke/25 text-paper pl-11 pr-4 py-3.5 text-sm focus:outline-none focus:border-paper transition-colors placeholder:text-smoke/40"
            />
          </div>

          {error && (
            <p className="mt-3 text-xs text-red-400 label-tag">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-paper text-ink py-3.5 label-tag hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <ArrowRight size={16} />
            )}
            {loading ? "Entering..." : "Enter Dashboard"}
          </button>

          <p className="mt-5 text-[11px] text-smoke/60 text-center label-tag">
            Owner access only
          </p>
        </form>
      </div>
    </div>
  );
}
