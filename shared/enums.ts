export const RECORD_CLASSIFICATIONS = [
  "FACT",
  "LAW",
  "CLAIM",
  "QUESTION",
  "UNKNOWN",
] as const;

export type RecordClassification = (typeof RECORD_CLASSIFICATIONS)[number];

export const REVIEW_STATUSES = [
  "PENDING",
  "ACCEPTED",
  "EDITED",
  "REJECTED",
  "REOPENED",
] as const;

export type ReviewStatus = (typeof REVIEW_STATUSES)[number];
