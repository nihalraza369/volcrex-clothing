"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteProductButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (!confirm) {
      setConfirm(true);
      setTimeout(() => setConfirm(false), 3000);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Delete failed");
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError("Kuch ghalt ho gaya");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        onClick={handleDelete}
        disabled={loading}
        className={`label-tag text-xs px-3 py-1.5 border transition-colors flex items-center gap-1.5 ${
          confirm
            ? "bg-red-600 text-white border-red-600"
            : "border-ink/20 text-ash hover:border-red-400 hover:text-red-600"
        }`}
      >
        {loading ? (
          <Loader2 size={12} className="animate-spin" />
        ) : (
          <Trash2 size={12} />
        )}
        {confirm ? "Confirm?" : "Delete"}
      </button>
      {error && <span className="text-[10px] text-red-600 label-tag">{error}</span>}
    </div>
  );
}
