// Decorative SVG art. Pure markup (no hooks), so it renders on the server or inside client components.
import type { CSSProperties } from "react";
import type { CaseKey, ThumbKey } from "@/lib/data";

/** Typed escape hatch for CSS custom properties in inline styles. */
export const vars = (v: Record<string, string | number>) => v as CSSProperties;

// Seeded PRNG so generated art is identical on the server and the client (no hydration mismatch).
function seeded(seed: number) {
  return () => (seed = (seed * 16807) % 2147483647) / 2147483647;
}

export function Monogram() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true">
      <rect width="64" height="64" rx="18" fill="var(--ink)" />
      <path d="M14 46V18h9a8 8 0 0 1 0 16h-9" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M36 18h14M43 18v28" stroke="var(--bg)" strokeWidth="6" strokeLinecap="round" />
    </svg>
  );
}

export function Avatar() {
  return (
    <svg viewBox="0 0 168 168" role="img" aria-label="Piyush Tatrari monogram">
      <rect width="168" height="168" rx="20" fill="var(--deep)" />
      <circle cx="130" cy="36" r="60" fill="var(--accent)" opacity=".16" />
      <text x="84" y="104" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="650" fontSize="64" letterSpacing="-4" fill="var(--deep-ink)">
        PT
      </text>
      <rect x="54" y="122" width="60" height="5" rx="2.5" fill="var(--accent)" />
    </svg>
  );
}

/* ---------------- work case visuals ---------------- */

const rnd = seeded(7);
const ragDots = Array.from({ length: 70 }, () => ({ cx: +(rnd() * 580 + 10).toFixed(1), cy: +(rnd() * 300 + 12).toFixed(1), r: +(rnd() * 2.5 + 2).toFixed(1) }));
const near = [
  [262, 126],
  [378, 120],
  [352, 214],
  [266, 202],
];

function RagViz() {
  return (
    <svg viewBox="0 0 600 340" preserveAspectRatio="xMidYMid slice">
      <g className="v-grid">
        {[85, 170, 255].map((y) => <line key={y} x1="0" y1={y} x2="600" y2={y} />)}
        {[150, 300, 450].map((x) => <line key={x} x1={x} y1="0" x2={x} y2="340" />)}
      </g>
      {ragDots.map((d, i) => <circle key={i} className="v-dot" {...d} />)}
      {near.map(([x, y]) => <line key={`l${x}`} className="v-link" x1="318" y1="158" x2={x} y2={y} />)}
      {near.map(([x, y]) => <circle key={`d${x}`} className="v-dot v-near" cx={x} cy={y} r="6" />)}
      <circle className="v-ring" cx="318" cy="158" r="30" />
      <circle className="v-q" cx="318" cy="158" r="9" />
      <rect x="334" y="140" width="104" height="24" rx="12" fill="var(--surface)" stroke="var(--line)" />
      <text className="v-lbl" x="346" y="156" style={{ fill: "var(--ink)" }}>your question</text>
      <text className="v-lbl" x="160" y="318">nearest records ground the answer</text>
    </svg>
  );
}

function DashViz() {
  const bars = [
    { x: 16, y: 70, h: 50, s: 1.25 },
    { x: 58, y: 50, h: 70, s: 1.1 },
    { x: 100, y: 30, h: 90, s: 1.2, hi: true },
    { x: 142, y: 60, h: 60, s: 1.35 },
  ];
  return (
    <svg viewBox="0 0 300 130">
      {bars.map((b) => <rect key={b.x} className={`v-bar${b.hi ? " hi" : ""}`} x={b.x} y={b.y} width="30" height={b.h} rx="6" style={vars({ "--s": b.s })} />)}
      <path className="v-line" d="M190 96 L214 78 L238 86 L262 52 L286 40" />
      <circle cx="286" cy="40" r="5" fill="var(--accent)" stroke="var(--ink)" strokeWidth="2" />
    </svg>
  );
}

function SseViz() {
  return (
    <svg viewBox="0 0 300 130">
      <rect className="v-bub-me" x="120" y="10" width="164" height="34" rx="17" />
      <rect className="v-txt-me" x="138" y="24" width="110" height="6" rx="3" />
      <rect className="v-bub" x="16" y="54" width="200" height="34" rx="17" />
      <rect className="v-txt" x="34" y="68" width="130" height="6" rx="3" />
      <rect className="v-bub" x="16" y="96" width="70" height="28" rx="14" />
      <g className="v-type">
        <circle cx="38" cy="110" r="3.5" />
        <circle cx="51" cy="110" r="3.5" />
        <circle cx="64" cy="110" r="3.5" />
      </g>
      <text className="v-lbl" x="104" y="115">streaming over SSE</text>
    </svg>
  );
}

function MdmViz() {
  return (
    <svg viewBox="0 0 420 170">
      <g className="v-m v-m1">
        <rect className="v-rec" x="10" y="14" width="130" height="56" rx="12" />
        <rect className="v-rec-t" x="26" y="32" width="80" height="6" rx="3" />
        <rect className="v-rec-t" x="26" y="46" width="52" height="6" rx="3" />
      </g>
      <g className="v-m v-m2">
        <rect className="v-rec" x="10" y="100" width="130" height="56" rx="12" />
        <rect className="v-rec-t" x="26" y="118" width="72" height="6" rx="3" />
        <rect className="v-rec-t" x="26" y="132" width="60" height="6" rx="3" />
      </g>
      <path className="v-mw" d="M150 42 C 200 42, 200 85, 250 85" />
      <path className="v-mw" d="M150 128 C 200 128, 200 85, 250 85" />
      <rect className="v-gold" x="250" y="52" width="160" height="66" rx="14" />
      <text className="v-gold-t" x="268" y="80" style={{ fontFamily: "var(--mono)", fontSize: 12 }}>golden record</text>
      <rect x="268" y="92" width="96" height="6" rx="3" fill="var(--on-accent)" opacity=".35" />
    </svg>
  );
}

