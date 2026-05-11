import Link from "next/link";
import { CreditCard, FileCheck2, FolderHeart, Package } from "lucide-react";
import { ArtworkCard } from "@/components/dashboard/artwork-card";
import { OrderTable } from "@/components/dashboard/order-table";
import { PageHeader } from "@/components/dashboard/page-header";
import { ProductionTimeline } from "@/components/dashboard/production-timeline";
import { StatCard } from "@/components/dashboard/stat-card";
import { dashboardApi } from "@/lib/dashboard/api";
import { formatCurrency } from "@/lib/dashboard/format";

export default async function DashboardOverviewPage() {
  const [orders, approvals, jobs, invoices, designs] = await Promise.all([
    dashboardApi.getOrders(),
    dashboardApi.getArtworkApprovals(),
    dashboardApi.getProductionJobs(),
    dashboardApi.getInvoices(),
    dashboardApi.getSavedDesigns()
  ]);

  const outstanding = invoices
    .filter((invoice) => invoice.status !== "paid")
    .reduce((total, invoice) => total + invoice.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title="Your teamwear command center."
        description="Track every quote, artwork approval, production job, invoice, and saved design from one clean workspace."
        action={
          <Link href="/customizer" className="inline-flex h-11 items-center rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt">
            Start new design
          </Link>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active orders" value={String(orders.filter((order) => order.status !== "delivered").length)} detail="Orders currently moving through artwork or production." icon={Package} />
        <StatCard label="Approvals" value={String(approvals.filter((approval) => approval.status === "pending").length)} detail="Artwork files waiting for customer confirmation." icon={FileCheck2} />
        <StatCard label="Outstanding" value={formatCurrency(outstanding)} detail="Open invoice balance for current orders." icon={CreditCard} />
        <StatCard label="Saved designs" value={String(designs.length)} detail="Reusable designs available for edits and reorders." icon={FolderHeart} />
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl font-black">Recent orders</h2>
            <Link href="/dashboard/orders" className="text-sm font-black text-volt">View all</Link>
          </div>
          <OrderTable orders={orders.slice(0, 3)} />
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-2xl font-black">Artwork approvals</h2>
            <Link href="/dashboard/artwork" className="text-sm font-black text-volt">Review</Link>
          </div>
          <div className="grid gap-4">
            {approvals.slice(0, 1).map((approval) => (
              <ArtworkCard key={approval.id} approval={approval} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-2xl font-black">Production tracking</h2>
          <Link href="/dashboard/production" className="text-sm font-black text-volt">Track jobs</Link>
        </div>
        <div className="grid gap-4">
          {jobs.map((job) => (
            <ProductionTimeline key={job.id} job={job} />
          ))}
        </div>
      </section>
    </div>
  );
}
