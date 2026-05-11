import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import type { ProductionJob, ProductionStageStatus } from "@/lib/dashboard/types";
import { cn } from "@/lib/utils";

type ProductionTimelineProps = {
  job: ProductionJob;
};

const stageIcon: Record<ProductionStageStatus, typeof Circle> = {
  complete: CheckCircle2,
  active: Loader2,
  pending: Circle
};

export function ProductionTimeline({ job }: ProductionTimelineProps) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl font-black text-bone">{job.designName}</p>
          <p className="mt-1 text-sm text-steel">{job.orderNumber}</p>
        </div>
        <div className="min-w-44">
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-volt" style={{ width: `${job.progress}%` }} />
          </div>
          <p className="mt-2 text-right text-xs font-black uppercase tracking-[0.16em] text-steel">
            {job.progress}% complete
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-3">
        {job.stages.map((stage) => {
          const Icon = stageIcon[stage.status];
          return (
            <div key={stage.id} className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/20 p-4">
              <div
                className={cn(
                  "grid h-10 w-10 place-items-center rounded-full",
                  stage.status === "complete" && "bg-volt text-ink",
                  stage.status === "active" && "bg-ember/15 text-ember",
                  stage.status === "pending" && "bg-white/8 text-steel"
                )}
              >
                <Icon className={cn("h-5 w-5", stage.status === "active" && "animate-spin")} />
              </div>
              <div className="min-w-0">
                <p className="font-black text-bone">{stage.label}</p>
                <p className="mt-1 text-sm text-steel">
                  {stage.completedAt ? `Completed ${stage.completedAt}` : stage.status === "active" ? "In progress" : "Waiting"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
