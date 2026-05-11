import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { Activity, AlertTriangle, PackageCheck, UsersRound } from "lucide-react";
import { DepartmentQueues } from "@/components/erp/production/department-queues";
import { KanbanBoard } from "@/components/erp/production/kanban-board";
import { PriorityPanel } from "@/components/erp/production/priority-panel";
import { TimelinePanel } from "@/components/erp/production/timeline-panel";
import { productionApi } from "@/lib/erp/production-api";

export const metadata: Metadata = {
  title: "Production Tracking ERP | The Duel",
  description:
    "Factory production tracking dashboard with Kanban workflow, department queues, priority orders, delayed orders, timelines, and staff assignment."
};

export default async function ProductionErpPage() {
  const { stages, orders, staff } = await productionApi.getBoard();
  const activeOrders = orders.filter((order) => order.status !== "completed").length;
  const urgentOrders = orders.filter((order) => order.priority === "urgent").length;
  const delayedOrders = orders.filter((order) => order.status === "delayed" || order.status === "blocked").length;
  const totalPieces = orders.reduce((total, order) => total + order.quantity, 0);

  return (
    <main className="min-h-screen bg-[#080b10] px-4 py-6 text-bone sm:px-6 lg:px-8">
      <header className="mb-6 flex flex-col gap-5 border-b border-white/10 pb-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-volt">Factory ERP</p>
          <h1 className="mt-3 font-display text-4xl font-black leading-none sm:text-6xl">
            Production tracking dashboard.
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-steel sm:text-base">
            Track garment orders across artwork, printing, cutting, stitching, QC, packing, and dispatch with department queues, priority signals, timeline events, and staff assignment.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" className="h-11 rounded-full border border-white/10 px-5 text-sm font-black text-bone hover:bg-white/8">
            Export board
          </button>
          <button type="button" className="h-11 rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt">
            Create job
          </button>
        </div>
      </header>

      <section className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard icon={Activity} label="Active jobs" value={String(activeOrders)} detail="Orders in the factory workflow" />
        <MetricCard icon={AlertTriangle} label="Urgent jobs" value={String(urgentOrders)} detail="High attention production orders" />
        <MetricCard icon={PackageCheck} label="Pieces in flow" value={String(totalPieces)} detail="Total garments across active board" />
        <MetricCard icon={UsersRound} label="Assigned staff" value={String(staff.length)} detail="Operators and supervisors online" />
      </section>

      {delayedOrders > 0 ? (
        <section className="mb-6 rounded-2xl border border-ember/40 bg-ember/10 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-2xl font-black text-bone">{delayedOrders} orders need escalation</p>
              <p className="mt-1 text-sm text-bone/70">
                Review blocked materials, artwork approvals, and delayed stitching queues before dispatch dates slip.
              </p>
            </div>
            <button type="button" className="h-10 rounded-full bg-ember px-4 text-sm font-black text-white">
              View exceptions
            </button>
          </div>
        </section>
      ) : null}

      <div className="grid gap-6">
        <KanbanBoard stages={stages} orders={orders} staff={staff} />
        <DepartmentQueues stages={stages} orders={orders} staff={staff} />
        <PriorityPanel orders={orders} staff={staff} />
        <TimelinePanel orders={orders} />
      </div>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  detail
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
}) {
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
