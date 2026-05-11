import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
};

export function StatCard({ label, value, detail, icon: Icon }: StatCardProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">{label}</p>
          <p className="mt-3 font-display text-4xl font-black text-bone">{value}</p>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-full bg-volt text-ink">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-steel">{detail}</p>
    </article>
  );
}
