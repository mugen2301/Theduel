import type { ReactNode } from "react";

type PanelProps = {
  title: string;
  kicker: string;
  children: ReactNode;
};

export function Panel({ title, kicker, children }: PanelProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">{kicker}</p>
      <h2 className="mt-1 font-display text-xl font-black text-bone">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
