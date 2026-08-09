import { Suspense } from "react";
import { getProducts } from "@/lib/products-repo";
import ShopContent from "@/components/ShopContent";

export const dynamic = "force-dynamic";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div className="pt-32 text-center label-tag">Loading...</div>}>
      <ShopContent products={products} />
    </Suspense>
  );
}
