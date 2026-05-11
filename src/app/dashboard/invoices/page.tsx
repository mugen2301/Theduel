import { Download } from "lucide-react";
import { PageHeader } from "@/components/dashboard/page-header";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { dashboardApi } from "@/lib/dashboard/api";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";

export default async function InvoicesPage() {
  const invoices = await dashboardApi.getInvoices();

  return (
    <div>
      <PageHeader
        eyebrow="Invoices"
        title="Download invoices and track payments."
        description="Keep financial records tied to each order, payment status, and production batch."
      />
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
        <div className="divide-y divide-white/10">
          {invoices.map((invoice) => (
            <article key={invoice.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_1fr_0.8fr_0.8fr_auto] lg:items-center">
              <div>
                <p className="font-black text-bone">{invoice.invoiceNumber}</p>
                <p className="mt-1 text-sm text-steel">{invoice.orderNumber}</p>
              </div>
              <p className="text-sm text-steel">Issued {formatDate(invoice.issuedAt)}</p>
              <p className="font-black text-bone">{formatCurrency(invoice.amount)}</p>
              <StatusBadge status={invoice.status} />
              <a
                href={invoice.downloadUrl}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-sm font-black text-bone hover:bg-white/8"
              >
                <Download className="h-4 w-4" />
                Download
              </a>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
