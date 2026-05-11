import { ArtworkCard } from "@/components/dashboard/artwork-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { dashboardApi } from "@/lib/dashboard/api";

export default async function ArtworkPage() {
  const approvals = await dashboardApi.getArtworkApprovals();

  return (
    <div>
      <PageHeader
        eyebrow="Artwork approvals"
        title="Approve files before production starts."
        description="Check placement, colors, sponsor zones, sleeve logos, names, and numbers before the factory starts print setup."
      />
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {approvals.map((approval) => (
          <ArtworkCard key={approval.id} approval={approval} />
        ))}
      </section>
    </div>
  );
}
