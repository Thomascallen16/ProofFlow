# Data Model

All protected records are scoped to an authenticated user or case membership. Timestamps are UTC.

## Core entities

- `users`: authenticated identities.
- `cases`: case/workspace containers.
- `case_members`: explicit user roles and access.
- `source_documents`: private document metadata and provenance.
- `document_versions`: immutable version metadata, checksum, storage key, and extraction state.
- `evidence_entries`: accepted/edited source-linked evidence.
- `extraction_candidates`: machine-generated or imported candidates awaiting review.
- `timeline_events`: dated or uncertain chronology entries.
- `contradictions`: competing evidence/finding relationships requiring review.
- `questions`: unresolved research questions.
- `legal_authorities`: identified statutes, rules, cases, or other authorities.
- `people_agencies`: referenced people and agencies.
- `review_events`: audit trail for candidate/evidence review actions.
- `billing_customers`: Stripe customer linkage.
- `subscriptions`: verified subscription state and period information.
- `stripe_events`: processed webhook event IDs and metadata for idempotency.

## Evidence fields

An evidence record should preserve classification, neutral statement, source document, page/paragraph location, date when applicable, related people/agencies, confidence, quoted passage, and review status.

Allowed conceptual labels include `FACT`, `LAW`, `CLAIM`, `QUESTION`, and `UNKNOWN`, with supporting review states such as pending, accepted, edited, rejected, and reopened.

A source's existence alone does not establish FACT. A claim must remain attributable and unresolved material must remain visible.
