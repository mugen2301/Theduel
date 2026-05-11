# Factory ERP Architecture

This ERP is designed for a custom sportswear manufacturing company handling sublimated jerseys, polos, tracksuits, hoodies, uniforms, dealer orders, artwork approvals, and factory production.

Recommended backend approach: Laravel modular monolith with PostgreSQL, Redis queues, Cloudflare R2 file storage, and a React admin frontend.

## Departments

```text
Sales
Artwork
Printing
Cutting
Stitching
QC
Dispatch
Accounts
```

## Modular Laravel Architecture

```text
app/
|-- Domains/
|   |-- Auth/
|   |-- Users/
|   |-- Dealers/
|   |-- Customers/
|   |-- Products/
|   |-- Orders/
|   |-- Artwork/
|   |-- Production/
|   |-- Inventory/
|   |-- Dispatch/
|   |-- Accounts/
|   `-- Reports/
|-- Http/
|   |-- Controllers/
|   |-- Middleware/
|   `-- Requests/
|-- Models/
|-- Policies/
|-- Jobs/
|-- Events/
`-- Services/

routes/
|-- api.php
|-- admin.php
|-- dealer.php
`-- production.php
```

Keep the ERP backend as a modular monolith first. Split into services only when operational load or team ownership demands it.

## Database Schema

### Auth And Employees

```sql
users
- id uuid pk
- name varchar
- email varchar unique
- phone varchar nullable
- password varchar
- status varchar -- active, suspended, invited
- last_login_at timestamp nullable
- created_at timestamp
- updated_at timestamp

roles
- id uuid pk
- name varchar
- slug varchar unique

permissions
- id uuid pk
- name varchar
- slug varchar unique

role_user
- user_id uuid fk
- role_id uuid fk

permission_role
- permission_id uuid fk
- role_id uuid fk

employees
- id uuid pk
- user_id uuid fk
- employee_code varchar unique
- department varchar
- designation varchar
- joining_date date nullable
- status varchar
```

### Customers And Dealers

```sql
customers
- id uuid pk
- user_id uuid nullable fk
- company_name varchar nullable
- contact_name varchar
- email varchar
- phone varchar
- gst_number varchar nullable
- billing_address jsonb
- shipping_address jsonb
- status varchar

dealers
- id uuid pk
- user_id uuid fk
- dealer_code varchar unique
- business_name varchar
- commission_rate numeric
- credit_limit numeric
- outstanding_balance numeric
- territory varchar nullable
- status varchar

dealer_customers
- id uuid pk
- dealer_id uuid fk
- customer_id uuid fk
```

### Products And BOM

```sql
categories
- id uuid pk
- name varchar
- slug varchar unique
- parent_id uuid nullable

products
- id uuid pk
- category_id uuid fk
- name varchar
- slug varchar unique
- product_type varchar -- jersey, polo, tracksuit, hoodie, uniform
- base_price numeric
- min_order_quantity integer
- status varchar

product_variants
- id uuid pk
- product_id uuid fk
- sku varchar unique
- size varchar
- fabric varchar
- fit varchar
- color varchar nullable
- price_adjustment numeric

materials
- id uuid pk
- sku varchar unique
- name varchar
- material_type varchar -- fabric, thread, zipper, label, packaging
- unit varchar
- current_stock numeric
- reorder_level numeric
- average_cost numeric
- status varchar

product_bom_items
- id uuid pk
- product_id uuid fk
- material_id uuid fk
- consumption_per_piece numeric
- wastage_percentage numeric
```

### Orders

