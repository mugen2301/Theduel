import { AlertTriangle, Clock3 } from "lucide-react";
import type { ReactNode } from "react";
import type { ProductionOrder, StaffMember } from "@/lib/erp/production-types";
import { PriorityPill, StatusPill } from "./status-pill";

type PriorityPanelProps = {
  orders: ProductionOrder[];
  staff: StaffMember[];
};

export function PriorityPanel({ orders, staff }: PriorityPanelProps) {
  const priorityOrders = orders.filter((order) => order.priority === "urgent" || order.priority === "high");
  const delayedOrders = orders.filter((order) => order.status === "delayed" || order.status === "blocked");

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <Panel title="Priority orders" icon={<Clock3 className="h-5 w-5" />}>
        {priorityOrders.map((order) => (
          <OrderRow key={order.id} order={order} staff={staff.find((member) => member.id === order.assignedTo)?.name} />
        ))}
      </Panel>
      <Panel title="Delayed and blocked" icon={<AlertTriangle className="h-5 w-5" />}>
        {delayedOrders.map((order) => (
          <OrderRow key={order.id} order={order} staff={staff.find((member) => member.id === order.assignedTo)?.name} />
        ))}
      </Panel>
    </section>
  );
}

function Panel({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
      <div className="mb-4 flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-full bg-ember/15 text-ember">{icon}</div>
        <h2 className="font-display text-2xl font-black text-bone">{title}</h2>
      </div>
      <div className="grid gap-3">{children}</div>
    </article>
  );
}

function OrderRow({ order, staff }: { order: ProductionOrder; staff?: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-black text-bone">{order.orderNumber}</p>
          <p className="mt-1 text-sm text-steel">{order.customer}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <PriorityPill priority={order.priority} />
          <StatusPill status={order.status} />
        </div>
      </div>
      <div className="mt-3 grid gap-2 text-sm text-steel sm:grid-cols-3">
        <span>{order.designName}</span>
        <span>Due {order.dueDate}</span>
        <span>{staff ?? "Unassigned"}</span>
      </div>
    </div>
  );
}
