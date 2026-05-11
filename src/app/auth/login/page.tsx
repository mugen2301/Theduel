import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Login | The Duel",
  description: "Sign in to manage The Duel orders, artwork approvals, invoices, and saved designs."
};

export default function LoginPage() {
  return (
    <AuthCard
      mode="login"
      title="Welcome back."
      description="Sign in to track orders, approve artwork, download invoices, and reorder previous teamwear designs."
    >
      <form className="grid gap-4">
        <AuthField label="Email" type="email" defaultValue="kamal@theduel.in" />
        <AuthField label="Password" type="password" defaultValue="password" />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-steel">
            <input type="checkbox" className="h-4 w-4 rounded border-white/20 bg-ink" />
            Remember me
          </label>
          <button type="button" className="font-black text-volt">Forgot password?</button>
        </div>
        <Link href="/dashboard" className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-bone text-sm font-black text-ink hover:bg-volt">
          Sign in
        </Link>
      </form>
    </AuthCard>
  );
}

function AuthField({ label, type, defaultValue }: { label: string; type: string; defaultValue?: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <input
        type={type}
        defaultValue={defaultValue}
        className="h-12 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
      />
    </label>
  );
}
