"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";
import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import ImageUpload from "@/components/admin/ImageUpload";

const CATEGORY_OPTIONS = categories.filter((c) => c !== "All");

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/['"’]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || "product"
  );
}

type Props = {
  mode: "create" | "edit";
  initial?: Product;
};

const inputClass =
  "w-full border border-ink/20 bg-white px-4 py-3 text-sm focus:outline-none focus:border-ink transition-colors";
const labelClass = "label-tag text-ash block mb-2 text-[10px]";

export default function ProductForm({ mode, initial }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [category, setCategory] = useState(initial?.category ?? "Formal");
  const [price, setPrice] = useState(initial ? String(initial.price) : "");
  const [compareAtPrice, setCompareAtPrice] = useState(
    initial?.compareAtPrice ? String(initial.compareAtPrice) : ""
  );
  const [fabric, setFabric] = useState(initial?.fabric ?? "");
  const [fit, setFit] = useState(initial?.fit ?? "");
  const [colors, setColors] = useState(initial?.colors.join(", ") ?? "");
  const [sizes, setSizes] = useState(initial?.sizes.join(", ") ?? "");
  const [image, setImage] = useState(initial?.image ?? "");
  const [gallery, setGallery] = useState<string[]>(initial?.images?.length ? initial.images : []);
  const [description, setDescription] = useState(initial?.description ?? "");
  const [isNew, setIsNew] = useState(Boolean(initial?.isNew));

  const liveSlug = useMemo(() => (slugTouched ? slug : slugify(name)), [slug, slugTouched, name]);

  const splitList = (v: string) =>
    v
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const payload = {
      id: initial?.id,
      slug: liveSlug,
      name,
      category,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      fabric,
      fit,
      colors: splitList(colors),
      sizes: splitList(sizes),
      image,
      images: gallery.filter(Boolean),
      description,
      isNew,
    };

    try {
      const url =
        mode === "edit" && initial
          ? `/api/admin/products/${initial.id}`
          : "/api/admin/products";
      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Kuch ghalt ho gaya");
        setSaving(false);
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError("Kuch ghalt ho gaya. Dobara koshish karo.");
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 label-tag text-[10px] text-ash hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} /> Back
        </button>
        <h1 className="font-display text-3xl">
          {mode === "edit" ? "Edit Product" : "Add Product"}
        </h1>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 mb-6 label-tag text-[11px] tracking-normal">
          {error}
        </div>
      )}

      {/* Name & slug */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Product Name *</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={inputClass}
            placeholder="e.g. Ivory Oxford Formal"
          />
        </div>
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input
            value={liveSlug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugTouched(true);
            }}
            className={inputClass}
            placeholder="auto-generated"
          />
          <p className="text-[10px] text-ash mt-1 label-tag tracking-normal normal-case">
            URL mein yahi dikhega: /product/{liveSlug || "..."}
          </p>
        </div>
      </div>

      {/* Category & price */}
      <div className="grid md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className={labelClass}>Category *</label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as (typeof CATEGORY_OPTIONS)[number])
            }
            className={inputClass}
          >
            {CATEGORY_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Price (Rs) *</label>
          <input
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            className={inputClass}
            placeholder="4990"
          />
        </div>
        <div>
          <label className={labelClass}>Compare-at Price (optional)</label>
          <input
            type="number"
            min="0"
            value={compareAtPrice}
            onChange={(e) => setCompareAtPrice(e.target.value)}
            className={inputClass}
            placeholder="5990"
          />
        </div>
      </div>

      {/* Fabric & fit */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Fabric</label>
          <input
            value={fabric}
            onChange={(e) => setFabric(e.target.value)}
            className={inputClass}
            placeholder="100% Cotton Oxford"
          />
        </div>
        <div>
          <label className={labelClass}>Fit</label>
          <input
            value={fit}
            onChange={(e) => setFit(e.target.value)}
            className={inputClass}
            placeholder="Slim Fit"
          />
        </div>
      </div>

      {/* Colors & sizes */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        <div>
          <label className={labelClass}>Colors (comma separated)</label>
          <input
            value={colors}
            onChange={(e) => setColors(e.target.value)}
            className={inputClass}
            placeholder="Black, White, Gray"
          />
        </div>
        <div>
          <label className={labelClass}>Sizes (comma separated)</label>
          <input
            value={sizes}
            onChange={(e) => setSizes(e.target.value)}
            className={inputClass}
            placeholder="S, M, L, XL"
          />
        </div>
      </div>

      {/* Images */}
      <div className="border border-ink/10 bg-white p-5 mb-5">
        <div className="grid md:grid-cols-2 gap-6">
          <ImageUpload
            label="Main Image"
            value={image}
            onChange={setImage}
            hint="Ye shop card aur detail page pe pehli image dikhegi."
          />
          <div>
            <span className="label-tag text-ash block mb-2 text-[10px]">
              Gallery Images
            </span>
            <div className="space-y-3">
              {gallery.map((src, i) => (
                <div key={i} className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`Gallery ${i + 1}`}
                    className="w-12 h-14 object-cover bg-chalk border border-ink/10"
                  />
                  <input
                    value={src}
                    onChange={(e) =>
                      setGallery((g) => g.map((s, idx) => (idx === i ? e.target.value : s)))
                    }
                    className="flex-1 border border-ink/20 px-3 py-2 text-xs focus:outline-none focus:border-ink bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setGallery((g) => g.filter((_, idx) => idx !== i))}
                    className="text-ash hover:text-red-600 transition-colors"
                    aria-label="Remove gallery image"
                  >
                    <X size={15} />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => setGallery((g) => [...g, ""])}
                className="label-tag text-[10px] flex items-center gap-1 text-ash hover:text-ink transition-colors"
              >
                <Plus size={12} /> Add gallery image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-5">
        <label className={labelClass}>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className={inputClass}
          placeholder="Shirt ki tafseel..."
        />
      </div>

      {/* isNew */}
      <label className="flex items-center gap-3 mb-8 cursor-pointer">
        <input
          type="checkbox"
          checked={isNew}
          onChange={(e) => setIsNew(e.target.checked)}
          className="w-4 h-4 accent-ink"
        />
        <span className="label-tag text-[10px]">Mark as New Arrival (homepage pe featured)</span>
      </label>

      {/* Submit */}
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-ink text-paper px-8 py-3.5 label-tag hover:bg-graphite transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : null}
          {saving ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Product"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="label-tag text-ash hover:text-ink transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
