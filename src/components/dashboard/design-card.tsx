import Image from "next/image";
import Link from "next/link";
import { Pencil, RotateCcw } from "lucide-react";
import type { SavedDesign } from "@/lib/dashboard/types";
import { formatDate } from "@/lib/dashboard/format";

type DesignCardProps = {
  design: SavedDesign;
};

export function DesignCard({ design }: DesignCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
      <div className="relative aspect-[4/3] bg-graphite">
        <Image src={design.thumbnailUrl} alt={design.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
      </div>
      <div className="p-5">
        <p className="font-display text-2xl font-black text-bone">{design.name}</p>
        <p className="mt-1 text-sm text-steel">{design.category}</p>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-steel">
          Edited {formatDate(design.lastEditedAt)}
        </p>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <Link href="/customizer" className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 text-sm font-black text-bone hover:bg-white/8">
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
          <button
            type="button"
            disabled={!design.reorderAvailable}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-bone text-sm font-black text-ink disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-steel"
          >
            <RotateCcw className="h-4 w-4" />
            Reorder
          </button>
        </div>
      </div>
    </article>
  );
}
