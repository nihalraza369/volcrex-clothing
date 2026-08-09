import { createClient } from "@supabase/supabase-js";

/**
 * Supabase configuration helpers.
 *
 * Shop (public reads) uses the anon key. Admin API routes use the
 * service-role key so they can bypass Row Level Security.
 *
 * Add these to `.env.local`:
 *   NEXT_PUBLIC_SUPABASE_URL=
 *   NEXT_PUBLIC_SUPABASE_ANON_KEY=
 *   SUPABASE_SERVICE_ROLE_KEY=
 *
 * Jab tak env values nahi daalte, `isSupabaseConfigured()` false hota hai aur
 * website/store front wahi `data/products.ts` file use karta hai.
 */

export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function isAdminConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseServiceKey);
}

/** Client for public (anon) reads — used by the shop pages. */
export function serverClient() {
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Client with the service-role key — used ONLY by admin API routes/seed. */
export function adminClient() {
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/** Public URL for a file stored in Supabase Storage. */
export function storagePublicUrl(bucket: string, path: string): string {
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}
