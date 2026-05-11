import { cn } from "@/lib/utils";
import type { ProductionOrderStatus, ProductionPriority } from "@/lib/erp/production-types";

const priorityStyles: Record<ProductionPriority, string> = {
  low: "bg-white/8 text-steel",
  normal: "bg-sky-400/15 text-sky-200",
  high: "bg-amber-400/15 text-amber-200",
  urgent: "bg-ember/15 text-ember"
};

const statusStyles: Record<ProductionOrderStatus, string> = {
  ready: "bg-white/8 text-bone",
  active: "bg-volt text-ink",
  blocked: "bg-red-500/15 text-red-300",
  delayed: "bg-ember/15 text-ember",
  completed: "bg-volt text-ink"
};

export function PriorityPill({ priority }: { priority: ProductionPriority }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-full px-3 text-xs font-black", priorityStyles[priority])}>
      {priority.toUpperCase()}
    </span>
  );
}

export function StatusPill({ status }: { status: ProductionOrderStatus }) {
  return (
    <span className={cn("inline-flex h-7 items-center rounded-full px-3 text-xs font-black capitalize", statusStyles[status])}>
      {status}
    </span>
  );
}
