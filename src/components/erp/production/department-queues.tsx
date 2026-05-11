import type { ProductionOrder, ProductionStageDefinition, StaffMember } from "@/lib/erp/production-types";
import { cn } from "@/lib/utils";

type DepartmentQueuesProps = {
  stages: ProductionStageDefinition[];
  orders: ProductionOrder[];
  staff: StaffMember[];
};

export function DepartmentQueues({ stages, orders, staff }: DepartmentQueuesProps) {
  return (
    <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
      {stages.map((stage) => {
        const stageOrders = orders.filter((order) => order.currentStage === stage.slug);
        const departmentStaff = staff.filter((member) => member.department === stage.slug);
        const urgent = stageOrders.filter((order) => order.priority === "urgent").length;
        const blocked = stageOrders.filter((order) => order.status === "blocked" || order.status === "delayed").length;

        return (
          <article key={stage.slug} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-steel">{stage.department}</p>
                <p className="mt-2 font-display text-3xl font-black text-bone">{stageOrders.length}</p>
              </div>
              <div className={cn("rounded-full px-3 py-1 text-xs font-black", blocked > 0 ? "bg-ember/15 text-ember" : "bg-volt text-ink")}>
                {blocked > 0 ? `${blocked} blocked` : "On track"}
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <Metric label="Urgent" value={urgent} />
              <Metric label="Staff" value={departmentStaff.length} />
            </div>
            <div className="mt-4 grid gap-2">
              {departmentStaff.map((member) => (
                <div key={member.id} className="flex items-center justify-between rounded-xl bg-black/24 px-3 py-2">
                  <span className="text-sm font-bold text-bone">{member.name}</span>
                  <span className="text-xs font-black text-steel">{member.activeJobs} jobs</span>
                </div>
              ))}
            </div>
          </article>
        );
      })}
    </section>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3">
      <p className="text-xs uppercase tracking-[0.16em] text-steel">{label}</p>
      <p className="mt-1 text-xl font-black text-bone">{value}</p>
    </div>
  );
}
