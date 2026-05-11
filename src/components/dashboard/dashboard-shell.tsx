"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Bell,
  CreditCard,
  FileCheck2,
  FolderHeart,
  Home,
  LogOut,
  Menu,
  Package,
  Shirt,
  User,
  X
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Overview", href: "/dashboard", icon: Home },
  { label: "Orders", href: "/dashboard/orders", icon: Package },
  { label: "Artwork", href: "/dashboard/artwork", icon: FileCheck2 },
  { label: "Production", href: "/dashboard/production", icon: Shirt },
  { label: "Invoices", href: "/dashboard/invoices", icon: CreditCard },
  { label: "Saved Designs", href: "/dashboard/designs", icon: FolderHeart },
  { label: "Profile", href: "/dashboard/profile", icon: User }
];

type DashboardShellProps = {
  children: ReactNode;
};

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080b10] text-bone">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-72 border-r border-white/10 bg-ink/96 p-4 transition duration-300 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-14 items-center justify-between">
          <Link href="/dashboard" className="font-display text-xl font-black uppercase tracking-[0.18em]">
            The Duel
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-steel lg:hidden"
            aria-label="Close dashboard menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex h-12 items-center gap-3 rounded-xl px-3 text-sm font-bold transition",
                  active ? "bg-volt text-ink" : "text-steel hover:bg-white/8 hover:text-bone"
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">Customer account</p>
          <p className="mt-2 text-sm font-black text-bone">Northside Cricket Academy</p>
          <Link href="/auth/login" className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-ember">
            <LogOut className="h-4 w-4" />
            Sign out
          </Link>
        </div>
      </aside>

      {open ? <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setOpen(false)} /> : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#080b10]/88 backdrop-blur">
          <div className="flex h-[72px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-bone lg:hidden"
                aria-label="Open dashboard menu"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.22em] text-volt">Customer dashboard</p>
                <p className="mt-1 text-sm text-steel">Orders, approvals, production and reorders</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-steel hover:text-bone" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </button>
              <div className="hidden h-11 items-center rounded-full border border-white/10 bg-white/[0.045] px-4 text-sm font-black sm:flex">
                KS
              </div>
            </div>
          </div>
        </header>

        <main className="px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
