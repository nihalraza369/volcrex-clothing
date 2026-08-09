#!/usr/bin/env node
/**
 * Oura Sartoria — seed script
 *
 * `data/products.ts` ke existing products ko Supabase products table mein
 * insert/upsert karta hai. Taake admin dashboard mein pehle se wahi
 * products dikhein jo shop mein hain.
 *
 * Run karo (Supabase env values `.env.local` mein hone chahiye):
 *   npm run seed
 *
 * Pehle `supabase/schema.sql` SQL Editor mein run karna mat bhoolna.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { createClient } from "@supabase/supabase-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

// --- Tiny .env loader (dotenv dependency ke bina) ---------------
function loadEnv() {
  for (const file of [".env.local", ".env"]) {
    const path = join(root, file);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const value = trimmed.slice(eq + 1).trim().replace(/^['"]|['"]$/g, "");
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}
loadEnv();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error(
    "\x1b[31mSupabase configured nahi hai.\x1b[0m\n" +
      ".env.local mein ye set karo:\n" +
      "  NEXT_PUBLIC_SUPABASE_URL=\n" +
      "  NEXT_PUBLIC_SUPABASE_ANON_KEY=\n" +
      "  SUPABASE_SERVICE_ROLE_KEY=\n"
  );
  process.exit(1);
}

// --- data/products.ts ko import karne ke liye TS-stripped ESM -----
const source = readFileSync(join(root, "data", "products.ts"), "utf8");
const moduleSource = source
  .replace(/export type[\s\S]*?\n\};/, "") // type aliases hatao
  .replace(/export const/g, "const")
  .replace(/ as const;/g, ";");
const dataUrl =
  "data:text/javascript;base64," + Buffer.from(moduleSource).toString("base64");
const { products } = await import(dataUrl);

// --- Supabase client (service-role bypasses RLS) -----------------
const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function toRow(p) {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    category: p.category,
    price: p.price,
    compare_at_price: p.compareAtPrice ?? null,
    fabric: p.fabric ?? "",
    fit: p.fit ?? "",
    colors: p.colors ?? [],
    sizes: p.sizes ?? [],
    image: p.image ?? "",
    images: p.images ?? [],
    description: p.description ?? "",
    is_new: Boolean(p.isNew),
  };
}

console.log(`Seeding ${products.length} products...`);

const rows = products.map(toRow);
const { error } = await supabase
  .from("products")
  .upsert(rows, { onConflict: "id" });

if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log("\x1b[32mDone! Products Supabase mein hain.\x1b[0m");
console.log("Ab /admin pe login karo — wahan sab products dikhenge.");
