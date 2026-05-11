# PostgreSQL Schema Design

This schema supports a custom sportswear manufacturing platform with customer ordering, dealer workflows, artwork approvals, production batches, inventory, dispatch, payments, employees, departments, and notifications.

SQL file:

```text
database/theduel_manufacturing_schema.sql
```

## Relationship Overview

```text
departments 1--n employees
employees n--n roles through employee_roles

dealers n--n customers through dealer_customers
customers 1--n orders
dealers 1--n orders
customers 1--n designs
products 1--n designs
products 1--n order_items

orders 1--n order_items
orders 1--n artwork_approvals
designs 1--n artwork_approvals
designs 1--n design_assets

orders 1--n production_batches
production_batches 1--n production_batch_stages
production_stages 1--n production_batch_stages
departments 1--n production_stages

inventory_items 1--n inventory_movements

orders 1--n dispatches
dispatches 1--n dispatch_items
order_items 1--n dispatch_items

orders 1--n payments

customers/dealers/employees 1--n notifications
```

## Normalization Choices

- Customers and dealers are separate because dealers have credit limits, commission rates, territories, and dealer-customer mappings.
- Orders and order items are normalized so each order can contain multiple product/design/size combinations.
- Designs are independent from orders, allowing saved designs and reorders.
- Design assets are separated from designs so logos, print files, previews, and references can be approved and replaced independently.
- Artwork approvals are separate workflow records linked to both order and design.
- Production batches are linked to orders and optionally order items, allowing a large order to be split into multiple production batches.
- Production stages are configurable and linked to departments.
- Inventory movements are ledger-style instead of only updating stock directly, which is critical for ERP auditability.
- Dispatches support partial shipments through dispatch items.
- Notifications support customers, dealers, and employees with a single table and recipient constraints.

## JSONB Usage

JSONB is used only where flexibility is valuable:

- `billing_address` and `shipping_address`
- `design_json`
- `customization_snapshot`
- `size_breakdown`
- metadata and notification payloads

Do not use JSONB for core workflow state, money, quantities, foreign keys, or reporting dimensions.

## Index Strategy

The schema includes indexes for:

- Customer/dealer order history
- Order status boards
- Payment status reporting
- Expected delivery and delay tracking
- Artwork task queues by assignee/status/due date
- Production board filtering by department/status/priority
- Production stage assignment queues
- Inventory ledger lookups
- Dispatch status and tracking lookup
- Notification inbox queries
- GIN indexes for design JSON and size matrix search

## Scalability Recommendations

- Use UUID primary keys for distributed-safe identifiers.
- Keep human-readable numbers separately: `order_number`, `batch_number`, `payment_number`, `dispatch_number`.
- Add table partitioning later for high-volume append-only tables:
  - `inventory_movements`
  - `notifications`
  - production logs, if added
  - payment gateway events, if added
- Use partial indexes for active dashboards instead of indexing every historical row equally.
- Keep order item `customization_snapshot` immutable after order confirmation.
- Store final artwork assets in Cloudflare R2 and only persist object keys/metadata in PostgreSQL.
- Use database transactions for order confirmation, stock reservation, batch creation, and payment reconciliation.
- Use row-level locking or advisory locks when reserving inventory.
- Use Laravel policies for authorization and database constraints for data integrity.
- Use read replicas for reporting once production volume grows.
- Use materialized views for heavy ERP dashboards such as daily sales, stage aging, dealer performance, and inventory valuation.

## ERP Compatibility Notes

- Production batches and production batch stages map directly to factory job cards.
- `current_department_id` supports fast Kanban filtering.
- `production_batch_stages.assigned_to_employee_id` supports staff queues.
- `rejected_quantity` fields support QC and rework workflows.
- `inventory_movements.reference_type/reference_id` links material consumption back to orders, batches, or purchase records.
- Notifications can drive in-app alerts, WhatsApp, email, and SMS using a single event model.

## Recommended Additions For Later

- `production_stage_logs` for detailed audit trails.
- `invoices` table if payments need invoice-level allocation.
- `purchase_orders` and `vendors` for procurement.
- `dealer_commissions` for commission settlement.
- `quality_inspections` for QC checklists.
- `audit_logs` for compliance and administrative changes.
- `webhook_events` for payment gateway and courier callbacks.
