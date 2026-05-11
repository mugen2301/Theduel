import type { ProductionOrder, ProductionStageDefinition, StaffMember } from "./production-types";

export const productionStages: ProductionStageDefinition[] = [
  { slug: "artwork", label: "Artwork", department: "Artwork", sequence: 1 },
  { slug: "printing", label: "Printing", department: "Printing", sequence: 2 },
  { slug: "cutting", label: "Cutting", department: "Cutting", sequence: 3 },
  { slug: "stitching", label: "Stitching", department: "Stitching", sequence: 4 },
  { slug: "qc", label: "QC", department: "Quality Control", sequence: 5 },
  { slug: "packing", label: "Packing", department: "Packing", sequence: 6 },
  { slug: "dispatch", label: "Dispatch", department: "Dispatch", sequence: 7 }
];

export const staffMembers: StaffMember[] = [
  { id: "staff-1", name: "Aarav Mehta", department: "artwork", role: "Artwork Lead", activeJobs: 3 },
  { id: "staff-2", name: "Meera Kapoor", department: "printing", role: "Print Operator", activeJobs: 5 },
  { id: "staff-3", name: "Dev Singh", department: "cutting", role: "Cutting Master", activeJobs: 4 },
  { id: "staff-4", name: "Iqra Khan", department: "stitching", role: "Line Supervisor", activeJobs: 7 },
  { id: "staff-5", name: "Rohan Bedi", department: "qc", role: "QC Inspector", activeJobs: 2 },
  { id: "staff-6", name: "Neha Rao", department: "packing", role: "Packing Lead", activeJobs: 3 },
  { id: "staff-7", name: "Kabir Sethi", department: "dispatch", role: "Dispatch Coordinator", activeJobs: 4 }
];

export const productionOrders: ProductionOrder[] = [
  {
    id: "prod-1001",
    orderNumber: "TD-260511-1042",
    customer: "Northside Cricket Academy",
    designName: "Elite Cricket Match Kit",
    product: "Cricket Jerseys",
    quantity: 38,
    currentStage: "printing",
    status: "active",
    priority: "urgent",
    assignedTo: "staff-2",
    dueDate: "2026-05-17",
    startedAt: "2026-05-11",
    completedPieces: 18,
    rejectedPieces: 0,
    blockers: [],
    timeline: [
      {
        id: "evt-1",
        label: "Artwork approved",
        stage: "artwork",
        timestamp: "2026-05-11 10:20",
        actor: "Aarav Mehta",
        note: "Sponsor panel and player names approved."
      },
      {
        id: "evt-2",
        label: "Printing started",
        stage: "printing",
        timestamp: "2026-05-11 14:10",
        actor: "Meera Kapoor",
        note: "Batch split into two print runs."
      }
    ]
  },
  {
    id: "prod-1002",
    orderNumber: "TD-260504-0887",
    customer: "Summit Corporate League",
    designName: "Travel Day Polo",
    product: "Polo T-Shirts",
    quantity: 52,
    currentStage: "artwork",
    status: "blocked",
    priority: "high",
    assignedTo: "staff-1",
    dueDate: "2026-05-14",
    startedAt: "2026-05-09",
    completedPieces: 0,
    rejectedPieces: 0,
    blockers: ["Waiting for sleeve sponsor confirmation"],
    timeline: [
      {
        id: "evt-3",
        label: "Changes requested",
        stage: "artwork",
        timestamp: "2026-05-10 16:40",
        actor: "Aarav Mehta",
        note: "Customer asked for smaller sleeve mark."
      }
    ]
  },
  {
    id: "prod-1003",
    orderNumber: "TD-260509-0975",
    customer: "Velocity Esports",
    designName: "Neon Arena Jersey",
    product: "Esports Jerseys",
    quantity: 24,
    currentStage: "cutting",
    status: "active",
    priority: "normal",
    assignedTo: "staff-3",
    dueDate: "2026-05-18",
    startedAt: "2026-05-10",
    completedPieces: 24,
    rejectedPieces: 1,
    blockers: [],
    timeline: [
      {
        id: "evt-4",
        label: "Print transfer completed",
        stage: "printing",
        timestamp: "2026-05-11 12:05",
        actor: "Meera Kapoor",
        note: "One panel reprint marked for replacement."
      }
    ]
  },
  {
    id: "prod-1004",
    orderNumber: "TD-260501-0821",
    customer: "Ironhill Football Club",
    designName: "Away Match Jersey",
    product: "Football Jerseys",
    quantity: 64,
    currentStage: "stitching",
    status: "delayed",
    priority: "urgent",
    assignedTo: "staff-4",
    dueDate: "2026-05-11",
    startedAt: "2026-05-05",
    completedPieces: 42,
    rejectedPieces: 3,
    blockers: ["Collar trim shortage on XL sizes"],
    timeline: [
      {
        id: "evt-5",
        label: "Stitching delayed",
        stage: "stitching",
        timestamp: "2026-05-11 09:25",
        actor: "Iqra Khan",
        note: "Need trim issue resolved before second line can finish XL pieces."
      }
    ]
  },
  {
    id: "prod-1005",
    orderNumber: "TD-260506-0912",
    customer: "Blue Ridge School",
    designName: "Annual Sports Tracksuit",
    product: "Tracksuits",
    quantity: 110,
    currentStage: "qc",
    status: "active",
    priority: "high",
    assignedTo: "staff-5",
    dueDate: "2026-05-16",
    startedAt: "2026-05-07",
    completedPieces: 96,
    rejectedPieces: 4,
    blockers: [],
    timeline: [
      {
        id: "evt-6",
        label: "QC started",
        stage: "qc",
        timestamp: "2026-05-11 11:00",
        actor: "Rohan Bedi",
        note: "Checking zipper finish and school crest placement."
      }
    ]
  },
  {
    id: "prod-1006",
    orderNumber: "TD-260503-0866",
    customer: "Orbit Cycling Club",
    designName: "Aero Club Jersey",
    product: "Cycling Jerseys",
    quantity: 32,
    currentStage: "packing",
    status: "ready",
    priority: "normal",
    assignedTo: "staff-6",
    dueDate: "2026-05-13",
    startedAt: "2026-05-08",
    completedPieces: 32,
    rejectedPieces: 0,
    blockers: [],
    timeline: [
      {
        id: "evt-7",
        label: "QC passed",
        stage: "qc",
        timestamp: "2026-05-11 13:45",
        actor: "Rohan Bedi",
        note: "All pieces approved for packing."
      }
    ]
  },
  {
    id: "prod-1007",
    orderNumber: "TD-260428-0744",
    customer: "Nova Events",
    designName: "Volunteer Hoodie Batch",
    product: "Hoodies",
    quantity: 80,
    currentStage: "dispatch",
    status: "ready",
    priority: "low",
    assignedTo: "staff-7",
    dueDate: "2026-05-12",
    startedAt: "2026-05-02",
    completedPieces: 80,
    rejectedPieces: 2,
    blockers: [],
    timeline: [
      {
        id: "evt-8",
        label: "Packed",
        stage: "packing",
        timestamp: "2026-05-11 15:10",
        actor: "Neha Rao",
        note: "Packed into 8 cartons by size matrix."
      }
    ]
  }
];
