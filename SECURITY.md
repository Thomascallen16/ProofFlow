# Security

## Secrets

Never commit Stripe secret keys, API tokens, credentials, private evidence, or production configuration values. `.env.example` contains names only.

## Authorization

Server-side protected procedures must validate authentication and case/document membership. Never rely on client-supplied ownership IDs or UI visibility for authorization.

## Documents

Uploads remain private. Store object-storage keys and checksums in the database. Access must be mediated by authenticated server procedures.

## Extraction

Treat extracted text as untrusted input. Candidates require review before acceptance. Preserve source locations and original document versions.

## Stripe

Verify webhook signatures against the raw request body. Persist event IDs and reject duplicate processing. Never trust a browser-provided price ID or subscription state.

## Logging

Logs must not contain document contents, credentials, authorization headers, payment secrets, or unnecessary personal data.

## Release gates

Type checking, tests, build, authorization tests, storage isolation tests, billing tests, and deployment smoke tests must pass before production release.
