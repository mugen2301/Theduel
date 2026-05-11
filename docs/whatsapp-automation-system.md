# WhatsApp Automation System

This design connects the Laravel ERP backend to WhatsApp Cloud API for transactional manufacturing notifications.

## Notification Events

```text
Order received
Artwork ready
Approval reminder
Production started
Dispatch update
Payment reminder
```

## High-Level Architecture

```text
ERP Domain Events
   |
   v
NotificationService
   |
   v
notification_events table
   |
   v
Laravel Queue
   |
   v
SendWhatsAppMessageJob
   |
   v
WhatsApp Cloud API
   |
   v
Customer WhatsApp

Meta Webhooks
   |
   v
/api/webhooks/whatsapp
   |
   v
Webhook verification + signature validation
   |
   v
whatsapp_webhook_events table
   |
   v
ProcessWhatsAppWebhookJob
   |
   v
Message status / replies / audit logs
```

Meta Cloud API is built on Graph API and sends/receives data over HTTPS. Meta docs also note that message content and outgoing delivery statuses are delivered to your server through webhooks, so the ERP should never treat the send API response as final delivery confirmation.

## Core Laravel Modules

```text
app/
|-- Domains/
|   |-- Notifications/
|   |   |-- Actions/
|   |   |-- DTOs/
|   |   |-- Jobs/
|   |   |-- Models/
|   |   |-- Services/
|   |   `-- Templates/
|   |-- Orders/
|   |-- Artwork/
|   |-- Production/
|   |-- Dispatch/
|   `-- Accounts/
|-- Http/
|   |-- Controllers/
|   |   `-- Webhooks/
|   |       `-- WhatsAppWebhookController.php
|   `-- Middleware/
`-- Support/
    `-- WhatsApp/
        |-- WhatsAppCloudClient.php
        |-- WhatsAppTemplateRenderer.php
        `-- WhatsAppSignatureVerifier.php
```

## Database Tables

```sql
whatsapp_templates
- id uuid pk
- event_type varchar unique
- template_name varchar
- language_code varchar
- category varchar -- utility, authentication, marketing
- status varchar -- draft, submitted, approved, rejected, paused
- variables jsonb
- is_active boolean
- created_at
- updated_at

notification_events
- id uuid pk
- event_type varchar
- recipient_type varchar -- customer, dealer, employee
- customer_id uuid nullable
- dealer_id uuid nullable
- employee_id uuid nullable
- order_id uuid nullable
- design_id uuid nullable
- production_batch_id uuid nullable
- payment_id uuid nullable
- channel varchar -- whatsapp
- template_id uuid nullable
- payload jsonb
- status varchar -- pending, queued, sent, delivered, read, failed, cancelled
- scheduled_at timestamptz nullable
- sent_at timestamptz nullable
- delivered_at timestamptz nullable
- read_at timestamptz nullable
- failed_at timestamptz nullable
- failure_code varchar nullable
- failure_message text nullable
- idempotency_key varchar unique
- created_at
- updated_at

whatsapp_messages
- id uuid pk
- notification_event_id uuid fk
- recipient_phone varchar
- phone_number_id varchar
- template_name varchar nullable
- message_type varchar -- template, text, image, document, interactive
- outbound_payload jsonb
- meta_message_id varchar unique nullable
- status varchar -- accepted, sent, delivered, read, failed
- error_code varchar nullable
- error_message text nullable
- created_at
- updated_at

whatsapp_webhook_events
- id uuid pk
- event_id varchar nullable
- meta_message_id varchar nullable
- event_type varchar -- message_status, inbound_message, template_status, account_update
- payload jsonb
- signature varchar nullable
- processed_at timestamptz nullable
- processing_status varchar -- pending, processed, failed, ignored
- created_at

whatsapp_conversations
- id uuid pk
- customer_id uuid nullable
- dealer_id uuid nullable
- phone varchar
- last_message_at timestamptz
- last_inbound_at timestamptz nullable
- last_outbound_at timestamptz nullable
- open_until timestamptz nullable
- status varchar -- open, closed, muted
- created_at
- updated_at
```

