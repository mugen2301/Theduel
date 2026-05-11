-- The Duel custom sportswear manufacturing platform
-- PostgreSQL schema for commerce, dealer, artwork, production, inventory,
-- dispatch, payments, employees, departments, and notifications.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Shared timestamp helper convention:
-- Application should maintain updated_at via Laravel model timestamps.

CREATE TABLE departments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(120) NOT NULL,
    slug varchar(120) NOT NULL UNIQUE,
    description text,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE employees (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
    employee_code varchar(60) NOT NULL UNIQUE,
    name varchar(160) NOT NULL,
    email varchar(180) NOT NULL UNIQUE,
    phone varchar(40),
    designation varchar(120),
    status varchar(40) NOT NULL DEFAULT 'active',
    joined_on date,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT employees_status_check CHECK (status IN ('active', 'inactive', 'suspended'))
);

CREATE TABLE roles (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(120) NOT NULL,
    slug varchar(120) NOT NULL UNIQUE,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE employee_roles (
    employee_id uuid NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    role_id uuid NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (employee_id, role_id)
);

CREATE TABLE customers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_code varchar(60) NOT NULL UNIQUE,
    contact_name varchar(160) NOT NULL,
    company_name varchar(180),
    email varchar(180),
    phone varchar(40) NOT NULL,
    gst_number varchar(30),
    billing_address jsonb NOT NULL DEFAULT '{}'::jsonb,
    shipping_address jsonb NOT NULL DEFAULT '{}'::jsonb,
    status varchar(40) NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT customers_status_check CHECK (status IN ('active', 'inactive', 'blocked'))
);

CREATE TABLE dealers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dealer_code varchar(60) NOT NULL UNIQUE,
    business_name varchar(180) NOT NULL,
    contact_name varchar(160) NOT NULL,
    email varchar(180),
    phone varchar(40) NOT NULL,
    gst_number varchar(30),
    territory varchar(120),
    commission_rate numeric(6, 3) NOT NULL DEFAULT 0,
    credit_limit numeric(14, 2) NOT NULL DEFAULT 0,
    outstanding_balance numeric(14, 2) NOT NULL DEFAULT 0,
    status varchar(40) NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT dealers_status_check CHECK (status IN ('active', 'inactive', 'blocked')),
    CONSTRAINT dealers_commission_check CHECK (commission_rate >= 0)
);

CREATE TABLE dealer_customers (
    dealer_id uuid NOT NULL REFERENCES dealers(id) ON DELETE CASCADE,
    customer_id uuid NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    assigned_at timestamptz NOT NULL DEFAULT now(),
    PRIMARY KEY (dealer_id, customer_id)
);

CREATE TABLE product_categories (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id uuid REFERENCES product_categories(id) ON DELETE SET NULL,
    name varchar(140) NOT NULL,
    slug varchar(160) NOT NULL UNIQUE,
    is_active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id uuid NOT NULL REFERENCES product_categories(id),
    name varchar(180) NOT NULL,
    slug varchar(200) NOT NULL UNIQUE,
    product_type varchar(80) NOT NULL,
    base_price numeric(14, 2) NOT NULL DEFAULT 0,
    min_order_quantity integer NOT NULL DEFAULT 1,
    status varchar(40) NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT products_status_check CHECK (status IN ('active', 'inactive', 'archived')),
    CONSTRAINT products_moq_check CHECK (min_order_quantity > 0)
);

CREATE TABLE designs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id uuid NOT NULL REFERENCES customers(id),
    dealer_id uuid REFERENCES dealers(id) ON DELETE SET NULL,
    product_id uuid NOT NULL REFERENCES products(id),
    design_number varchar(80) NOT NULL UNIQUE,
    name varchar(180) NOT NULL,
    design_json jsonb NOT NULL DEFAULT '{}'::jsonb,
    preview_url text,
    status varchar(50) NOT NULL DEFAULT 'draft',
    created_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT designs_status_check CHECK (status IN ('draft', 'submitted', 'under_review', 'changes_requested', 'approved', 'rejected', 'archived'))
);

CREATE TABLE design_assets (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    design_id uuid NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    asset_type varchar(60) NOT NULL,
    original_filename varchar(255) NOT NULL,
    mime_type varchar(120) NOT NULL,
    file_size_bytes bigint NOT NULL,
    storage_disk varchar(60) NOT NULL DEFAULT 'r2',
    object_key text NOT NULL,
    public_url text,
    status varchar(40) NOT NULL DEFAULT 'uploaded',
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT design_assets_status_check CHECK (status IN ('uploaded', 'approved', 'rejected', 'replaced')),
    CONSTRAINT design_assets_type_check CHECK (asset_type IN ('team_logo', 'sponsor_logo', 'sleeve_logo', 'reference', 'print_file', 'preview'))
);

