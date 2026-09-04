import type { EvidenceLink, IntegrityFinding, IntegrityInput } from "./types";

function linkedEvidence(input: IntegrityInput, relationship: EvidenceLink["relationship"]) {
  const links = input.evidenceLinks ?? [];
  const evidenceById = new Map(input.evidence.map((item) => [item.id, item]));

  return links
    .filter((link) => link.relationship === relationship)
    .map((link) => evidenceById.get(link.evidenceId))
    .filter((item): item is IntegrityInput["evidence"][number] => Boolean(item));
}

/**
 * Deterministic core rule:
 * a claim is never promoted to FACT merely because a source exists.
 * It requires source-backed evidence, and contrary evidence remains visible.
 *
 * This function is deliberately provider-neutral. It accepts structured records
 * from any application, model, agent, or retrieval system and performs no network
 * calls and no model inference.
 */
export function evaluateIntegrity(input: IntegrityInput): IntegrityFinding {
  const sourcesById = new Map(input.sources.map((source) => [source.id, source]));
  const evidence = input.evidence.filter((item) => sourcesById.has(item.sourceId) && item.exactText.trim().length > 0);

  const supporting = linkedEvidence({ ...input, evidence }, "SUPPORTING");
  const contrary = linkedEvidence({ ...input, evidence }, "CONTRARY");

  const reasons: string[] = [];
  const unknowns: string[] = [];
  const missingEvidence: string[] = [];

  if (!input.question.trim()) {
    unknowns.push("The record does not contain a specific question.");
  }

  if (!input.claim.text.trim()) {
    unknowns.push("The record does not contain a claim to evaluate.");
  }

  if (input.sources.length === 0) {
    missingEvidence.push("No source has been identified.");
  }

  if (evidence.length === 0) {
    missingEvidence.push("No source-backed evidence with preserved exact text is available.");
  }

  if (supporting.length > 0 && contrary.length > 0) {
    reasons.push("Supporting and contrary evidence are both present; the conflict must remain visible.");
  } else if (supporting.length > 0) {
    reasons.push("At least one source-backed evidence item supports the claim.");
  } else if (evidence.length > 0) {
    reasons.push("Evidence exists, but no supporting relationship has been established.");
  }

  if (unknowns.length > 0) {
    return {
      classification: "UNKNOWN",
      supportsClaim: false,
      supportingEvidenceIds: supporting.map((item) => item.id),
      contraryEvidenceIds: contrary.map((item) => item.id),
      missingEvidence,
      unknowns,
      reasons,
    };
  }

  if (supporting.length > 0 && contrary.length > 0) {
    return {
      classification: "CONTRADICTION",
      supportsClaim: true,
      supportingEvidenceIds: supporting.map((item) => item.id),
      contraryEvidenceIds: contrary.map((item) => item.id),
      missingEvidence,
      unknowns,
      reasons,
    };
  }

  if (supporting.length > 0) {
    return {
      classification: "FACT",
      supportsClaim: true,
      supportingEvidenceIds: supporting.map((item) => item.id),
      contraryEvidenceIds: contrary.map((item) => item.id),
      missingEvidence,
      unknowns,
      reasons,
    };
  }

  if (evidence.length > 0) {
    return {
      classification: "CLAIM",
      supportsClaim: false,
      supportingEvidenceIds: [],
      contraryEvidenceIds: contrary.map((item) => item.id),
      missingEvidence,
      unknowns,
      reasons,
    };
  }

  return {
    classification: "CLAIM",
    supportsClaim: false,
    supportingEvidenceIds: [],
    contraryEvidenceIds: [],
    missingEvidence,
    unknowns,
    reasons,
  };
}
