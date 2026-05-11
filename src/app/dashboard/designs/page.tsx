import Link from "next/link";
import { DesignCard } from "@/components/dashboard/design-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { dashboardApi } from "@/lib/dashboard/api";

export default async function SavedDesignsPage() {
  const designs = await dashboardApi.getSavedDesigns();

  return (
    <div>
      <PageHeader
        eyebrow="Saved designs"
        title="Reuse, edit, and reorder previous kits."
        description="Saved design records keep artwork, roster, sizes, and production settings ready for repeat orders."
        action={
          <Link href="/customizer" className="inline-flex h-11 items-center rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt">
            New design
          </Link>
        }
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {designs.map((design) => (
          <DesignCard key={design.id} design={design} />
        ))}
      </section>
    </div>
  );
}
