import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
};

export function Button({ href, children, variant = "primary", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition duration-300 focus:outline-none focus:ring-2 focus:ring-volt focus:ring-offset-2 focus:ring-offset-ink",
        variant === "primary" &&
          "bg-bone text-ink hover:bg-volt",
        variant === "secondary" &&
          "border border-white/16 bg-white/8 text-bone hover:border-volt/70 hover:bg-volt/10 hover:text-volt",
        variant === "ghost" &&
          "text-bone hover:bg-white/8",
        className
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