```sql
orders
- id uuid pk
- order_number varchar unique
- customer_id uuid fk
- dealer_id uuid nullable fk
- sales_owner_id uuid nullable fk users.id
- status varchar -- draft, confirmed, artwork, production, qc, dispatch, completed, cancelled
- payment_status varchar -- unpaid, partial, paid, refunded
- production_status varchar -- not_started, active, paused, completed
- subtotal numeric
- discount numeric
- tax numeric
- total numeric
- expected_delivery_date date nullable
- confirmed_at timestamp nullable
- created_at timestamp
- updated_at timestamp

order_items
- id uuid pk
- order_id uuid fk
- product_id uuid fk
- variant_id uuid nullable fk
- design_id uuid nullable
- quantity integer
- unit_price numeric
- total_price numeric
- size_breakdown jsonb
- customization_snapshot jsonb

order_activity_logs
- id uuid pk
- order_id uuid fk
- user_id uuid nullable fk
- action varchar
- old_status varchar nullable
- new_status varchar nullable
- metadata jsonb
- created_at timestamp
```

### Artwork Workflow

```sql
designs
- id uuid pk
- order_id uuid nullable fk
- customer_id uuid fk
- product_id uuid fk
- name varchar
- design_json jsonb
- preview_url text nullable
- status varchar -- draft, submitted, under_review, changes_requested, approved, rejected
- approved_by uuid nullable fk users.id
- approved_at timestamp nullable

design_assets
- id uuid pk
- design_id uuid fk
- asset_type varchar -- logo, sponsor, sleeve_logo, reference, print_file
- file_url text
- r2_object_key text
- original_filename varchar
- mime_type varchar
- file_size integer
- status varchar -- uploaded, approved, rejected
- metadata jsonb

artwork_tasks
- id uuid pk
- order_id uuid fk
- design_id uuid fk
- assigned_to uuid nullable fk users.id
- status varchar -- pending, in_progress, changes_requested, approved
- priority varchar
- due_at timestamp nullable
- remarks text nullable
- completed_at timestamp nullable

artwork_comments
- id uuid pk
- artwork_task_id uuid fk
- user_id uuid fk
- comment text
- attachment_url text nullable
- created_at timestamp
```

### Production

```sql
production_jobs
- id uuid pk
- order_id uuid fk
- job_number varchar unique
- priority varchar -- low, normal, high, urgent
- status varchar -- queued, active, paused, completed, cancelled
- planned_start_date date nullable
- planned_end_date date nullable
- actual_start_at timestamp nullable
- actual_end_at timestamp nullable
- created_at timestamp
- updated_at timestamp

production_stages
- id uuid pk
- name varchar
- slug varchar unique
- department varchar
- sequence integer
- requires_qc boolean
- is_active boolean

production_job_stages
- id uuid pk
- production_job_id uuid fk
- production_stage_id uuid fk
- assigned_to uuid nullable fk users.id
- status varchar -- pending, ready, active, blocked, completed, failed
- input_quantity integer
- output_quantity integer nullable
- rejected_quantity integer default 0
- started_at timestamp nullable
- completed_at timestamp nullable
- remarks text nullable

production_stage_logs
- id uuid pk
- production_job_stage_id uuid fk
- user_id uuid fk
- action varchar
- quantity integer nullable
- metadata jsonb
- created_at timestamp
```

Default production stages:

```text
1. Artwork Approval
2. Print File Setup
3. Fabric Allocation
4. Printing
5. Sublimation
6. Cutting
7. Stitching
8. Finishing
9. QC
10. Packing
11. Dispatch Ready
12. Shipped
```

### Inventory

```sql
inventory_locations
- id uuid pk
- name varchar
- type varchar -- warehouse, production_floor, dispatch

inventory_movements
- id uuid pk
- material_id uuid fk
- location_id uuid fk
- movement_type varchar -- purchase, consumption, adjustment, return, transfer
- quantity numeric
- reference_type varchar nullable -- order, production_job, purchase_order
- reference_id uuid nullable
- unit_cost numeric nullable
- notes text nullable
- created_by uuid fk users.id
- created_at timestamp

purchase_orders
- id uuid pk
- po_number varchar unique
- vendor_name varchar
- status varchar -- draft, sent, received, cancelled
- total numeric
- ordered_at date nullable
- received_at date nullable

purchase_order_items
- id uuid pk
- purchase_order_id uuid fk
- material_id uuid fk
- quantity numeric
- unit_cost numeric
- total numeric
```

### Dispatch And Accounts

