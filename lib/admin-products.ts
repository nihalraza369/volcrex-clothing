import type { Product } from "@/data/products";
import { categories } from "@/data/products";
import { isAdminConfigured, adminClient } from "@/lib/supabase";

/**
 * Admin CRUD helpers — product validation, slug generation aur Supabase
 * operations. Sirf server-side (API routes) mein use hota hai.
 */

export type ProductInput = {
  id?: string;
  slug?: string;
  name: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  fabric: string;
  fit: string;
  colors: string[];
  sizes: string[];
  image: string;
  images: string[];
  description: string;
  isNew: boolean;
};

export function slugify(name: string): string {
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

export function parseProductInput(body: unknown): {
  ok: true;
  data: ProductInput;
} | { ok: false; error: string } {
  const b = (body ?? {}) as Record<string, unknown>;

  const name = typeof b.name === "string" ? b.name.trim() : "";
  if (!name) return { ok: false, error: "Product name required" };

  const category = typeof b.category === "string" ? b.category : "";
  if (!(categories as readonly string[]).includes(category)) {
    return { ok: false, error: `Category must be one of: ${categories.join(", ")}` };
  }

  const price = Number(b.price);
  if (!Number.isFinite(price) || price < 0) {
    return { ok: false, error: "Price must be a valid non-negative number" };
  }

  const compareAt = b.compareAtPrice === "" || b.compareAtPrice === undefined
    ? undefined
    : Number(b.compareAtPrice);
  if (compareAt !== undefined && (!Number.isFinite(compareAt) || compareAt < 0)) {
    return { ok: false, error: "Compare-at price must be a valid number" };
  }

  const strArr = (v: unknown): string[] =>
    Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : [];

  const slug = typeof b.slug === "string" && b.slug.trim()
    ? slugify(b.slug)
    : slugify(name);

  return {
    ok: true,
    data: {
      id: typeof b.id === "string" ? b.id : undefined,
      slug,
      name,
      category,
      price: Math.round(price),
      compareAtPrice: compareAt,
      fabric: typeof b.fabric === "string" ? b.fabric.trim() : "",
      fit: typeof b.fit === "string" ? b.fit.trim() : "",
      colors: strArr(b.colors),
      sizes: strArr(b.sizes),
      image: typeof b.image === "string" ? b.image.trim() : "",
      images: strArr(b.images),
      description: typeof b.description === "string" ? b.description.trim() : "",
      isNew: Boolean(b.isNew),
    },
  };
}

function toRow(p: ProductInput) {
  return {
    id: p.id ?? crypto.randomUUID(),
    slug: p.slug ?? slugify(p.name),
    name: p.name,
    category: p.category,
    price: p.price,
    compare_at_price: p.compareAtPrice ?? null,
    fabric: p.fabric,
    fit: p.fit,
    colors: p.colors,
    sizes: p.sizes,
    image: p.image,
    images: p.images,
    description: p.description,
    is_new: p.isNew,
  };
}

type AdminProductRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  compare_at_price: number | null;
  fabric: string;
  fit: string;
  colors: string[];
  sizes: string[];
  image: string;
  images: string[];
  description: string;
  is_new: boolean;
};

export function mapRowToProduct(row: AdminProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Product["category"],
    price: row.price,
    compareAtPrice: row.compare_at_price ?? undefined,
    fabric: row.fabric,
    fit: row.fit,
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    image: row.image,
    images: row.images ?? [],
    description: row.description,
    isNew: row.is_new,
  };
}

export async function listProductsForAdmin(): Promise<Product[]> {
  const client = adminClient();
  const { data, error } = await client
    .from("products")
    .select(
      "id, slug, name, category, price, compare_at_price, fabric, fit, colors, sizes, image, images, description, is_new"
    )
    .order("created_at", { ascending: true });

  if (error) throw new Error(error.message);
  return (data ?? []).map(mapRowToProduct);
}

async function ensureUniqueSlug(slug: string, excludeId?: string): Promise<string> {
  const client = adminClient();
  let candidate = slug;
  let suffix = 2;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const { data } = await client
      .from("products")
      .select("id")
      .eq("slug", candidate)
      .maybeSingle();
    if (!data || data.id === excludeId) return candidate;
    candidate = `${slug}-${suffix}`;
    suffix += 1;
  }
}

export async function createProduct(input: ProductInput): Promise<Product> {
  if (!isAdminConfigured()) {
    throw new Error(
      "Supabase configured nahi hai. .env.local mein NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY set karo."
    );
  }

  const row = toRow(input);
  row.slug = await ensureUniqueSlug(row.slug);

  const client = adminClient();
  const { data, error } = await client
    .from("products")
    .insert(row)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRowToProduct(data);
}

export async function updateProduct(
  id: string,
  input: ProductInput
): Promise<Product> {
  if (!isAdminConfigured()) {
    throw new Error(
      "Supabase configured nahi hai. .env.local mein NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY set karo."
    );
  }

  const row = toRow(input);
  row.id = id;
  row.slug = await ensureUniqueSlug(row.slug, id);

  const client = adminClient();
  const { data, error } = await client
    .from("products")
    .update(row)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRowToProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  if (!isAdminConfigured()) {
    throw new Error(
      "Supabase configured nahi hai. .env.local mein NEXT_PUBLIC_SUPABASE_URL aur SUPABASE_SERVICE_ROLE_KEY set karo."
    );
  }

  const client = adminClient();
  const { error } = await client.from("products").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
