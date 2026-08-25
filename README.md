# ProofFlow

> **Repository status: recovery bootstrap — not the ProofFlow application source.**

ProofFlow is intended to support evidence and information organization with emphasis on source traceability, chronology, preservation, contradictions, missing evidence, and verification.

## Current status

This repository does **not** currently contain the ProofFlow application source code. It is intentionally preserved as a recovery/bootstrap repository while the canonical application source is located.

Do not treat this repository as deployable production software.

See [PROJECT_RECOVERY_STATUS.md](PROJECT_RECOVERY_STATUS.md) for the verified recovery state and [PROJECT_STATUS.md](PROJECT_STATUS.md) for the original status record.

## Recovery sequence

1. Locate the actual managed project, source archive, or canonical repository containing the complete ProofFlow codebase.
2. Import the source into a dedicated branch or reviewed commit without overwriting it blindly.
3. Add or verify non-secret configuration documentation and a sanitized `.env.example` if applicable.
4. Run the project's install, type-check, test, build, and startup procedures.
5. Verify deployment on the intended hosting platform.
6. Only then designate a production release and archive or repurpose this bootstrap state.

## Safety and integrity

- Never commit credentials, API keys, private evidence, or user records.
- Preserve original source files and provenance where possible.
- Do not claim that a source, contradiction, or missing record proves a legal conclusion without human review.
- ProofFlow is an organization and verification workflow; it is not a substitute for legal advice or professional judgment.

## Immediate blocker

**The complete current ProofFlow application source has not yet been recovered into this repository.**
