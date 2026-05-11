import type { ProductionOrder, ProductionStageDefinition, StaffMember } from "@/lib/erp/production-types";
import { ProductionCard } from "./production-card";

type KanbanBoardProps = {
  stages: ProductionStageDefinition[];
  orders: ProductionOrder[];
  staff: StaffMember[];
};

export function KanbanBoard({ stages, orders, staff }: KanbanBoardProps) {
  return (
    <section className="overflow-x-auto pb-4">
      <div className="grid min-w-[1680px] grid-cols-7 gap-4">
        {stages.map((stage) => {
          const stageOrders = orders.filter((order) => order.currentStage === stage.slug);
          const delayedCount = stageOrders.filter((order) => order.status === "delayed" || order.status === "blocked").length;

          return (
            <div key={stage.slug} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
              <div className="mb-3 flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-xl font-black text-bone">{stage.label}</p>
                  <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-steel">
                    {stage.department}
                  </p>
                </div>
                <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-black text-bone">
                  {stageOrders.length}
                </div>
              </div>
              {delayedCount > 0 ? (
                <p className="mb-3 rounded-xl bg-ember/10 px-3 py-2 text-xs font-bold text-ember">
                  {delayedCount} need attention
                </p>
              ) : null}
              <div className="grid gap-3">
                {stageOrders.length > 0 ? (
                  stageOrders.map((order) => (
                    <ProductionCard
                      key={order.id}
                      order={order}
                      staff={staff.find((member) => member.id === order.assignedTo)}
                    />
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/12 p-5 text-center text-sm text-steel">
                    Queue clear
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
