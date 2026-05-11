import { CheckCircle2 } from "lucide-react";
import type { ProductionOrder } from "@/lib/erp/production-types";

type TimelinePanelProps = {
  orders: ProductionOrder[];
};

export function TimelinePanel({ orders }: TimelinePanelProps) {
  const events = orders.flatMap((order) =>
    order.timeline.map((event) => ({
      ...event,
      orderNumber: order.orderNumber,
      designName: order.designName
    }))
  );

  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">Timeline tracking</p>
          <h2 className="mt-1 font-display text-2xl font-black text-bone">Latest production events</h2>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-bone">{events.length} events</span>
      </div>
      <div className="grid gap-3">
        {events.map((event) => (
          <article key={event.id} className="grid gap-3 rounded-xl border border-white/10 bg-black/20 p-4 sm:grid-cols-[auto_1fr]">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-volt text-ink">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-black text-bone">{event.label}</p>
                <p className="text-xs font-bold text-steel">{event.timestamp}</p>
              </div>
              <p className="mt-1 text-sm text-steel">
                {event.orderNumber} / {event.designName} / {event.actor}
              </p>
              <p className="mt-2 text-sm leading-6 text-bone/75">{event.note}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
