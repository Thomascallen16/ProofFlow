import type { RecordClassification } from "./enums";

export interface SourceReference {
  url?: string;
  citation?: string;
  exactSnippet?: string;
  verified?: boolean;
}

export interface CivicRecord {
  id: string;
  claim: string;
  evidence?: string;
  unknown?: string;
  primarySource?: SourceReference;
  classification?: RecordClassification;
}

export function classifyCivicRecord(record: CivicRecord): CivicRecord {
  const hasVerifiedSource =
    record.primarySource?.verified === true &&
    Boolean(record.primarySource.exactSnippet?.trim()) &&
    Boolean(record.primarySource.url?.trim() || record.primarySource.citation?.trim());

  const hasEvidence = Boolean(record.evidence?.trim());
  const hasUnknown = Boolean(record.unknown?.trim());

  if (hasVerifiedSource && hasEvidence) return { ...record, classification: "FACT" };

  if (
    hasVerifiedSource &&
    /\b(statute|regulation|rule|ordinance|constitution|case)\b/i.test(record.claim)
  ) return { ...record, classification: "LAW" };

  if (!hasEvidence) return { ...record, classification: hasUnknown ? "UNKNOWN" : "CLAIM" };
  return { ...record, classification: hasUnknown ? "UNKNOWN" : "CLAIM" };
}
