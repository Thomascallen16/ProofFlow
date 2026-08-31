# Architecture

## Target

ProofFlow is a source-first evidence organization and verification application. The target architecture is a React + TypeScript client, Express/tRPC server, relational database, private object storage, authenticated users, and server-side Stripe integration.

## Boundaries

- `client/`: presentation and user interaction.
- `server/`: authorization, persistence orchestration, storage access, billing, extraction, and reports.
- `drizzle/`: relational schema and migrations.
- `shared/`: enums, validation, and contracts shared by client and server.
- `docs/`: operational and recovery records.

Framework internals belong under `server/_core` and should not be replaced casually.

## Evidence lifecycle

`Question → Source → Evidence → Comparison → Finding → Unknowns → Verification`

Incoming extracted material enters a reviewable candidate state. Automated extraction never silently becomes an accepted evidence record. Accepted or human-edited candidates become evidence entries with source location and provenance retained.

## Authorization

Every protected procedure must establish the authenticated principal and enforce case/document ownership or membership on the server. Client routing is not an authorization boundary.

## Billing

Stripe secrets remain server-only. The server owns the authoritative price configuration and verifies webhook signatures against the raw request body. Processed Stripe event IDs are persisted for idempotency. Paid access is determined from verified server-side subscription state.

## Storage

Document bytes live in private object storage. Database rows contain metadata, checksums, versions, and storage keys. Public URLs are not used as an authorization mechanism.

## Reconstruction status

This architecture is a reconstruction specification. It must not be represented as the architecture of the missing original managed project unless independently verified.
