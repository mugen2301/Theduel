export type OrderStatus = "quote" | "artwork" | "production" | "quality-check" | "dispatched" | "delivered";

export type ArtworkStatus = "pending" | "changes-requested" | "approved";

export type InvoiceStatus = "unpaid" | "paid" | "overdue";

export type ProductionStageStatus = "pending" | "active" | "complete";

export type DashboardUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  gstNumber?: string;
  billingAddress: string;
  shippingAddress: string;
};

export type DashboardOrder = {
  id: string;
  orderNumber: string;
  designName: string;
  category: string;
  quantity: number;
  total: number;
  status: OrderStatus;
  paymentStatus: "pending" | "partial" | "paid";
  expectedDelivery: string;
  placedAt: string;
};

export type ArtworkApproval = {
  id: string;
  orderNumber: string;
  designName: string;
  previewUrl: string;
  status: ArtworkStatus;
  submittedAt: string;
  remarks: string;
};

export type ProductionStage = {
  id: string;
  label: string;
  status: ProductionStageStatus;
  completedAt?: string;
};

export type ProductionJob = {
  id: string;
  orderNumber: string;
  designName: string;
  currentStage: string;
  progress: number;
  stages: ProductionStage[];
};

export type Invoice = {
  id: string;
  invoiceNumber: string;
  orderNumber: string;
  amount: number;
  status: InvoiceStatus;
  issuedAt: string;
  downloadUrl: string;
};

export type SavedDesign = {
  id: string;
  name: string;
  category: string;
  thumbnailUrl: string;
  lastEditedAt: string;
  reorderAvailable: boolean;
};
