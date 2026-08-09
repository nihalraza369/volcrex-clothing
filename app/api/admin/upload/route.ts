import { NextRequest, NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  isAdminConfigured,
  adminClient,
  storagePublicUrl,
  isSupabaseConfigured,
} from "@/lib/supabase";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/jfif", "image/gif", "image/avif"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

const EXT_MAP: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/jfif": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Sirf image files upload karo (jpg, png, webp, gif, avif)" },
        { status: 400 }
      );
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image 5MB se bari hai. Chhoti image choose karo." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = EXT_MAP[file.type] ?? "jpg";
    const name = `products/${crypto.randomUUID()}.${ext}`;

    // --- Supabase Storage (persistent) -------------------------
    if (isAdminConfigured()) {
      const { error } = await adminClient().storage
        .from("product-images")
        .upload(name, buffer, { contentType: file.type, upsert: true });

      if (error) {
        if (error.message.toLowerCase().includes("bucket")) {
          return NextResponse.json(
            {
              error:
                "Storage bucket nahi mila. Supabase mein supabase/schema.sql run karo.",
            },
            { status: 500 }
          );
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      return NextResponse.json({
        url: storagePublicUrl("product-images", name),
      });
    }

    // --- Local fallback (sirf dev/local testing ke liye) -------
    // Note: Vercel jaisi serverless hosting pe ye files persist nahi hotin.
    // Production mein Supabase storage use karo.
    if (!isSupabaseConfigured()) {
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      const fileName = path.basename(name);
      await writeFile(path.join(uploadsDir, fileName), buffer);
      return NextResponse.json({ url: `/uploads/${fileName}` });
    }

    return NextResponse.json(
      {
        error:
          "Supabase storage keys nahi hain. .env.local mein SUPABASE_SERVICE_ROLE_KEY set karo.",
      },
      { status: 500 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Upload failed" },
      { status: 500 }
    );
  }
}
