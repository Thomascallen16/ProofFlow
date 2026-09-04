import { describe, expect, it } from "vitest";
import { evaluateIntegrity } from "./integrity";

const base = {
  question: "Did the record support the claim?",
  claim: { id: "c1", text: "The record supports the claim." },
  sources: [{ id: "s1", title: "Primary record", designation: "PRIMARY" as const }],
  evidence: [{ id: "e1", sourceId: "s1", exactText: "Exact preserved source text." }],
};

describe("evaluateIntegrity", () => {
  it("never promotes a claim when only a source exists", () => {
    const result = evaluateIntegrity({
      ...base,
      evidence: [],
    });

    expect(result.classification).not.toBe("FACT");
    expect(result.missingEvidence.length).toBeGreaterThan(0);
  });

  it("requires a supporting relationship before classifying FACT", () => {
    const result = evaluateIntegrity(base);

    expect(result.classification).toBe("CLAIM");
    expect(result.supportsClaim).toBe(false);
  });

  it("classifies source-backed supporting evidence as FACT", () => {
    const result = evaluateIntegrity({
      ...base,
      evidenceLinks: [{ evidenceId: "e1", relationship: "SUPPORTING" }],
    });

    expect(result.classification).toBe("FACT");
    expect(result.supportsClaim).toBe(true);
    expect(result.supportingEvidenceIds).toEqual(["e1"]);
  });

  it("keeps contrary evidence visible instead of hiding it", () => {
    const result = evaluateIntegrity({
      ...base,
      evidence: [
        ...base.evidence,
        { id: "e2", sourceId: "s1", exactText: "Contrary preserved source text." },
      ],
      evidenceLinks: [
        { evidenceId: "e1", relationship: "SUPPORTING" },
        { evidenceId: "e2", relationship: "CONTRARY" },
      ],
    });

    expect(result.classification).toBe("CONTRADICTION");
    expect(result.supportingEvidenceIds).toEqual(["e1"]);
    expect(result.contraryEvidenceIds).toEqual(["e2"]);
  });

  it("returns UNKNOWN when the question or claim is missing", () => {
    const result = evaluateIntegrity({
      ...base,
      question: "",
      evidenceLinks: [{ evidenceId: "e1", relationship: "SUPPORTING" }],
    });

    expect(result.classification).toBe("UNKNOWN");
    expect(result.unknowns.length).toBeGreaterThan(0);
  });

  it("does not accept evidence that points to an unknown source", () => {
    const result = evaluateIntegrity({
      ...base,
      evidence: [{ id: "e9", sourceId: "missing-source", exactText: "Unanchored text" }],
      evidenceLinks: [{ evidenceId: "e9", relationship: "SUPPORTING" }],
    });

    expect(result.classification).not.toBe("FACT");
  });
});
