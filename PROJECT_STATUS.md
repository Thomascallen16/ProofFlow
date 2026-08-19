# ProofFlow — Source of Truth

Status: REPOSITORY BOOTSTRAP / MANUS AUDIT IN PROGRESS

This repository is intentionally being established as the canonical GitHub source for ProofFlow. Do not commit secrets, Stripe secret keys, API tokens, or production credentials.

## Required before production
- Import the complete current ProofFlow application from Manus.
- Verify install/build/test/start commands.
- Verify production environment variables without committing values.
- Verify Stripe live account and Price IDs belong to the same account.
- Verify checkout/payment success and cancellation flows in production-safe testing.
- Deploy only after smoke tests pass.

## Current known issue
The repository was empty during the initial audit. Manus must export/sync the actual current application here before this repository can be considered a backup.

## Cleanup rule
Do not delete the Manus build until its files, configuration, deployment settings, and required environment-variable names have been captured in GitHub and the replacement deployment has passed smoke tests.
