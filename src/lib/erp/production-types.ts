export type ProductionStageSlug =
  | "artwork"
  | "printing"
  | "cutting"
  | "stitching"
  | "qc"
  | "packing"
  | "dispatch";

export type ProductionPriority = "low" | "normal" | "high" | "urgent";

export type ProductionOrderStatus = "ready" | "active" | "blocked" | "delayed" | "completed";

export type StaffMember = {
  id: string;
  name: string;
  department: ProductionStageSlug;
  role: string;
  activeJobs: number;
};

export type ProductionStageDefinition = {
  slug: ProductionStageSlug;
  label: string;
  department: string;
  sequence: number;
};

export type ProductionTimelineEvent = {
  id: string;
  label: string;
  stage: ProductionStageSlug;
  timestamp: string;
  actor: string;
  note: string;
};

export type ProductionOrder = {
  id: string;
  orderNumber: string;
  customer: string;
  designName: string;
  product: string;
  quantity: number;
  currentStage: ProductionStageSlug;
  status: ProductionOrderStatus;
  priority: ProductionPriority;
  assignedTo?: string;
  dueDate: string;
  startedAt: string;
  completedPieces: number;
  rejectedPieces: number;
  blockers: string[];
  timeline: ProductionTimelineEvent[];
};
