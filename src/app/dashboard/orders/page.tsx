import Link from "next/link";
import { OrderTable } from "@/components/dashboard/order-table";
import { PageHeader } from "@/components/dashboard/page-header";
import { dashboardApi } from "@/lib/dashboard/api";

export default async function OrdersPage() {
  const orders = await dashboardApi.getOrders();

  return (
    <div>
      <PageHeader
        eyebrow="Order history"
        title="Every order, quote, and reorder in one place."
        description="Review order status, totals, payment state, expected delivery, and quickly reorder previous designs."
        action={
          <Link href="/products" className="inline-flex h-11 items-center rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt">
            Browse products
          </Link>
        }
      />
      <OrderTable orders={orders} />
    </div>
  );
}
