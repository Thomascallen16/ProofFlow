import { describe, expect, it } from "vitest";
import { assessVerification } from "./verification";

const evidence = [{ id: "e1", sourceId: "s1", exactText: "Preserved text" }];

describe("assessVerification", () => {
  it("keeps evidence UNVERIFIED when no verification record exists", () => {
    const result = assessVerification("e1", evidence, []);
    expect(result.state).toBe("UNVERIFIED");
  });

  it("requires complete metadata before accepting VERIFIED", () => {
    const result = assessVerification("e1", evidence, [
      { id: "v1", targetId: "e1", status: "VERIFIED", verifiedAt: "2026-09-04T18:00:00Z" },
    ]);
    expect(result.state).toBe("NEEDS_REVIEW");
  });

  it("preserves an explicit VERIFIED state without inventing verification", () => {
    const result = assessVerification("e1", evidence, [
      {
        id: "v1",
        targetId: "e1",
        status: "VERIFIED",
        verifier: "human:reviewer-1",
        method: "primary-record-comparison",
        verifiedAt: "2026-09-04T18:00:00Z",
        reason: "Compared against the preserved primary record.",
      },
    ]);
    expect(result.state).toBe("VERIFIED");
    expect(result.applicableRecordIds).toEqual(["v1"]);
  });

  it("does not verify a target that is absent from the supplied record", () => {
    const result = assessVerification("missing", evidence, [
      {
        id: "v1",
        targetId: "missing",
        status: "VERIFIED",
        verifier: "human:reviewer-1",
        method: "comparison",
        verifiedAt: "2026-09-04T18:00:00Z",
      },
    ]);
    expect(result.state).toBe("NEEDS_REVIEW");
  });

  it("uses the latest explicit verification record", () => {
    const result = assessVerification("e1", evidence, [
      { id: "v1", targetId: "e1", status: "REJECTED", verifiedAt: "2026-09-03T18:00:00Z" },
      { id: "v2", targetId: "e1", status: "UNVERIFIED", verifiedAt: "2026-09-04T18:00:00Z" },
    ]);
    expect(result.state).toBe("UNVERIFIED");
    expect(result.applicableRecordIds).toEqual(["v1", "v2"]);
  });
});
