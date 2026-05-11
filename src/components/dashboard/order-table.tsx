import Link from "next/link";
import { RotateCcw } from "lucide-react";
import type { DashboardOrder } from "@/lib/dashboard/types";
import { formatCurrency, formatDate } from "@/lib/dashboard/format";
import { StatusBadge } from "./status-badge";

type OrderTableProps = {
  orders: DashboardOrder[];
};

export function OrderTable({ orders }: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045]">
      <div className="hidden grid-cols-[1.2fr_1fr_0.6fr_0.8fr_0.8fr_auto] gap-4 border-b border-white/10 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-steel lg:grid">
        <span>Order</span>
        <span>Product</span>
        <span>Qty</span>
        <span>Total</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      <div className="divide-y divide-white/10">
        {orders.map((order) => (
          <article key={order.id} className="grid gap-4 p-5 lg:grid-cols-[1.2fr_1fr_0.6fr_0.8fr_0.8fr_auto] lg:items-center">
            <div>
              <p className="font-black text-bone">{order.orderNumber}</p>
              <p className="mt-1 text-sm text-steel">Placed {formatDate(order.placedAt)}</p>
            </div>
            <div>
              <p className="font-bold text-bone">{order.designName}</p>
              <p className="mt-1 text-sm text-steel">{order.category}</p>
            </div>
            <p className="text-sm font-black text-bone">{order.quantity} pcs</p>
            <p className="text-sm font-black text-bone">{formatCurrency(order.total)}</p>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={order.status} />
              <StatusBadge status={order.paymentStatus} />
            </div>
            <Link
              href="/dashboard/designs"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 px-4 text-sm font-black text-bone hover:bg-white/8"
            >
              <RotateCcw className="h-4 w-4" />
              Reorder
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
