export const epistemicCategories = [
  "FACT",
  "AUTHORITY",
  "CLAIM",
  "INFERENCE",
  "CONTRADICTION",
  "QUESTION",
  "UNKNOWN",
] as const;

export type EpistemicCategory = (typeof epistemicCategories)[number];

export type EvidenceRelationship = "SUPPORTING" | "CONTRARY";

export interface Source {
  id: string;
  title: string;
  locator?: string;
  authority?: string;
  designation?: "PRIMARY" | "SECONDARY" | "UNKNOWN";
  version?: string;
  retrievedAt?: string;
}

export interface Evidence {
  id: string;
  sourceId: string;
  exactText: string;
  locator?: string;
  capturedAt?: string;
  hash?: string;
}

export interface Claim {
  id: string;
  text: string;
  sourceIds?: string[];
  evidenceIds?: string[];
}

export interface EvidenceLink {
  evidenceId: string;
  relationship: EvidenceRelationship;
}

export interface IntegrityInput {
  question: string;
  claim: Claim;
  sources: Source[];
  evidence: Evidence[];
  evidenceLinks?: EvidenceLink[];
}

export interface IntegrityFinding {
  classification: EpistemicCategory;
  supportsClaim: boolean;
  supportingEvidenceIds: string[];
  contraryEvidenceIds: string[];
  missingEvidence: string[];
  unknowns: string[];
  reasons: string[];
}
