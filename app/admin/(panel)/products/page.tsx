import Link from "next/link";
import { getProducts } from "@/lib/products-repo";
import { Plus, Search } from "lucide-react";
import DeleteProductButton from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

const fmt = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="label-tag text-ash">Catalog</span>
          <h1 className="font-display text-4xl mt-1">
            Products{" "}
            <span className="text-ash text-2xl">({products.length})</span>
          </h1>
        </div>
        <Link
          href="/admin/products/new"
          className="flex items-center gap-2 bg-ink text-paper px-5 py-3 label-tag hover:bg-graphite transition-colors"
        >
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="border border-dashed border-ink/20 py-24 text-center">
          <Search size={28} strokeWidth={1} className="mx-auto text-ash" />
          <p className="mt-4 text-ash label-tag">
            Koi product nahi mila. Pehla product add karo.
          </p>
        </div>
      ) : (
        <div className="border border-ink/10 bg-white overflow-x-auto">
          <table className="w-full text-left min-w-[720px]">
            <thead>
              <tr className="border-b border-ink/10">
                <th className="px-5 py-3 label-tag text-[10px] text-ash">Product</th>
                <th className="px-5 py-3 label-tag text-[10px] text-ash">Category</th>
                <th className="px-5 py-3 label-tag text-[10px] text-ash">Price</th>
                <th className="px-5 py-3 label-tag text-[10px] text-ash">Sizes</th>
                <th className="px-5 py-3 label-tag text-[10px] text-ash">Status</th>
                <th className="px-5 py-3 text-right label-tag text-[10px] text-ash">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-chalk/40 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.image || "/herobg.png"}
                        alt={p.name}
                        className="w-11 h-13 object-cover bg-chalk"
                      />
                      <div className="min-w-0">
                        <Link
                          href={`/admin/products/${p.id}/edit`}
                          className="font-medium text-sm hover:underline truncate block"
                        >
                          {p.name}
                        </Link>
                        <p className="text-[11px] text-ash truncate">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className="label-tag text-[10px] border border-ink/15 px-2 py-1">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm font-medium">{fmt(p.price)}</p>
                    {p.compareAtPrice && (
                      <p className="text-[11px] text-ash line-through">
                        {fmt(p.compareAtPrice)}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-3 text-xs text-ash">{p.sizes.join(" · ")}</td>
                  <td className="px-5 py-3">
                    {p.isNew ? (
                      <span className="label-tag text-[10px] bg-ink text-paper px-2 py-1">
                        New
                      </span>
                    ) : (
                      <span className="label-tag text-[10px] text-ash">Active</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/products/${p.id}/edit`}
                        className="label-tag text-xs border border-ink/20 px-3 py-1.5 hover:border-ink transition-colors"
                      >
                        Edit
                      </Link>
                      <DeleteProductButton id={p.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
