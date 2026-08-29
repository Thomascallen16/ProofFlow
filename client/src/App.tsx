import React, { useMemo, useState } from "react";
import { classifyCivicRecord, type CivicRecord } from "../../../shared/validation";

type View = "overview" | "proof-flow" | "evidence" | "review";
const nav: Array<{ id: View; label: string; description: string }> = [
  { id: "overview", label: "Workspace", description: "Record overview" },
  { id: "proof-flow", label: "ProofFlow", description: "Evidence pipeline" },
  { id: "evidence", label: "Evidence Matrix", description: "Source-linked records" },
  { id: "review", label: "Review Queue", description: "Human verification" },
];
const sample: CivicRecord = { id: "demo-1", claim: "A verified primary source supports this statement.", evidence: "Exact source passage retained for review.", primarySource: { citation: "Demo source", exactSnippet: "Exact source passage retained for review.", verified: true } };

export default function App() {
  const [view, setView] = useState<View>("overview");
  const classification = useMemo(() => classifyCivicRecord(sample), []);
  return <div className="app-shell"><header className="topbar"><div><div className="eyebrow">THE ACCOUNTABILITY ECOSYSTEM</div><div className="brand">ProofFlow</div></div><div className="status-pill">RECONSTRUCTION • NOT RECOVERED</div></header><div className="layout"><aside className="sidebar"><div className="eyebrow">RECORD WORKSPACE</div><p className="muted">Evidence and verification environment</p><nav>{nav.map((item) => <button className={view === item.id ? "nav-item active" : "nav-item"} onClick={() => setView(item.id)} key={item.id}><strong>{item.label}</strong><span>{item.description}</span></button>)}</nav></aside><main className="content">{view === "overview" && <Overview classification={classification.classification} />}{view === "proof-flow" && <ProofFlow />}{view === "evidence" && <Evidence classification={classification.classification} />}{view === "review" && <Review />}</main></div></div>;
}
function Header({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) { return <div className="page-header"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="muted">{description}</p></div>; }
function Overview({ classification }: { classification: string | undefined }) { return <section><Header eyebrow="Workspace" title="Record Workspace" description="A source-first environment for organizing evidence, provenance, findings, and unknowns." /><div className="cards"><Card title="ProofFlow" value="Ready" text="Question → Source → Evidence → Comparison → Finding → Unknowns → Verification" /><Card title="Classification" value={classification ?? "UNKNOWN"} text="A source alone does not manufacture certainty." /><Card title="Review" value="Required" text="Automated candidates remain reviewable before acceptance." /></div></section>; }
function ProofFlow() { return <section><Header eyebrow="ProofFlow" title="Evidence Processing" description="Parse, validate, classify, and preserve provenance." /><div className="pipeline">{["Question", "Source", "Evidence", "Comparison", "Finding", "Unknowns", "Verification"].map((x, i) => <React.Fragment key={x}><span>{x}</span>{i < 6 && <b>→</b>}</React.Fragment>)}</div></section>; }
function Evidence({ classification }: { classification: string | undefined }) { return <section><Header eyebrow="Evidence Matrix" title="Source-linked record" description="Every finding should remain traceable to the material supporting it." /><article className="record"><div className="record-top"><span className="label">{classification}</span><span className="muted">demo-1</span></div><h2>Verified source-backed statement</h2><p>Exact source passage retained for review.</p><div className="source">Primary source · citation retained · exact snippet retained</div></article></section>; }
function Review() { return <section><Header eyebrow="Review Queue" title="Human verification" description="Extraction candidates do not silently become evidence." /><div className="notice"><strong>Nothing is accepted automatically.</strong><p className="muted">Candidates should retain their source location, confidence, original passage, and review history.</p></div></section>; }
function Card({ title, value, text }: { title: string; value: string; text: string }) { return <article className="card"><div>{title}</div><strong>{value}</strong><p className="muted">{text}</p></article>; }
