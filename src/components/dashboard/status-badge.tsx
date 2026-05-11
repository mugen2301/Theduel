import { cn } from "@/lib/utils";
import { humanizeStatus } from "@/lib/dashboard/format";

type StatusBadgeProps = {
  status: string;
};

const statusStyles: Record<string, string> = {
  delivered: "bg-volt text-ink",
  approved: "bg-volt text-ink",
  paid: "bg-volt text-ink",
  production: "bg-ember/15 text-ember",
  "quality-check": "bg-ember/15 text-ember",
  active: "bg-ember/15 text-ember",
  artwork: "bg-white/10 text-bone",
  pending: "bg-white/10 text-bone",
  unpaid: "bg-white/10 text-bone",
  partial: "bg-white/10 text-bone",
  overdue: "bg-red-500/15 text-red-300",
  "changes-requested": "bg-red-500/15 text-red-300",
  dispatched: "bg-sky-400/15 text-sky-200",
  quote: "bg-white/10 text-steel"
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 text-xs font-black",
        statusStyles[status] ?? "bg-white/10 text-steel"
      )}
    >
      {humanizeStatus(status)}
    </span>
  );
}