CREATE TABLE orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_number varchar(80) NOT NULL UNIQUE,
    customer_id uuid NOT NULL REFERENCES customers(id),
    dealer_id uuid REFERENCES dealers(id) ON DELETE SET NULL,
    sales_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    status varchar(50) NOT NULL DEFAULT 'draft',
    payment_status varchar(50) NOT NULL DEFAULT 'unpaid',
    production_status varchar(50) NOT NULL DEFAULT 'not_started',
    subtotal numeric(14, 2) NOT NULL DEFAULT 0,
    discount_total numeric(14, 2) NOT NULL DEFAULT 0,
    tax_total numeric(14, 2) NOT NULL DEFAULT 0,
    grand_total numeric(14, 2) NOT NULL DEFAULT 0,
    expected_delivery_date date,
    confirmed_at timestamptz,
    completed_at timestamptz,
    cancelled_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT orders_status_check CHECK (status IN ('draft', 'confirmed', 'artwork', 'production', 'qc', 'packing', 'dispatch', 'completed', 'cancelled')),
    CONSTRAINT orders_payment_status_check CHECK (payment_status IN ('unpaid', 'partial', 'paid', 'refunded')),
    CONSTRAINT orders_production_status_check CHECK (production_status IN ('not_started', 'queued', 'active', 'paused', 'completed'))
);

CREATE TABLE order_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id uuid NOT NULL REFERENCES products(id),
    design_id uuid REFERENCES designs(id) ON DELETE SET NULL,
    item_name varchar(180) NOT NULL,
    sku varchar(120),
    quantity integer NOT NULL,
    unit_price numeric(14, 2) NOT NULL,
    tax_rate numeric(6, 3) NOT NULL DEFAULT 0,
    line_total numeric(14, 2) NOT NULL,
    size_breakdown jsonb NOT NULL DEFAULT '{}'::jsonb,
    customization_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT order_items_quantity_check CHECK (quantity > 0)
);

CREATE TABLE artwork_approvals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    design_id uuid NOT NULL REFERENCES designs(id) ON DELETE CASCADE,
    assigned_to_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    requested_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    status varchar(50) NOT NULL DEFAULT 'pending',
    revision_number integer NOT NULL DEFAULT 1,
    customer_comments text,
    internal_notes text,
    approved_by_customer_at timestamptz,
    approved_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    approved_at timestamptz,
    due_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT artwork_approvals_status_check CHECK (status IN ('pending', 'in_review', 'changes_requested', 'approved', 'rejected'))
);

CREATE TABLE production_batches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    batch_number varchar(80) NOT NULL UNIQUE,
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    order_item_id uuid REFERENCES order_items(id) ON DELETE SET NULL,
    current_department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
    priority varchar(40) NOT NULL DEFAULT 'normal',
    status varchar(50) NOT NULL DEFAULT 'queued',
    planned_start_date date,
    planned_end_date date,
    actual_start_at timestamptz,
    actual_end_at timestamptz,
    input_quantity integer NOT NULL,
    completed_quantity integer NOT NULL DEFAULT 0,
    rejected_quantity integer NOT NULL DEFAULT 0,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT production_batches_priority_check CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    CONSTRAINT production_batches_status_check CHECK (status IN ('queued', 'active', 'blocked', 'paused', 'completed', 'cancelled')),
    CONSTRAINT production_batches_quantity_check CHECK (input_quantity > 0)
);

CREATE TABLE production_stages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    department_id uuid NOT NULL REFERENCES departments(id),
    name varchar(120) NOT NULL,
    slug varchar(120) NOT NULL UNIQUE,
    sequence integer NOT NULL,
    requires_qc boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true
);

CREATE TABLE production_batch_stages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    production_batch_id uuid NOT NULL REFERENCES production_batches(id) ON DELETE CASCADE,
    production_stage_id uuid NOT NULL REFERENCES production_stages(id),
    assigned_to_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    status varchar(50) NOT NULL DEFAULT 'pending',
    started_at timestamptz,
    completed_at timestamptz,
    input_quantity integer,
    output_quantity integer,
    rejected_quantity integer NOT NULL DEFAULT 0,
    remarks text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    UNIQUE (production_batch_id, production_stage_id),
    CONSTRAINT production_batch_stages_status_check CHECK (status IN ('pending', 'ready', 'active', 'blocked', 'completed', 'failed'))
);

