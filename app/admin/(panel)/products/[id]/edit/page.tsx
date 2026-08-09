import { notFound } from "next/navigation";
import { getProductById } from "@/lib/products-repo";
import ProductForm from "@/components/admin/ProductForm";

export const dynamic = "force-dynamic";

export default async function AdminEditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  return (
    <div>
      <ProductForm mode="edit" initial={product} />
    </div>
  );
}
