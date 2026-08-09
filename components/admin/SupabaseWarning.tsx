import { isSupabaseConfigured } from "@/lib/supabase";

export default function SupabaseWarning() {
  if (isSupabaseConfigured()) return null;

  return (
    <div className="bg-yellow-50 border-b border-yellow-300 px-5 md:px-10 py-3">
      <p className="text-xs md:text-sm text-yellow-900">
        <span className="font-semibold label-tag">Setup needed:</span>{" "}
        <span className="label-tag normal-case tracking-normal">
          Supabase connect nahi hai. Add product/edit kaam nahi karega jab tak
          .env.local mein NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY aur
          SUPABASE_SERVICE_ROLE_KEY na lag jayein, aur supabase/schema.sql run na
          ho. Tab tak ye list wahi shop data (data/products.ts) dikha rahi hai.
        </span>
      </p>
    </div>
  );
}