export const caseViz: Record<CaseKey, () => React.JSX.Element> = { rag: RagViz, dash: DashViz, sse: SseViz, mdm: MdmViz };

/* ---------------- project thumbnails ---------------- */

function InvoiceThumb() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice">
      <rect className="t-paper" x="70" y="22" width="180" height="200" rx="10" />
      <line className="t-ln" x1="92" y1="52" x2="160" y2="52" />
      <line className="t-ln" x1="92" y1="80" x2="226" y2="80" style={{ strokeWidth: 4 }} />
      <line className="t-ln" x1="92" y1="100" x2="200" y2="100" style={{ strokeWidth: 4 }} />
      <line className="t-ln" x1="92" y1="120" x2="214" y2="120" style={{ strokeWidth: 4 }} />
      <line className="t-ln" x1="170" y1="156" x2="226" y2="156" style={{ stroke: "var(--ink)" }} />
      <g className="t-stamp">
        <rect x="150" y="30" width="92" height="36" rx="8" />
        <text className="t-stamp-t" x="166" y="54">PAID</text>
      </g>
    </svg>
  );
}

function LearnThumb() {
  return (
    <svg viewBox="0 0 320 160">
      <circle className="t-ring-bg" cx="100" cy="80" r="36" />
      <circle className="t-ring" cx="100" cy="80" r="36" />
      <path className="t-chk" d="M88 80l8 8 16-16" />
      <rect x="160" y="50" width="120" height="16" rx="8" fill="var(--surface)" stroke="var(--line-2)" />
      <rect x="160" y="74" width="100" height="16" rx="8" fill="var(--surface)" stroke="var(--line-2)" />
      <rect x="160" y="98" width="110" height="16" rx="8" fill="var(--accent)" stroke="var(--ink)" />
    </svg>
  );
}

function TreeThumb() {
  const edges = ["M160 34 L100 80", "M160 34 L220 80", "M100 80 L66 126", "M100 80 L134 126", "M220 80 L254 126", "M220 80 L186 126"];
  return (
    <svg viewBox="0 0 320 160">
      {edges.map((d) => <path key={d} className="t-edge" d={d} />)}
      <circle className="t-node" cx="160" cy="34" r="12" />
      <circle className="t-node" cx="100" cy="80" r="10" />
      <circle className="t-node" cx="220" cy="80" r="10" />
      {[66, 134, 186, 254].map((x, i) => <circle key={x} className={i % 2 ? "t-leaf-n" : "t-leaf"} cx={x} cy="126" r="9" />)}
    </svg>
  );
}

function SketchThumb() {
  return (
    <svg viewBox="0 0 320 160">
      <path className="t-squig" d="M40 110 C 70 30, 110 30, 120 80 S 170 140, 190 80 S 240 20, 280 60" />
      <circle className="t-tip" cx="280" cy="60" r="8" />
      <circle cx="280" cy="60" r="16" fill="none" stroke="var(--ink)" strokeWidth="1.5" opacity=".3" />
    </svg>
  );
}

function ChainThumb() {
  return (
    <svg viewBox="0 0 320 160">
      <line className="t-chain" x1="94" y1="92" x2="130" y2="84" />
      <line className="t-chain" x1="190" y1="84" x2="226" y2="76" />
      <rect className="t-blk" x="34" y="66" width="60" height="52" rx="10" />
      <rect className="t-blk t-b2" x="130" y="58" width="60" height="52" rx="10" />
      <rect className="t-blk t-b3" x="226" y="50" width="60" height="52" rx="10" />
      <path className="t-eth" d="M256 62 l10 16 -10 6 -10 -6z M246 81 l10 6 10 -6 -10 14z" />
    </svg>
  );
}

// Bars start shuffled; on hover each slides to its sorted slot (value - 1).
const sortValues = [5, 2, 7, 3, 8, 1, 6, 4];
function SortThumb() {
  return (
    <svg viewBox="0 0 320 160">
      {sortValues.map((v, i) => (
        <rect key={v} className="t-sbar" x="42" y={140 - v * 13} width="20" height={v * 13} rx="5" style={vars({ "--x": `${i * 30}px`, "--sx": `${(v - 1) * 30}px` })} />
      ))}
    </svg>
  );
}

export const thumbs: Record<ThumbKey, () => React.JSX.Element> = {
  invoice: InvoiceThumb,
  learn: LearnThumb,
  tree: TreeThumb,
  sketch: SketchThumb,
  chain: ChainThumb,
  sort: SortThumb,
};

const grnd = seeded(11);
const ghCells = Array.from({ length: 20 * 7 }, (_, i) => {
  const p = grnd();
  return { x: Math.floor(i / 7) * 14.4, y: (i % 7) * 15.8, lvl: p > 0.86 ? " l3" : p > 0.7 ? " l2" : p > 0.5 ? " l1" : "" };
});

/** Contribution-graph style grid. Decorative, not real activity data. */
export function GhGrid() {
  return (
    <svg viewBox="0 0 286 110" aria-hidden="true">
      {ghCells.map((c, i) => <rect key={i} className={`gh-cell${c.lvl}`} x={c.x} y={c.y} width="11" height="12" rx="3" />)}
    </svg>
  );
}
