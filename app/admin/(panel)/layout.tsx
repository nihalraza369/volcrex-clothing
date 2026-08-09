import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken, SESSION_COOKIE } from "@/lib/admin-auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SupabaseWarning from "@/components/admin/SupabaseWarning";

export default async function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const store = cookies();
  const isAuthed = await verifySessionToken(store.get(SESSION_COOKIE)?.value);
  if (!isAuthed) redirect("/admin");

  return (
    <div className="min-h-screen bg-paper">
      <AdminSidebar />
      <div className="md:pl-60">
        <SupabaseWarning />
        <main className="px-5 md:px-10 py-8">{children}</main>
      </div>
    </div>
  );
}
