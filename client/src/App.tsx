import React, { useMemo, useState } from "react";
import { evaluateIntegrity, type EvidenceLink, type IntegrityInput } from "../../engine";

type Scenario = "supported" | "contradiction" | "unknown";

const scenarios: Record<Scenario, IntegrityInput> = {
  supported: {
    question: "Does the record support the claim?",
    claim: { id: "claim-1", text: "The primary source supports this statement." },
    sources: [{ id: "source-1", title: "Primary source", locator: "page 12", designation: "PRIMARY" }],
    evidence: [{ id: "evidence-1", sourceId: "source-1", exactText: "The exact passage supporting the statement." }],
    evidenceLinks: [{ evidenceId: "evidence-1", relationship: "SUPPORTING" }],
  },
  contradiction: {
    question: "Do the records agree?",
    claim: { id: "claim-1", text: "The records support the same statement." },
    sources: [
      { id: "source-1", title: "Record A", designation: "PRIMARY" },
      { id: "source-2", title: "Record B", designation: "PRIMARY" },
    ],
    evidence: [
      { id: "evidence-1", sourceId: "source-1", exactText: "Record A says the event occurred." },
      { id: "evidence-2", sourceId: "source-2", exactText: "Record B says the event did not occur." },
    ],
    evidenceLinks: [
      { evidenceId: "evidence-1", relationship: "SUPPORTING" },
      { evidenceId: "evidence-2", relationship: "CONTRARY" },
    ],
  },
  unknown: {
    question: "Can this statement be established from the current record?",
    claim: { id: "claim-1", text: "The missing record establishes the statement." },
    sources: [],
    evidence: [],
    evidenceLinks: [],
  },
};

export default function App() {
  const [scenario, setScenario] = useState<Scenario>("supported");
  const [input, setInput] = useState<IntegrityInput>(scenarios.supported);
  const [view, setView] = useState<"playground" | "about">("playground");

  const finding = useMemo(() => evaluateIntegrity(input), [input]);

  function loadScenario(next: Scenario) {
    setScenario(next);
    setInput(scenarios[next]);
  }

  function setClaim(text: string) {
    setInput((current) => ({ ...current, claim: { ...current.claim, text } }));
  }

  function setQuestion(question: string) {
    setInput((current) => ({ ...current, question }));
  }

  function setEvidence(text: string) {
    const first = input.evidence[0];
    if (!first) return;
    setInput((current) => ({ ...current, evidence: [{ ...first, exactText: text }, ...current.evidence.slice(1)] }));
  }

  const sourceCount = input.sources.length;
  const evidenceCount = input.evidence.length;
  const supporting = finding.supportingEvidenceIds.length;
  const contrary = finding.contraryEvidenceIds.length;

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <div className="eyebrow">EVIDENCE INTEGRITY ENGINE</div>
          <div className="brand">ProofFlow Playground</div>
        </div>
        <div className="status-pill">RUNS LOCALLY • NO AI REQUIRED</div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <div className="eyebrow">ENGINE DEMO</div>
          <p className="muted">See the deterministic evidence rules operate on a live record.</p>
          <nav>
            <button className={view === "playground" ? "nav-item active" : "nav-item"} onClick={() => setView("playground")}>
              <strong>Playground</strong><span>Run the engine</span>
            </button>
            <button className={view === "about" ? "nav-item active" : "nav-item"} onClick={() => setView("about")}>
              <strong>What it proves</strong><span>Engine boundary</span>
            </button>
          </nav>
        </aside>
        <main className="content">
          {view === "playground" ? (
            <>
              <div className="page-header">
                <div className="eyebrow">LIVE ENGINE</div>
                <h1>Watch evidence become a finding.</h1>
                <p className="muted">Change the record below. The engine evaluates only the evidence relationships you provide.</p>
              </div>

              <section className="demo-toolbar">
                <div>
                  <div className="eyebrow">TRY A SCENARIO</div>
                  <div className="scenario-buttons">
                    <button onClick={() => loadScenario("supported")} className={scenario === "supported" ? "scenario active" : "scenario"}>Supported</button>
                    <button onClick={() => loadScenario("contradiction")} className={scenario === "contradiction" ? "scenario active" : "scenario"}>Contradiction</button>
                    <button onClick={() => loadScenario("unknown")} className={scenario === "unknown" ? "scenario active" : "scenario"}>Unknown</button>
                  </div>
                </div>
              </section>

              <div className="demo-grid">
                <section className="panel">
                  <div className="panel-title"><span>1</span><div><strong>Question & claim</strong><small>What are we evaluating?</small></div></div>
                  <label>Question<textarea value={input.question} onChange={(e) => setQuestion(e.target.value)} /></label>
                  <label>Claim<textarea value={input.claim.text} onChange={(e) => setClaim(e.target.value)} /></label>
                </section>

                <section className="panel">
                  <div className="panel-title"><span>2</span><div><strong>Source-backed evidence</strong><small>What material is actually preserved?</small></div></div>
                  {input.sources.length > 0 ? (
                    <div className="source-card"><strong>{input.sources[0].title}</strong><span>{input.sources[0].designation ?? "UNKNOWN"} source{input.sources[0].locator ? ` • ${input.sources[0].locator}` : ""}</span></div>
                  ) : <div className="empty">No source identified.</div>}
                  {input.evidence.length > 0 ? (
                    <label>Exact preserved text<textarea value={input.evidence[0].exactText} onChange={(e) => setEvidence(e.target.value)} /></label>
                  ) : <div className="empty">No evidence preserved.</div>}
                </section>
              </div>

              <section className="result-panel">
                <div className="result-heading"><div><div className="eyebrow">ENGINE OUTPUT</div><h2>{finding.classification}</h2></div><div className="result-metrics"><span>{sourceCount} source</span><span>{evidenceCount} evidence</span><span>{supporting} supporting</span><span>{contrary} contrary</span></div></div>
                <div className="result-body">
                  <div className="result-box"><strong>Why</strong>{finding.reasons.length ? finding.reasons.map((reason) => <p key={reason}>{reason}</p>) : <p>No positive evidence relationship established.</p>}</div>
                  <div className="result-box"><strong>Unknowns / missing evidence</strong>{finding.unknowns.concat(finding.missingEvidence).length ? finding.unknowns.concat(finding.missingEvidence).map((item) => <p key={item}>{item}</p>) : <p className="good">No structural unknowns detected.</p>}</div>
                </div>
                <div className="rule-note"><strong>Engine rule:</strong> a source by itself never becomes FACT. Supporting evidence must be explicitly linked; contrary evidence remains visible.</div>
              </section>
            </>
          ) : (
            <section>
              <div className="page-header"><div className="eyebrow">ENGINE BOUNDARY</div><h1>This is the part we built to stand underneath other systems.</h1><p className="muted">ProofFlow's repository describes the canonical chain as Question → Source → Evidence → Comparison → Finding → Unknowns → Verification. The playground now makes the engine's deterministic integrity step directly visible.</p></div>
              <div className="cards">
                <Card title="Provider independent" value="Yes" text="No model calls, retrieval service, AWS dependency, or vendor-specific logic is required." />
                <Card title="Contradictions" value="Visible" text="Supporting and contrary evidence produce CONTRADICTION instead of being silently reconciled." />
                <Card title="Uncertainty" value="Preserved" text="Missing or malformed record structure remains UNKNOWN rather than being promoted to certainty." />
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}

function Card({ title, value, text }: { title: string; value: string; text: string }) {
  return <article className="card"><div>{title}</div><strong>{value}</strong><p className="muted">{text}</p></article>;
}
