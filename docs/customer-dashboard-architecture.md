# Customer Dashboard Architecture

The customer dashboard is built with Next.js App Router, Tailwind, TypeScript, and a clean API boundary that can connect to the Laravel backend.

## Routes

```text
/auth/login
/auth/signup
/dashboard
/dashboard/orders
/dashboard/artwork
/dashboard/production
/dashboard/invoices
/dashboard/designs
/dashboard/profile
```

## File Structure

```text
src/
|-- app/
|   |-- auth/
|   |   |-- login/page.tsx
|   |   `-- signup/page.tsx
|   `-- dashboard/
|       |-- layout.tsx
|       |-- page.tsx
|       |-- artwork/page.tsx
|       |-- designs/page.tsx
|       |-- invoices/page.tsx
|       |-- orders/page.tsx
|       |-- production/page.tsx
|       `-- profile/page.tsx
|-- components/
|   |-- auth/
|   `-- dashboard/
`-- lib/
    `-- dashboard/
        |-- api.ts
        |-- format.ts
        |-- mock-data.ts
        `-- types.ts
```

## API Integration

`src/lib/dashboard/api.ts` is the integration boundary. It currently returns local mock data but exposes the shape expected from Laravel:

```text
GET /api/v1/me
GET /api/v1/orders
GET /api/v1/artwork-approvals
GET /api/v1/production-jobs
GET /api/v1/invoices
GET /api/v1/designs
POST /api/v1/auth/login
POST /api/v1/auth/register
POST /api/v1/designs/{id}/reorder
POST /api/v1/artwork-approvals/{id}/approve
POST /api/v1/artwork-approvals/{id}/request-changes
```

For production:

- Store access token in secure HTTP-only cookies where possible.
- Use refresh-token rotation.
- Protect all dashboard routes with middleware.
- Keep customer authorization enforced by Laravel policies.
- Never trust frontend order IDs without backend ownership checks.

## Dashboard Modules

- Overview: KPIs, recent orders, artwork queue, production progress
- Orders: order history, payment state, reorder entry points
- Artwork: approve or request changes before production
- Production: stage-by-stage factory tracking
- Invoices: invoice status and download actions
- Saved designs: reorder and edit previous designs
- Profile: customer/company/GST/address management
