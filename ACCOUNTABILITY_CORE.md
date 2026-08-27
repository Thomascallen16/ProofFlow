# Accountability Core

## Purpose

ProofFlow is an accountability instrument for organizing evidence and information so that claims can be traced, checked, challenged, and corrected.

It does not decide legal outcomes, replace professional judgment, or require the user to accept the system's interpretation.

## Non-negotiable principles

1. **Source before conclusion.** Substantive assertions should point to their source whenever one exists.
2. **Separate record from interpretation.** Preserve the distinction between what a source says, what a user reports, what the system infers, and what remains unknown.
3. **Evidence cuts both ways.** Evidence that weakens a user's position must remain visible.
4. **Unknown is a valid result.** Missing information must not be silently filled with speculation.
5. **Conflicts remain visible.** Contradictory sources should be shown as conflicts until resolved by evidence.
6. **Provenance is part of the evidence.** Preserve source identity, location, date, and relevant document context where available.
7. **Corrections are traceable.** Do not silently rewrite history; preserve material corrections and their basis.
8. **No automated legal conclusion.** Flags, comparisons, timelines, and examples are informational and require human review.
9. **The same standard applies to everyone.** Citizens, institutions, professionals, software, and ProofFlow itself are evaluated by the record.
10. **The system must be auditable.** A material finding should be explainable through its inputs and the rule or comparison that produced it.

## Canonical evidence states

- `FACT` — supported by identified evidence.
- `LAW` — supported by identified legal authority; this is not a legal conclusion about the user's situation.
- `CLAIM` — attributed statement that has not independently been established.
- `INFERENCE` — reasoned assessment derived from identified evidence.
- `CONTRADICTION` — material sources or records conflict.
- `QUESTION` — specific unresolved issue.
- `UNKNOWN` — available material does not establish the answer.

## Core chain

**Question → Source → Evidence → Comparison → Finding → Unknowns → Verification**

The chain should remain inspectable. If the application cannot show why a finding was produced, the finding should be treated as provisional rather than authoritative.

## Product boundary

ProofFlow organizes and verifies information. It may provide educational examples, organizational templates, and source-linked workflows. It must not represent those materials as individualized legal advice or direct a user to a particular legal outcome solely because an automated model generated it.