```sql
shipments
- id uuid pk
- order_id uuid fk
- shipment_number varchar unique
- courier_name varchar nullable
- tracking_number varchar nullable
- status varchar -- pending, packed, shipped, delivered, returned
- packed_by uuid nullable fk users.id
- shipped_at timestamp nullable
- delivered_at timestamp nullable

shipment_items
- id uuid pk
- shipment_id uuid fk
- order_item_id uuid fk
- quantity integer
- package_label varchar nullable

invoices
- id uuid pk
- order_id uuid fk
- invoice_number varchar unique
- status varchar -- draft, issued, paid, overdue, cancelled
- subtotal numeric
- tax numeric
- total numeric
- issued_at date nullable
- due_date date nullable
- pdf_url text nullable

payments
- id uuid pk
- order_id uuid fk
- invoice_id uuid nullable fk
- amount numeric
- payment_mode varchar
- transaction_reference varchar nullable
- status varchar -- pending, successful, failed, refunded
- paid_at timestamp nullable
```

## API Structure

Use versioned REST APIs for the ERP.

```text
/api/v1/auth
POST /login
POST /logout
POST /refresh
GET  /me

/api/v1/admin/users
GET    /
POST   /
GET    /{id}
PUT    /{id}
POST   /{id}/assign-role

/api/v1/dealers
GET    /
POST   /
GET    /{id}
PUT    /{id}
GET    /{id}/orders
GET    /{id}/commissions

/api/v1/customers
GET    /
POST   /
GET    /{id}
PUT    /{id}

/api/v1/products
GET    /
POST   /
GET    /{id}
PUT    /{id}
GET    /{id}/bom
POST   /{id}/bom

/api/v1/orders
GET    /
POST   /
GET    /{id}
PUT    /{id}
POST   /{id}/confirm
POST   /{id}/cancel
GET    /{id}/timeline
GET    /{id}/activity

/api/v1/artwork
GET    /tasks
GET    /tasks/{id}
POST   /tasks/{id}/assign
POST   /tasks/{id}/start
POST   /tasks/{id}/request-changes
POST   /tasks/{id}/approve
POST   /assets/signed-url
POST   /assets/complete-upload

/api/v1/production
GET    /jobs
POST   /jobs
GET    /jobs/{id}
POST   /jobs/{id}/start
POST   /jobs/{id}/pause
POST   /jobs/{id}/complete
POST   /jobs/{id}/stages/{stageId}/assign
POST   /jobs/{id}/stages/{stageId}/start
POST   /jobs/{id}/stages/{stageId}/complete
POST   /jobs/{id}/stages/{stageId}/report-rejection

/api/v1/inventory
GET    /materials
POST   /materials
GET    /movements
POST   /movements
GET    /purchase-orders
POST   /purchase-orders
POST   /purchase-orders/{id}/receive

/api/v1/dispatch
GET    /shipments
POST   /shipments
GET    /shipments/{id}
POST   /shipments/{id}/pack
POST   /shipments/{id}/ship
POST   /shipments/{id}/deliver

/api/v1/accounts
GET    /invoices
POST   /invoices
GET    /invoices/{id}
POST   /invoices/{id}/issue
POST   /payments

/api/v1/reports
GET    /sales-summary
GET    /production-summary
GET    /inventory-summary
GET    /dealer-performance
GET    /accounts-aging
```

## User Roles

```text
Super Admin
- Full system access

ERP Admin
- Manage users, roles, products, workflow settings

Sales Manager
- Manage all customers, dealers, quotes, orders, discounts

Sales Executive
- Create customers, create orders, follow up payments, view assigned orders

Dealer Manager
- Manage dealers, dealer orders, commissions, credit limits

Artwork Manager
- Assign artwork tasks, approve files, request changes

Artwork Designer
- Work on assigned artwork tasks, upload print-ready files

Production Manager
- Create jobs, assign stages, change priority, monitor factory load

Printing Staff
- View and update printing/sublimation stages assigned to them

Cutting Staff
- View and update cutting stages assigned to them

Stitching Staff
- View and update stitching stages assigned to them

QC Staff
- Inspect output, record rejected quantities, pass/fail jobs

Dispatch Staff
- Pack shipments, assign courier, update tracking

Inventory Manager
- Manage materials, stock movement, purchase orders

Accounts
- Generate invoices, record payments, view aging reports

Support Agent
- View customer order state and respond to tickets
```

