# Evidence Integrity Engine

This directory contains the provider-neutral integrity core extracted from the ProofFlow accountability model.

## Purpose

The engine evaluates whether a structured claim is supported by preserved, source-backed evidence. It does not retrieve documents, call an AI model, make legal/professional judgments, or require a particular vendor.

## Boundary

**AI / application:** proposes questions, retrieves material, extracts text, summarizes, compares, or asks models to reason.

**Evidence Integrity Engine:** validates the supplied record structure, preserves the distinction between source and assertion, evaluates explicit evidence relationships, surfaces contrary evidence, and reports what remains unknown.

The engine must remain usable by The Citizen's Record, Open the Record, ProofFlow, and future third-party applications without depending on any one application or model provider.

## Core invariant

A source existing is not enough to make a claim a `FACT`. The claim must have source-backed evidence explicitly linked as `SUPPORTING`. If `CONTRARY` evidence is also present, the result is `CONTRADICTION` rather than silently resolving the conflict.

Malformed or ambiguous records fail safely to `UNKNOWN` rather than being promoted to a stronger classification.

## Current implementation

- `types.ts` — provider-neutral input/output contracts.
- `integrity.ts` — deterministic integrity evaluation and structural safeguards.
- `integrity.test.ts` — executable happy-path and adversarial invariants.
- `index.ts` — public module surface.

## Deliberate non-goals

The deterministic core does **not** perform network retrieval, persistence, OCR, semantic fact checking, model inference, authentication, authorization, or legal/professional conclusions. Those capabilities belong in application/provider adapters around the engine.

This separation lets multiple applications and AI/agent providers use the same integrity rules without making any provider the source of truth.
