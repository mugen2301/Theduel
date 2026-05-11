import Image from "next/image";
import { Check, MessageSquare } from "lucide-react";
import type { ArtworkApproval } from "@/lib/dashboard/types";
import { formatDate } from "@/lib/dashboard/format";
import { StatusBadge } from "./status-badge";

type ArtworkCardProps = {
  approval: ArtworkApproval;
};

export function ArtworkCard({ approval }: ArtworkCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
      <div className="relative aspect-[4/3] bg-graphite">
        <Image src={approval.previewUrl} alt={approval.designName} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl font-black text-bone">{approval.designName}</p>
            <p className="mt-1 text-sm text-steel">{approval.orderNumber}</p>
          </div>
          <StatusBadge status={approval.status} />
        </div>
        <p className="mt-4 text-sm leading-6 text-steel">{approval.remarks}</p>
        <p className="mt-3 text-xs font-bold uppercase tracking-[0.16em] text-steel">
          Submitted {formatDate(approval.submittedAt)}
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-volt text-sm font-black text-ink">
            <Check className="h-4 w-4" />
            Approve
          </button>
          <button type="button" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-black text-bone hover:bg-white/8">
            <MessageSquare className="h-4 w-4" />
            Request changes
          </button>
        </div>
      </div>
    </article>
  );
}
