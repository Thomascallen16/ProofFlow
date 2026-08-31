# Billing Runbook

## Status

Stripe configuration is **UNVERIFIED** in this reconstruction branch.

The surviving requirements contain two candidate Price IDs. This repository deliberately does not choose between them without verification in the authoritative Stripe account and mode.

## Required server configuration

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID`
- `APP_BASE_URL`

Client-safe configuration may include `VITE_STRIPE_PUBLISHABLE_KEY`.

## Required procedures

- `billing.getStatus`
- `billing.createCheckoutSession`
- `billing.createPortalSession`

## Verification

Before production, verify the product/price, account, test/live mode, checkout success/cancellation, portal return, webhook signature verification, idempotency, and subscription lifecycle states. Mocked tests do not establish live payment functionality.