## Production Workflow Logic

### Order To Production

```text
1. Sales creates or confirms order.
2. System validates products, quantities, sizes, pricing, and payment terms.
3. Artwork task is created automatically.
4. Artwork team reviews design files and customer approvals.
5. Once artwork is approved, production job is generated.
6. BOM is calculated from order items and size matrix.
7. Inventory is reserved for fabric, trims, labels, packaging.
8. Production stages are created from the configured workflow.
9. Production manager assigns stages to departments/employees.
10. Each department starts and completes its stage.
11. QC records passed and rejected quantities.
12. Dispatch packs order and creates shipment.
13. Accounts issues invoice and records payment.
14. Order is marked completed after delivery and payment reconciliation.
```

### Stage Transition Rules

```text
Artwork Approval
- Cannot proceed until customer/admin approval exists.

Print File Setup
- Requires approved design and print-ready assets.

Fabric Allocation
- Requires available inventory or manager override.

Printing
- Requires fabric allocation completed.

Sublimation
- Requires printed panels ready.

Cutting
- Requires sublimated panels completed.

Stitching
- Requires cutting output quantity.

QC
- Requires stitching completed.
- Can create rework loops for rejected pieces.

Packing
- Requires QC passed quantity.

Dispatch
- Requires packed shipment and invoice readiness.
```

### Rework Logic

```text
If QC rejects quantity:
- Record rejected quantity and reason.
- Create rework task linked to original production job.
- Consume replacement materials if needed.
- Re-run relevant stage: printing, cutting, or stitching.
- Merge accepted rework output back into QC stage.
```

## Reporting Dashboard

Core widgets:

```text
Sales
- New orders
- Confirmed revenue
- Pending payments
- Dealer revenue

Production
- Active jobs
- Jobs by stage
- Delayed jobs
- Department workload
- Rejection rate

Inventory
- Low stock materials
- Material consumption
- Purchase order status
- Stock valuation

Artwork
- Pending approvals
- Changes requested
- Average artwork turnaround time

Dispatch
- Pending dispatches
- Shipped today
- Delivery exceptions

Accounts
- Outstanding amount
- Paid invoices
- Overdue invoices
- Dealer credit exposure
```

## Recommended React Admin Frontend

```text
src/
|-- app/
|   |-- dashboard/
|   |-- orders/
|   |-- artwork/
|   |-- production/
|   |-- inventory/
|   |-- dealers/
|   |-- dispatch/
|   |-- accounts/
|   `-- reports/
|-- components/
|   |-- tables/
|   |-- forms/
|   |-- workflow/
|   |-- charts/
|   `-- layout/
|-- features/
|   |-- orders/
|   |-- artwork/
|   |-- production/
|   |-- inventory/
|   |-- dispatch/
|   `-- accounts/
`-- lib/
    |-- api-client.ts
    |-- auth.ts
    `-- permissions.ts
```

Frontend rules:

```text
- Use role-based navigation.
- Keep backend as source of truth for permissions.
- Use server pagination for ERP tables.
- Use filters for status, department, date range, dealer, and employee.
- Use optimistic UI only for low-risk updates.
- Require confirmation for irreversible workflow changes.
```

## Infrastructure

```text
Laravel API
- api.theduel.in
- JWT or Sanctum with secure cookies
- Redis queues
- Laravel Horizon

PostgreSQL
- Managed PostgreSQL
- UUID primary keys
- JSONB for snapshots and design payloads

Storage
- Cloudflare R2 for artwork, previews, invoices, job cards

React Admin
- erp.theduel.in
- Vercel, Cloudflare Pages, or self-hosted Node

Monitoring
- Sentry
- Better Stack
- Laravel logs
- Database slow query monitoring
```
