import Link from "next/link";
import { getProducts } from "@/lib/products-repo";
import { categories } from "@/data/products";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Layers, Wallet, Sparkles, Plus, ArrowUpRight, type LucideIcon } from "lucide-react";

export const dynamic = "force-dynamic";

const fmt = (n: number) => `Rs ${n.toLocaleString("en-PK")}`;

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="border border-ink/10 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="label-tag text-ash text-[10px]">{label}</p>
          <p className="font-display text-3xl mt-2">{value}</p>
          {sub && <p className="text-xs text-ash mt-1">{sub}</p>}
        </div>
        <Icon size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const products = await getProducts();

  const totalValue = products.reduce((sum, p) => sum + p.price, 0);
  const avg = products.length ? Math.round(totalValue / products.length) : 0;
  const newCount = products.filter((p) => p.isNew).length;
  const cheapest = products.length
    ? products.reduce((min, p) => (p.price < min.price ? p : min), products[0])
    : null;
  const priciest = products.length
    ? products.reduce((max, p) => (p.price > max.price ? p : max), products[0])
    : null;

  const categoryCounts = categories
    .filter((c) => c !== "All")
    .map((cat) => ({
      cat,
      count: products.filter((p) => p.category === cat).length,
    }));

  const maxCount = Math.max(1, ...categoryCounts.map((c) => c.count));
  const recent = [...products].slice(0, 5);

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="label-tag text-ash">Overview</span>
          <h1 className="font-display text-4xl mt-1">Dashboard</h1>
        </div>
        <Link
          href="/admin/products/new"
          className="hidden sm:flex items-center gap-2 bg-ink text-paper px-5 py-3 label-tag hover:bg-graphite transition-colors"
        >
          <Plus size={15} />
          Add Product
        </Link>
      </div>

      {!isSupabaseConfigured() && (
        <p className="text-xs text-ash mb-6 label-tag tracking-normal normal-case">
          Note: abhi local shop data dikh raha hai (Supabase connect nahi hai).
          Ye stats sirf products ki file par base hain.
        </p>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Layers} label="Total Products" value={String(products.length)} />
        <StatCard icon={Sparkles} label="New Arrivals" value={String(newCount)} />
        <StatCard icon={Wallet} label="Avg Price" value={fmt(avg)} />
        <StatCard
          icon={Layers}
          label="Collection Value"
          value={fmt(totalValue)}
          sub={`${products.length} dresses`}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Category breakdown */}
        <div className="border border-ink/10 bg-white p-6">
          <h2 className="font-display text-2xl mb-5">By Category</h2>
          <div className="space-y-4">
            {categoryCounts.map(({ cat, count }) => (
              <div key={cat}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="label-tag">{cat}</span>
                  <span className="text-ash text-xs">{count}</span>
                </div>
                <div className="h-1.5 bg-chalk">
                  <div
                    className="h-full bg-ink transition-all"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price extremes */}
        <div className="border border-ink/10 bg-white p-6">
          <h2 className="font-display text-2xl mb-5">Price Range</h2>
          {cheapest && priciest && (
            <div className="space-y-4">
              <div className="flex justify-between items-center py-4 border-b border-ink/5">
                <div>
                  <p className="label-tag text-ash text-[10px] mb-1">Cheapest</p>
                  <p className="font-medium">{cheapest.name}</p>
                </div>
                <span className="label-tag">{fmt(cheapest.price)}</span>
              </div>
              <div className="flex justify-between items-center py-4 border-b border-ink/5">
                <div>
                  <p className="label-tag text-ash text-[10px] mb-1">Priciest</p>
                  <p className="font-medium">{priciest.name}</p>
                </div>
                <span className="label-tag">{fmt(priciest.price)}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="label-tag text-ash text-[10px] mb-1">Average</p>
                  <p className="font-medium">All products</p>
                </div>
                <span className="label-tag">{fmt(avg)}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent products */}
      <div className="border border-ink/10 bg-white mt-6">
        <div className="flex items-center justify-between px-6 py-4 border-b border-ink/5">
          <h2 className="font-display text-xl">Recent Products</h2>
          <Link
            href="/admin/products"
            className="label-tag flex items-center gap-1 text-ash hover:text-ink transition-colors"
          >
            View all <ArrowUpRight size={13} />
          </Link>
        </div>
        <ul className="divide-y divide-ink/5">
          {recent.map((p) => (
            <li key={p.id} className="flex items-center gap-4 px-6 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image || "/herobg.png"}
                alt={p.name}
                className="w-12 h-14 object-cover bg-chalk"
              />
              <div className="flex-1 min-w-0">
                <p className="truncate font-medium text-sm">{p.name}</p>
                <p className="text-xs text-ash">{p.category}</p>
              </div>
              <span className="label-tag text-xs">{fmt(p.price)}</span>
              <Link
                href={`/admin/products/${p.id}/edit`}
                className="label-tag text-xs border border-ink/20 px-3 py-1.5 hover:border-ink transition-colors"
              >
                Edit
              </Link>
            </li>
          ))}
          {recent.length === 0 && (
            <li className="px-6 py-10 text-center text-ash label-tag">
              Koi product nahi. Pehla product add karo.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
