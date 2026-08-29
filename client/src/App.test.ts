import { describe, expect, it } from "vitest";
import { classifyCivicRecord } from "../../shared/validation";

describe("accountability classification", () => {
  it("requires both a verified source and evidence for FACT", () => {
    const result = classifyCivicRecord({ id: "1", claim: "A supported statement", primarySource: { citation: "source", exactSnippet: "passage", verified: true } });
    expect(result.classification).toBe("CLAIM");
  });
  it("accepts FACT only when source and evidence are present", () => {
    const result = classifyCivicRecord({ id: "2", claim: "A supported statement", evidence: "passage", primarySource: { citation: "source", exactSnippet: "passage", verified: true } });
    expect(result.classification).toBe("FACT");
  });
  it("preserves uncertainty when evidence is missing", () => {
    const result = classifyCivicRecord({ id: "3", claim: "Unresolved", unknown: "Source not found" });
    expect(result.classification).toBe("UNKNOWN");
  });
});
