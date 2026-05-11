# Production Tracking Dashboard

The garment factory production dashboard lives at:

```text
/erp/production
```

## Features

- Kanban workflow across Artwork, Printing, Cutting, Stitching, QC, Packing, and Dispatch
- Order status tracking
- Department queues
- Priority orders
- Delayed and blocked order exceptions
- Timeline tracking
- Staff assignment visibility
- Queue metrics and production KPIs

## File Structure

```text
src/
|-- app/
|   `-- erp/
|       `-- production/
|           `-- page.tsx
|-- components/
|   `-- erp/
|       `-- production/
|           |-- department-queues.tsx
|           |-- kanban-board.tsx
|           |-- priority-panel.tsx
|           |-- production-card.tsx
|           |-- status-pill.tsx
|           `-- timeline-panel.tsx
`-- lib/
    `-- erp/
        |-- production-api.ts
        |-- production-data.ts
        `-- production-types.ts
```

## Laravel API Integration

The UI currently reads typed local data through `productionApi.getBoard()`.

Production endpoints should map to:

```text
GET  /api/v1/production/board
GET  /api/v1/production/jobs
POST /api/v1/production/jobs
POST /api/v1/production/jobs/{id}/assign
POST /api/v1/production/jobs/{id}/move-stage
POST /api/v1/production/jobs/{id}/pause
POST /api/v1/production/jobs/{id}/complete-stage
POST /api/v1/production/jobs/{id}/report-blocker
POST /api/v1/production/jobs/{id}/report-rejection
```

The backend should enforce department permissions and audit every stage transition.
