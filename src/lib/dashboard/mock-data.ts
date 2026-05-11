import type {
  ArtworkApproval,
  DashboardOrder,
  DashboardUser,
  Invoice,
  ProductionJob,
  SavedDesign
} from "./types";

export const dashboardUser: DashboardUser = {
  id: "cust-001",
  name: "Kamal Sharma",
  email: "kamal@theduel.in",
  phone: "+91 98765 43210",
  company: "Northside Cricket Academy",
  gstNumber: "07ABCDE1234F1Z5",
  billingAddress: "Sector 62, Noida, Uttar Pradesh",
  shippingAddress: "Academy Ground, Noida, Uttar Pradesh"
};

export const dashboardOrders: DashboardOrder[] = [
  {
    id: "ord-101",
    orderNumber: "TD-260511-1042",
    designName: "Northside Elite Cricket Kit",
    category: "Cricket Jerseys",
    quantity: 38,
    total: 68400,
    status: "production",
    paymentStatus: "partial",
    expectedDelivery: "2026-05-28",
    placedAt: "2026-05-10"
  },
  {
    id: "ord-102",
    orderNumber: "TD-260504-0887",
    designName: "Travel Day Polo",
    category: "Polo T-Shirts",
    quantity: 52,
    total: 57200,
    status: "artwork",
    paymentStatus: "pending",
    expectedDelivery: "2026-05-22",
    placedAt: "2026-05-04"
  },
  {
    id: "ord-103",
    orderNumber: "TD-260420-0711",
    designName: "Winter Hoodie Drop",
    category: "Hoodies",
    quantity: 75,
    total: 127500,
    status: "delivered",
    paymentStatus: "paid",
    expectedDelivery: "2026-05-02",
    placedAt: "2026-04-20"
  }
];

export const artworkApprovals: ArtworkApproval[] = [
  {
    id: "art-201",
    orderNumber: "TD-260504-0887",
    designName: "Travel Day Polo",
    previewUrl:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=85",
    status: "pending",
    submittedAt: "2026-05-10",
    remarks: "Confirm left chest logo size and sleeve sponsor placement."
  },
  {
    id: "art-202",
    orderNumber: "TD-260511-1042",
    designName: "Northside Elite Cricket Kit",
    previewUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85",
    status: "approved",
    submittedAt: "2026-05-11",
    remarks: "Approved for sublimation print setup."
  }
];

export const productionJobs: ProductionJob[] = [
  {
    id: "job-301",
    orderNumber: "TD-260511-1042",
    designName: "Northside Elite Cricket Kit",
    currentStage: "Sublimation",
    progress: 52,
    stages: [
      { id: "stage-1", label: "Artwork Review", status: "complete", completedAt: "2026-05-11" },
      { id: "stage-2", label: "Pattern Setup", status: "complete", completedAt: "2026-05-12" },
      { id: "stage-3", label: "Printing", status: "complete", completedAt: "2026-05-13" },
      { id: "stage-4", label: "Sublimation", status: "active" },
      { id: "stage-5", label: "Cut & Stitch", status: "pending" },
      { id: "stage-6", label: "QC & Packing", status: "pending" }
    ]
  }
];

export const invoices: Invoice[] = [
  {
    id: "inv-401",
    invoiceNumber: "INV-TD-1042",
    orderNumber: "TD-260511-1042",
    amount: 68400,
    status: "unpaid",
    issuedAt: "2026-05-11",
    downloadUrl: "/api/mock/invoices/inv-401.pdf"
  },
  {
    id: "inv-402",
    invoiceNumber: "INV-TD-0711",
    orderNumber: "TD-260420-0711",
    amount: 127500,
    status: "paid",
    issuedAt: "2026-04-20",
    downloadUrl: "/api/mock/invoices/inv-402.pdf"
  }
];

export const savedDesigns: SavedDesign[] = [
  {
    id: "des-501",
    name: "Northside Elite Cricket Kit",
    category: "Cricket Jerseys",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=900&q=85",
    lastEditedAt: "2026-05-11",
    reorderAvailable: true
  },
  {
    id: "des-502",
    name: "Velocity Esports Jersey",
    category: "Esports Jerseys",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=85",
    lastEditedAt: "2026-05-02",
    reorderAvailable: true
  },
  {
    id: "des-503",
    name: "Corporate Sports Day Polo",
    category: "Polo T-Shirts",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=900&q=85",
    lastEditedAt: "2026-04-19",
    reorderAvailable: false
  }
];
