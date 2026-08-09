import type { Product } from "@/data/products";
import { serverClient, isSupabaseConfigured } from "@/lib/supabase";
import { products as localProducts } from "@/data/products";

/**
 * Data layer jo shop pages use karti hain.
 *
 * - Jab Supabase configured hai to products live database se aate hain —
 *   admin dashboard se koi edit/delete/add kare to storefront pe turant
 *   dikhta hai.
 * - Jab Supabase configured nahi hai (env values khali hain) to site wahi
 *   `data/products.ts` file use karti hai — taake bina keys ke bhi site chale.
 */

type ProductRow = {
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

function mapRow(row: ProductRow): Product {
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

export async function getProducts(): Promise<Product[]> {
  if (!isSupabaseConfigured()) return localProducts;

  try {
    const { data, error } = await serverClient()
      .from("products")
      .select(
        "id, slug, name, category, price, compare_at_price, fabric, fit, colors, sizes, image, images, description, is_new"
      )
      .order("created_at", { ascending: true });

    if (error) throw error;
    if (data && data.length > 0) return data.map(mapRow);
    return localProducts;
  } catch (err) {
    console.error("getProducts fallback to local data:", err);
    return localProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return localProducts.find((p) => p.slug === slug) ?? null;
  }

  try {
    const { data, error } = await serverClient()
      .from("products")
      .select(
        "id, slug, name, category, price, compare_at_price, fabric, fit, colors, sizes, image, images, description, is_new"
      )
      .eq("slug", slug)
      .maybeSingle();

    if (error) throw error;
    if (data) return mapRow(data);
    return localProducts.find((p) => p.slug === slug) ?? null;
  } catch (err) {
    console.error("getProductBySlug fallback to local data:", err);
    return localProducts.find((p) => p.slug === slug) ?? null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (!isSupabaseConfigured()) {
    return localProducts.find((p) => p.id === id) ?? null;
  }

  try {
    const { data, error } = await serverClient()
      .from("products")
      .select(
        "id, slug, name, category, price, compare_at_price, fabric, fit, colors, sizes, image, images, description, is_new"
      )
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    if (data) return mapRow(data);
    return localProducts.find((p) => p.id === id) ?? null;
  } catch (err) {
    console.error("getProductById fallback to local data:", err);
    return localProducts.find((p) => p.id === id) ?? null;
  }
}
