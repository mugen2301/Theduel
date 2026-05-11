import { AlertTriangle, CalendarDays, Shirt, UserRound } from "lucide-react";
import type { ProductionOrder, StaffMember } from "@/lib/erp/production-types";
import { cn } from "@/lib/utils";
import { PriorityPill, StatusPill } from "./status-pill";

type ProductionCardProps = {
  order: ProductionOrder;
  staff?: StaffMember;
};

export function ProductionCard({ order, staff }: ProductionCardProps) {
  const completion = Math.min(100, Math.round((order.completedPieces / order.quantity) * 100));

  return (
    <article
      className={cn(
        "rounded-2xl border bg-[#0d1219] p-4 shadow-[0_18px_55px_rgba(0,0,0,0.22)]",
        order.status === "delayed" || order.status === "blocked" ? "border-ember/50" : "border-white/10"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-black text-bone">{order.orderNumber}</p>
          <p className="mt-1 line-clamp-2 text-xs leading-5 text-steel">{order.customer}</p>
        </div>
        <PriorityPill priority={order.priority} />
      </div>

      <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.035] p-3">
        <p className="font-display text-lg font-black leading-tight text-bone">{order.designName}</p>
        <div className="mt-3 flex items-center gap-2 text-xs font-bold text-steel">
          <Shirt className="h-4 w-4 text-volt" />
          {order.product} / {order.quantity} pcs
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusPill status={order.status} />
        {order.rejectedPieces > 0 ? (
          <span className="inline-flex h-7 items-center rounded-full bg-red-500/15 px-3 text-xs font-black text-red-300">
            {order.rejectedPieces} rejected
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-steel">
          <span>{order.completedPieces}/{order.quantity} pieces</span>
          <span>{completion}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-volt" style={{ width: `${completion}%` }} />
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-xs font-bold text-steel">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-ember" />
          {staff ? `${staff.name} / ${staff.role}` : "Unassigned"}
        </div>
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-ember" />
          Due {order.dueDate}
        </div>
      </div>

      {order.blockers.length > 0 ? (
        <div className="mt-4 rounded-xl border border-ember/30 bg-ember/10 p-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-ember">
            <AlertTriangle className="h-4 w-4" />
            Blocker
          </div>
          <p className="mt-2 text-xs leading-5 text-bone/78">{order.blockers[0]}</p>
        </div>
      ) : null}
    </article>
  );
}
