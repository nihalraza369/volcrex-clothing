"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Shirt,
  Plus,
  Store,
  LogOut,
  Menu,
  X,
} from "lucide-react";

const LINKS = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Shirt },
  { href: "/admin/products/new", label: "Add Product", icon: Plus },
  { href: "/", label: "View Shop", icon: Store },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/admin/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  };

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 bg-ink text-paper flex items-center justify-between px-5 h-16 border-b border-smoke/15">
        <span className="font-display text-xl tracking-wide">OURA — ADMIN</span>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
          className="flex items-center justify-center w-10 h-10 border border-smoke/25"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          open ? "flex" : "hidden"
        } md:flex flex-col bg-ink text-paper w-60 fixed inset-y-0 left-0 z-20 border-r border-smoke/10`}
      >
        <div className="px-6 pt-8 pb-6 border-b border-smoke/10 hidden md:block">
          <p className="font-display text-2xl tracking-wide leading-none">
            OURA
          </p>
          <p className="label-tag text-smoke text-[10px] mt-1">Admin Studio</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          {LINKS.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 text-sm label-tag transition-colors ${
                  active
                    ? "bg-paper text-ink"
                    : "text-smoke hover:bg-charcoal hover:text-paper"
                }`}
              >
                <Icon size={16} strokeWidth={1.5} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 pb-8">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm label-tag text-smoke hover:bg-charcoal hover:text-paper transition-colors border border-smoke/15"
          >
            <LogOut size={16} strokeWidth={1.5} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
