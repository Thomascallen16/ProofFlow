# Evidence Integrity Engine — Foundation

This directory contains the provider-neutral integrity core extracted from the ProofFlow accountability model.

## Purpose

The engine evaluates whether a structured claim is supported by preserved, source-backed evidence. It does not retrieve documents, call an AI model, make legal judgments, or require a particular vendor.

## Boundary

**AI / application:** proposes, retrieves, extracts, summarizes, compares, or asks questions.

**Evidence Integrity Engine:** checks the supplied structure, preserves the distinction between evidence and assertion, surfaces contrary evidence, and reports what remains unknown.

The engine must remain usable by The Citizen's Record, Open the Record, ProofFlow, and future third-party applications without depending on any one application or model provider.

## Core invariant

A source existing is not enough to make a claim a FACT. The claim must have source-backed evidence explicitly linked as supporting evidence. If contrary evidence is present, the result is `CONTRADICTION` rather than silently resolving the conflict.

## Current implementation

- `types.ts` — provider-neutral input/output contracts.
- `integrity.ts` — deterministic integrity evaluation.
- `integrity.test.ts` — executable invariants.
- `index.ts` — public module surface.

This is the foundation, not the completed engine. Network retrieval, persistence, adapters, audit APIs, and model/agent integrations belong outside this deterministic core.
