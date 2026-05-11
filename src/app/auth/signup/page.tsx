import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/components/auth/auth-card";

export const metadata: Metadata = {
  title: "Create Account | The Duel",
  description: "Create a The Duel customer account for teamwear orders, artwork approvals, and reorders."
};

export default function SignupPage() {
  return (
    <AuthCard
      mode="signup"
      title="Create your account."
      description="Start a customer workspace for saved designs, bulk orders, artwork approvals, and factory tracking."
    >
      <form className="grid gap-4">
        <AuthField label="Full name" type="text" />
        <AuthField label="Company or team" type="text" />
        <AuthField label="Email" type="email" />
        <AuthField label="Password" type="password" />
        <Link href="/dashboard" className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-bone text-sm font-black text-ink hover:bg-volt">
          Create account
        </Link>
      </form>
    </AuthCard>
  );
}

function AuthField({ label, type }: { label: string; type: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <input
        type={type}
        className="h-12 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt"
      />
    </label>
  );
}
