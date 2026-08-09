"use client";

import { useRef, useState } from "react";
import { Upload, X, Link2, Loader2 } from "lucide-react";

type Props = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  hint?: string;
};

export default function ImageUpload({ label, value, onChange, hint }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [urlDraft, setUrlDraft] = useState("");

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Upload failed");
        return;
      }
      onChange(data.url);
    } catch {
      setError("Upload failed — dobara koshish karo");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handlePasteUrl = () => {
    const url = urlDraft.trim();
    if (!url) return;
    onChange(url);
    setUrlDraft("");
    setShowUrl(false);
  };

  return (
    <div>
      <span className="label-tag text-ash block mb-2">{label}</span>

      {value ? (
        <div className="flex items-start gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={value}
            alt={label}
            className="w-20 h-24 object-cover bg-chalk border border-ink/10"
          />
          <div className="space-y-2">
            <button
              onClick={() => onChange("")}
              className="label-tag text-[10px] flex items-center gap-1 text-ash hover:text-red-600 transition-colors"
            >
              <X size={12} /> Remove image
            </button>
            <button
              onClick={() => inputRef.current?.click()}
              className="label-tag text-[10px] flex items-center gap-1 border border-ink/20 px-3 py-1.5 hover:border-ink transition-colors"
            >
              <Upload size={12} /> Replace
            </button>
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-ink/25 p-6 flex flex-col items-center gap-3 bg-chalk/30">
          {uploading ? (
            <div className="flex items-center gap-2 text-ash">
              <Loader2 size={16} className="animate-spin" />
              <span className="label-tag text-[10px]">Uploading...</span>
            </div>
          ) : (
            <>
              <button
                onClick={() => inputRef.current?.click()}
                className="flex flex-col items-center gap-2 text-ash hover:text-ink transition-colors"
              >
                <Upload size={20} strokeWidth={1.5} />
                <span className="label-tag text-[10px]">Click to upload</span>
              </button>
              <button
                onClick={() => setShowUrl((s) => !s)}
                className="label-tag text-[10px] flex items-center gap-1 text-ash hover:text-ink transition-colors"
              >
                <Link2 size={12} /> or paste image URL
              </button>
            </>
          )}
        </div>
      )}

      {showUrl && (
        <div className="flex gap-2 mt-2">
          <input
            type="text"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            placeholder="https://example.com/image.jpg"
            className="flex-1 border border-ink/20 px-3 py-2 text-sm focus:outline-none focus:border-ink bg-white"
          />
          <button
            onClick={handlePasteUrl}
            className="label-tag text-[10px] border border-ink px-3 hover:bg-ink hover:text-paper transition-colors"
          >
            Use
          </button>
        </div>
      )}

      {error && <p className="text-[11px] text-red-600 mt-1 label-tag">{error}</p>}
      {hint && !error && (
        <p className="text-[11px] text-ash mt-1 label-tag tracking-normal normal-case">{hint}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFile}
        className="hidden"
      />
    </div>
  );
}
