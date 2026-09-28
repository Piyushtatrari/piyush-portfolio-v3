"use client";

import { useEffect, useRef } from "react";
import { vars } from "./art";

/** Animated system diagram: sources flow through a FastAPI + RAG service into a React UI. Tilts toward the cursor. */
export function HeroArt() {
  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const art = svg.current!;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return art.pauseAnimations(); // freezes SMIL packets
    if (!matchMedia("(pointer: fine)").matches) return;
    const hero = art.closest<HTMLElement>(".hero")!;
    const move = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      art.style.setProperty("--ry", `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
      art.style.setProperty("--rx", `${-((e.clientY - r.top) / r.height - 0.5) * 8}deg`);
    };
    const reset = () => {
      art.style.setProperty("--rx", "0deg");
      art.style.setProperty("--ry", "0deg");
    };
    hero.addEventListener("pointermove", move);
    hero.addEventListener("pointerleave", reset);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("pointerleave", reset);
    };
  }, []);

  const wires = ["p1", "p2", "p3", "p4"];
  const packets = [
    { path: "p1", dur: "2.4s", begin: "0s" },
    { path: "p2", dur: "1.8s", begin: ".6s" },
    { path: "p3", dur: "2.6s", begin: "1.1s" },
    { path: "p4", dur: "1.2s", begin: ".3s" },
  ];
  const embeddings = [
    [252, 274, 4, 1], [266, 262, 3, 0], [280, 284, 4.5, 1], [294, 266, 3, 0], [308, 278, 4, 1],
    [270, 292, 3, 0], [298, 294, 3, 0], [318, 262, 2.5, 0], [244, 290, 2.5, 0],
  ];
  const bars = [
    { x: 414, y: 316, h: 28 }, { x: 438, y: 300, h: 44 }, { x: 462, y: 324, h: 20 }, { x: 486, y: 292, h: 52, hi: true }, { x: 510, y: 308, h: 36 },
  ];

  return (
    <svg ref={svg} className="art" viewBox="0 0 560 500" role="img" aria-labelledby="artTitle">
      <title id="artTitle">
        Diagram: data from SQL, REST APIs and files flows through a FastAPI and RAG service into a React dashboard that answers questions in plain English.
      </title>
      <defs>
        <linearGradient id="gArea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c6f43a" stopOpacity=".35" />
          <stop offset="1" stopColor="#c6f43a" stopOpacity="0" />
        </linearGradient>
        <path id="p1" d="M136 96 C 186 96, 170 232, 214 238" />
        <path id="p2" d="M136 250 L 214 250" />
        <path id="p3" d="M136 404 C 186 404, 170 268, 214 262" />
        <path id="p4" d="M346 250 C 372 250, 370 250, 396 250" />
      </defs>

      {wires.map((id) => <use key={`w${id}`} href={`#${id}`} className="wire" />)}
      {wires.map((id) => <use key={`f${id}`} href={`#${id}`} className="flow" />)}
      {packets.map((p) => (
        <circle key={p.path} r="4" className="pkt">
          <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite">
            <mpath href={`#${p.path}`} />
          </animateMotion>
        </circle>
      ))}

      {/* sources */}
      <g className="float" style={{ animationDelay: "-1s" }}>
        <rect className="node" x="16" y="72" width="120" height="48" rx="14" />
        <circle cx="40" cy="96" r="9" fill="none" stroke="var(--accent-ink)" strokeWidth="2" />
        <path d="M31 96h18M40 87v18" stroke="var(--accent-ink)" strokeWidth="1.4" />
        <text className="lbl" x="58" y="100">SQL</text>
      </g>
      <g className="float" style={{ animationDelay: "-3s" }}>
        <rect className="node" x="16" y="226" width="120" height="48" rx="14" />
        <path d="M32 244l-6 6 6 6M48 244l6 6-6 6M43 241l-6 18" fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text className="lbl" x="62" y="254">REST</text>
      </g>
      <g className="float" style={{ animationDelay: "-2s" }}>
        <rect className="node" x="16" y="380" width="120" height="48" rx="14" />
        <path d="M32 393h11l6 6v14H32z" fill="none" stroke="var(--accent-ink)" strokeWidth="2" strokeLinejoin="round" />
        <text className="lbl" x="58" y="408">CSV</text>
      </g>

      {/* core service */}
      <circle className="ring" cx="280" cy="250" r="70" />
      <circle className="ring" cx="280" cy="250" r="70" style={{ animationDelay: "1.5s" }} />
      <rect className="node node-hi" x="214" y="184" width="132" height="132" rx="30" />
      <text className="lbl-b" x="280" y="226" textAnchor="middle">FastAPI</text>
      <text className="lbl-s" x="280" y="243" textAnchor="middle">RAG + embeddings</text>
      {embeddings.map(([cx, cy, r, hi]) => <circle key={`${cx}-${cy}`} className={hi ? "emb" : "emb-dim"} cx={cx} cy={cy} r={r} />)}
      <path d="M252 274 L280 284 L308 278" fill="none" stroke="var(--accent-ink)" strokeWidth="1.2" className="draw-in" style={{ animationDelay: "1.4s" }} />

      {/* UI panel */}
      <g className="float" style={{ animationDelay: "-4s" }}>
        <rect className="node" x="396" y="140" width="150" height="222" rx="18" />
        {[414, 426, 438].map((cx) => <circle key={cx} cx={cx} cy="160" r="3.5" fill="var(--line-2)" />)}
        <text className="lbl-s" x="412" y="190">React UI</text>
        <path className="area" d="M412 262 L432 244 L452 250 L472 226 L492 232 L514 206 L530 212 L530 272 L412 272 Z" />
        <path className="chart" d="M412 262 L432 244 L452 250 L472 226 L492 232 L514 206 L530 212" />
        <line x1="412" y1="272" x2="530" y2="272" stroke="var(--line)" />
        {bars.map((b, i) => (
          <rect key={b.x} className="bar" x={b.x} y={b.y} width="16" height={b.h} rx="4" style={vars({ animationDelay: `${1.3 + i * 0.1}s`, ...(b.hi && { fill: "var(--accent)" }) })} />
        ))}
      </g>

      {/* question + answer chips */}
      <g className="float" style={{ animationDelay: "-5s" }}>
        <rect className="chip" x="318" y="62" width="222" height="40" rx="20" />
        <circle cx="340" cy="82" r="8" fill="var(--accent)" />
        <path d="M336 82l3 3 5-6" fill="none" stroke="var(--on-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text className="chip-t" x="356" y="86">&quot;Which payers grew in Q3?&quot;</text>
        <path d="M470 102 L470 138" stroke="var(--line-2)" strokeWidth="1.5" strokeDasharray="3 4" />
      </g>
      <g className="float" style={{ animationDelay: "-2.5s" }}>
        <rect x="360" y="394" width="186" height="40" rx="20" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.4" />
        <text className="lbl" x="382" y="419" style={{ fill: "var(--ink)" }}>Answer + sources</text>
        <circle cx="526" cy="414" r="5" fill="var(--accent)" />
      </g>
    </svg>
  );
}