CREATE TABLE inventory_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sku varchar(120) NOT NULL UNIQUE,
    name varchar(180) NOT NULL,
    item_type varchar(80) NOT NULL,
    unit varchar(40) NOT NULL,
    current_stock numeric(14, 3) NOT NULL DEFAULT 0,
    reserved_stock numeric(14, 3) NOT NULL DEFAULT 0,
    reorder_level numeric(14, 3) NOT NULL DEFAULT 0,
    average_cost numeric(14, 2) NOT NULL DEFAULT 0,
    status varchar(40) NOT NULL DEFAULT 'active',
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT inventory_items_stock_check CHECK (current_stock >= 0 AND reserved_stock >= 0),
    CONSTRAINT inventory_items_status_check CHECK (status IN ('active', 'inactive', 'discontinued'))
);

CREATE TABLE inventory_movements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    inventory_item_id uuid NOT NULL REFERENCES inventory_items(id),
    movement_type varchar(60) NOT NULL,
    quantity numeric(14, 3) NOT NULL,
    unit_cost numeric(14, 2),
    reference_type varchar(80),
    reference_id uuid,
    notes text,
    created_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT inventory_movements_type_check CHECK (movement_type IN ('purchase', 'reservation', 'consumption', 'release', 'adjustment', 'return', 'transfer')),
    CONSTRAINT inventory_movements_quantity_check CHECK (quantity <> 0)
);

CREATE TABLE dispatches (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_number varchar(80) NOT NULL UNIQUE,
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    packed_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    dispatched_by_employee_id uuid REFERENCES employees(id) ON DELETE SET NULL,
    courier_name varchar(120),
    tracking_number varchar(160),
    package_count integer NOT NULL DEFAULT 1,
    status varchar(50) NOT NULL DEFAULT 'pending',
    packed_at timestamptz,
    dispatched_at timestamptz,
    delivered_at timestamptz,
    delivery_address jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT dispatches_status_check CHECK (status IN ('pending', 'packed', 'dispatched', 'in_transit', 'delivered', 'returned', 'cancelled'))
);

CREATE TABLE dispatch_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_id uuid NOT NULL REFERENCES dispatches(id) ON DELETE CASCADE,
    order_item_id uuid NOT NULL REFERENCES order_items(id),
    quantity integer NOT NULL,
    package_label varchar(120),
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT dispatch_items_quantity_check CHECK (quantity > 0)
);

CREATE TABLE payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    payment_number varchar(80) NOT NULL UNIQUE,
    amount numeric(14, 2) NOT NULL,
    payment_method varchar(60) NOT NULL,
    gateway varchar(80),
    gateway_transaction_id varchar(180),
    status varchar(50) NOT NULL DEFAULT 'pending',
    paid_at timestamptz,
    metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT payments_amount_check CHECK (amount > 0),
    CONSTRAINT payments_status_check CHECK (status IN ('pending', 'successful', 'failed', 'refunded', 'cancelled'))
);

CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    recipient_type varchar(40) NOT NULL,
    customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
    dealer_id uuid REFERENCES dealers(id) ON DELETE CASCADE,
    employee_id uuid REFERENCES employees(id) ON DELETE CASCADE,
    channel varchar(40) NOT NULL,
    event_type varchar(120) NOT NULL,
    title varchar(180) NOT NULL,
    body text NOT NULL,
    payload jsonb NOT NULL DEFAULT '{}'::jsonb,
    status varchar(40) NOT NULL DEFAULT 'queued',
    read_at timestamptz,
    sent_at timestamptz,
    created_at timestamptz NOT NULL DEFAULT now(),
    CONSTRAINT notifications_recipient_type_check CHECK (recipient_type IN ('customer', 'dealer', 'employee')),
    CONSTRAINT notifications_channel_check CHECK (channel IN ('in_app', 'email', 'sms', 'whatsapp')),
    CONSTRAINT notifications_status_check CHECK (status IN ('queued', 'sent', 'failed', 'read')),
    CONSTRAINT notifications_single_recipient_check CHECK (
        (recipient_type = 'customer' AND customer_id IS NOT NULL AND dealer_id IS NULL AND employee_id IS NULL)
        OR (recipient_type = 'dealer' AND dealer_id IS NOT NULL AND customer_id IS NULL AND employee_id IS NULL)
        OR (recipient_type = 'employee' AND employee_id IS NOT NULL AND customer_id IS NULL AND dealer_id IS NULL)
    )
);

