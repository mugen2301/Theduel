import { PageHeader } from "@/components/dashboard/page-header";
import { ProductionTimeline } from "@/components/dashboard/production-timeline";
import { dashboardApi } from "@/lib/dashboard/api";

export default async function ProductionPage() {
  const jobs = await dashboardApi.getProductionJobs();

  return (
    <div>
      <PageHeader
        eyebrow="Production tracking"
        title="Follow your order through the factory."
        description="See each production stage from artwork review and pattern setup to sublimation, stitching, quality check, packing, and dispatch."
      />
      <section className="grid gap-4">
        {jobs.map((job) => (
          <ProductionTimeline key={job.id} job={job} />
        ))}
      </section>
    </div>
  );
}
