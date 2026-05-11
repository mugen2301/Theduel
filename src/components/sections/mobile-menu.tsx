"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navItems } from "@/lib/data";

export function MobileMenu() {
  return (
    <details className="group relative md:hidden">
      <summary className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-full border border-white/12 bg-white/8 text-bone [&::-webkit-details-marker]:hidden">
        <Menu className="h-5 w-5 group-open:hidden" />
        <X className="hidden h-5 w-5 group-open:block" />
        <span className="sr-only">Toggle menu</span>
      </summary>
      <div className="absolute right-0 top-14 w-64 rounded-2xl border border-white/12 bg-ink/95 p-3 shadow-2xl backdrop-blur">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-bone transition hover:bg-white/8"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href="#bulk"
          className="mt-2 block rounded-xl bg-bone px-4 py-3 text-center text-sm font-black text-ink transition hover:bg-volt"
        >
          Start order
        </Link>
      </div>
    </details>
  );
}