-- Indexes for common ERP and dashboard access patterns.

CREATE INDEX idx_employees_department_status ON employees (department_id, status);
CREATE INDEX idx_customers_phone ON customers (phone);
CREATE INDEX idx_customers_email ON customers (email);
CREATE INDEX idx_dealers_status_territory ON dealers (status, territory);
CREATE INDEX idx_dealer_customers_customer ON dealer_customers (customer_id);

CREATE INDEX idx_designs_customer_status ON designs (customer_id, status);
CREATE INDEX idx_designs_dealer_status ON designs (dealer_id, status) WHERE dealer_id IS NOT NULL;
CREATE INDEX idx_designs_product ON designs (product_id);
CREATE INDEX idx_design_assets_design_type ON design_assets (design_id, asset_type);
CREATE INDEX idx_designs_design_json_gin ON designs USING gin (design_json);

CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at DESC);
CREATE INDEX idx_orders_dealer_created ON orders (dealer_id, created_at DESC) WHERE dealer_id IS NOT NULL;
CREATE INDEX idx_orders_status_created ON orders (status, created_at DESC);
CREATE INDEX idx_orders_payment_status ON orders (payment_status);
CREATE INDEX idx_orders_expected_delivery ON orders (expected_delivery_date) WHERE status NOT IN ('completed', 'cancelled');
CREATE INDEX idx_order_items_order ON order_items (order_id);
CREATE INDEX idx_order_items_design ON order_items (design_id) WHERE design_id IS NOT NULL;
CREATE INDEX idx_order_items_size_breakdown_gin ON order_items USING gin (size_breakdown);

CREATE INDEX idx_artwork_approvals_order ON artwork_approvals (order_id);
CREATE INDEX idx_artwork_approvals_design_status ON artwork_approvals (design_id, status);
CREATE INDEX idx_artwork_approvals_assignee_status ON artwork_approvals (assigned_to_employee_id, status);
CREATE INDEX idx_artwork_approvals_due ON artwork_approvals (due_at) WHERE status NOT IN ('approved', 'rejected');

CREATE INDEX idx_production_batches_order ON production_batches (order_id);
CREATE INDEX idx_production_batches_status_priority ON production_batches (status, priority);
CREATE INDEX idx_production_batches_department_status ON production_batches (current_department_id, status);
CREATE INDEX idx_production_batches_planned_end ON production_batches (planned_end_date) WHERE status NOT IN ('completed', 'cancelled');
CREATE INDEX idx_production_batch_stages_batch ON production_batch_stages (production_batch_id);
CREATE INDEX idx_production_batch_stages_assignee_status ON production_batch_stages (assigned_to_employee_id, status);
CREATE INDEX idx_production_batch_stages_stage_status ON production_batch_stages (production_stage_id, status);

CREATE INDEX idx_inventory_items_type_status ON inventory_items (item_type, status);
CREATE INDEX idx_inventory_items_low_stock ON inventory_items (item_type, current_stock, reorder_level) WHERE status = 'active';
CREATE INDEX idx_inventory_movements_item_created ON inventory_movements (inventory_item_id, created_at DESC);
CREATE INDEX idx_inventory_movements_reference ON inventory_movements (reference_type, reference_id);

CREATE INDEX idx_dispatches_order ON dispatches (order_id);
CREATE INDEX idx_dispatches_status_created ON dispatches (status, created_at DESC);
CREATE INDEX idx_dispatches_tracking ON dispatches (tracking_number) WHERE tracking_number IS NOT NULL;
CREATE INDEX idx_dispatch_items_dispatch ON dispatch_items (dispatch_id);

CREATE INDEX idx_payments_order_created ON payments (order_id, created_at DESC);
CREATE INDEX idx_payments_status_paid ON payments (status, paid_at DESC);
CREATE INDEX idx_payments_gateway_transaction ON payments (gateway, gateway_transaction_id) WHERE gateway_transaction_id IS NOT NULL;

CREATE INDEX idx_notifications_customer_status ON notifications (customer_id, status, created_at DESC) WHERE customer_id IS NOT NULL;
CREATE INDEX idx_notifications_dealer_status ON notifications (dealer_id, status, created_at DESC) WHERE dealer_id IS NOT NULL;
CREATE INDEX idx_notifications_employee_status ON notifications (employee_id, status, created_at DESC) WHERE employee_id IS NOT NULL;
CREATE INDEX idx_notifications_event_created ON notifications (event_type, created_at DESC);