## Notification Triggers

### Order Received

Triggered when:

```text
orders.status changes from draft to confirmed
```

Template variables:

```text
customer_name
order_number
product_summary
quantity
dashboard_link
```

### Artwork Ready

Triggered when:

```text
artwork_approvals.status becomes pending_customer_approval
```

Template variables:

```text
customer_name
order_number
design_name
approval_link
```

### Approval Reminder

Triggered by scheduled command:

```text
php artisan notifications:send-approval-reminders
```

Rules:

```text
approval is pending
approval due_at is within configured reminder window
no reminder sent in last X hours
order is not cancelled
```

### Production Started

Triggered when:

```text
production_batches.status changes to active
```

Template variables:

```text
order_number
batch_number
current_stage
expected_delivery_date
tracking_dashboard_link
```

### Dispatch Update

Triggered when:

```text
dispatches.status changes to dispatched or in_transit
```

Template variables:

```text
order_number
courier_name
tracking_number
tracking_link
```

### Payment Reminder

Triggered by scheduled command:

```text
php artisan notifications:send-payment-reminders
```

Rules:

```text
order payment_status is unpaid or partial
invoice due_date is near or overdue
no payment reminder sent in last X hours
dealer/customer is not blocked from reminders
```

## Queue System

Recommended queues:

```text
default
notifications
whatsapp-send
whatsapp-webhooks
whatsapp-retries
```

Recommended jobs:

```text
CreateNotificationEventJob
RenderWhatsAppTemplateJob
SendWhatsAppMessageJob
ProcessWhatsAppWebhookJob
UpdateWhatsAppMessageStatusJob
HandleInboundWhatsAppReplyJob
RetryFailedWhatsAppMessageJob
SendApprovalReminderJob
SendPaymentReminderJob
```

Queue flow:

```text
1. ERP action fires Laravel domain event.
2. Listener creates notification_events row with idempotency_key.
3. Notification event is queued.
4. Template renderer validates variables.
5. SendWhatsAppMessageJob sends template message through Cloud API.
6. API response meta message ID is stored.
7. Webhook later updates sent/delivered/read/failed status.
8. Dashboard shows final status from webhook state.
```

## Idempotency

Use deterministic idempotency keys:

```text
{event_type}:{order_id}:{recipient_type}:{recipient_id}:{revision}
```

Examples:

```text
order_received:ord_123:customer:cust_456:1
artwork_ready:approval_123:customer:cust_456:2
payment_reminder:invoice_123:customer:cust_456:2026-05-11
```

Before creating a notification, check if the key already exists.

## API Structure

### Internal ERP Notification APIs

```text
GET    /api/v1/notifications
GET    /api/v1/notifications/{id}
POST   /api/v1/notifications/{id}/retry
POST   /api/v1/notifications/{id}/cancel

GET    /api/v1/whatsapp/messages
GET    /api/v1/whatsapp/messages/{id}
GET    /api/v1/whatsapp/templates
POST   /api/v1/whatsapp/templates/sync
POST   /api/v1/whatsapp/test-message
```

### Event Trigger APIs

Most notifications should be triggered internally by domain events, not public HTTP calls. For administrative manual sends:

```text
POST /api/v1/orders/{order}/notifications/order-received
POST /api/v1/artwork-approvals/{approval}/notifications/artwork-ready
POST /api/v1/artwork-approvals/{approval}/notifications/reminder
POST /api/v1/production-batches/{batch}/notifications/started
POST /api/v1/dispatches/{dispatch}/notifications/update
POST /api/v1/invoices/{invoice}/notifications/payment-reminder
```

### WhatsApp Webhook APIs

```text
GET  /api/webhooks/whatsapp
POST /api/webhooks/whatsapp
```

GET handles Meta webhook verification:

```text
hub.mode
hub.verify_token
hub.challenge
```

If `hub.verify_token` matches `WHATSAPP_WEBHOOK_VERIFY_TOKEN`, return `hub.challenge`.

POST handles webhook events:

```text
1. Read raw request body.
2. Validate x-hub-signature-256 using Meta app secret.
3. Store raw payload in whatsapp_webhook_events.
4. Return HTTP 200 quickly.
5. Queue ProcessWhatsAppWebhookJob.
```

The webhook handler should be fast. Meta recommends low webhook latency and retries failed webhook deliveries with exponential backoff, so heavy processing belongs in queues.

## WhatsApp Cloud API Client

Configuration:

```text
WHATSAPP_GRAPH_VERSION=v23.0
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_APP_SECRET=
WHATSAPP_WEBHOOK_VERIFY_TOKEN=
```

Outbound endpoint pattern:

```text
POST https://graph.facebook.com/{version}/{phone_number_id}/messages
Authorization: Bearer {access_token}
Content-Type: application/json
```

Template message payload shape:

```json
{
  "messaging_product": "whatsapp",
  "recipient_type": "individual",
  "to": "919876543210",
  "type": "template",
  "template": {
    "name": "order_received",
    "language": {
      "code": "en"
    },
    "components": [
      {
        "type": "body",
        "parameters": [
          { "type": "text", "text": "Kamal" },
          { "type": "text", "text": "TD-260511-1042" }
        ]
      }
    ]
  }
}
```

## Webhook Flow

### Verification Flow

```text
Meta App Dashboard
   |
   v
GET /api/webhooks/whatsapp?hub.mode=subscribe&hub.verify_token=...&hub.challenge=...
   |
   v
Laravel compares verify token
   |
   v
Return challenge if valid, 403 if invalid
```

### Status Webhook Flow

```text
Meta sends POST webhook
   |
   v
Laravel validates x-hub-signature-256
   |
   v
Store raw payload
   |
   v
Return 200
   |
   v
Queue job extracts statuses
   |
   v
Find whatsapp_messages.meta_message_id
   |
   v
Update message + notification event status
   |
   v
ERP dashboard updates delivery/read/failed state
```

### Inbound Reply Flow

```text
Customer replies on WhatsApp
   |
   v
Meta sends inbound message webhook
   |
   v
Store raw payload
   |
   v
Queue inbound handler
   |
   v
Match phone to customer/dealer
   |
   v
Attach message to conversation
   |
   v
If reply relates to approval/payment, update task or notify staff
```

## Failure Handling

Handle:

```text
Invalid phone number
Template not approved
Template variable mismatch
Rate limit errors
Pair rate limit errors
Expired token
Webhook signature failure
Customer opt-out
Delivery failure
```

Retry policy:

```text
429 / rate limit: exponential backoff
5xx: retry
token errors: fail and alert admin
template errors: fail and alert operations
invalid recipient: fail permanently
```

## Compliance And Controls

```text
- Use approved templates for business-initiated messages.
- Store customer WhatsApp opt-in source and timestamp.
- Allow opt-out keywords like STOP.
- Keep message audit logs.
- Do not include sensitive payment credentials.
- Keep dashboard links signed or authenticated.
- Do not expose internal ERP IDs in message links.
```

## Laravel Event Mapping

```text
OrderConfirmed
-> OrderReceivedNotificationListener

ArtworkApprovalRequested
-> ArtworkReadyWhatsAppListener

ArtworkApprovalReminderDue
-> ApprovalReminderWhatsAppListener

ProductionBatchStarted
-> ProductionStartedWhatsAppListener

DispatchStatusChanged
-> DispatchUpdateWhatsAppListener

PaymentReminderDue
-> PaymentReminderWhatsAppListener
```

## Dashboard Monitoring

ERP admin should show:

```text
Messages queued
Messages sent
Messages delivered
Messages read
Messages failed
Failure reasons
Template quality status
Opt-outs
Reminder schedule
Webhook health
Last webhook received at
Queue lag
```

## Sources

- Meta Cloud API overview: https://meta-preview.mintlify.io/docs/whatsapp/cloud-api/overview
- WhatsApp Cloud API webhook verification/signature behavior from Meta-hosted SDK docs: https://whatsapp.github.io/WhatsApp-Nodejs-SDK/api-reference/webhooks/start/
