import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  mode: "login" | "signup";
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({ mode, title, description, children }: AuthCardProps) {
  return (
    <main className="grid min-h-screen place-items-center bg-ink px-4 py-10 text-bone">
      <section className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-glow sm:p-8">
        <Link href="/" className="font-display text-xl font-black uppercase tracking-[0.18em]">
          The Duel
        </Link>
        <p className="mt-8 text-xs font-black uppercase tracking-[0.22em] text-volt">
          Customer account
        </p>
        <h1 className="mt-2 font-display text-4xl font-black leading-none">{title}</h1>
        <p className="mt-4 text-sm leading-6 text-steel">{description}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-center text-sm text-steel">
          {mode === "login" ? "New to The Duel?" : "Already have an account?"}{" "}
          <Link href={mode === "login" ? "/auth/signup" : "/auth/login"} className="font-black text-volt">
            {mode === "login" ? "Create account" : "Sign in"}
          </Link>
        </p>
      </section>
    </main>
  );
}
