import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/products-repo";
import ProductDetail from "@/components/ProductDetail";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getProducts();
  const related = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return <ProductDetail product={product} related={related} />;
}
