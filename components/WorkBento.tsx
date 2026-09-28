"use client";

import { useRef, useState } from "react";
import { ArrowRightIcon, LockSimpleIcon, XIcon } from "@phosphor-icons/react/dist/ssr";
import { cases, type CaseStudy } from "@/lib/data";
import { caseViz } from "./art";
import { Spot } from "./motion";

const cellClass = { rag: "c-rag", dash: "c-dash", sse: "c-sse", mdm: "c-mdm" } as const;

function Tags({ items }: { items: string[] }) {
  return (
    <div className="tags">
      {items.map((t) => <span key={t} className="tag">{t}</span>)}
    </div>
  );
}

export function WorkBento() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const open = (c: CaseStudy) => {
    setSelected(c);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className="bento">
        {cases.map((c, i) => {
          const Viz = caseViz[c.key];
          const showTags = c.key === "rag" || c.key === "mdm";
          const body = (
            <>
              <h3>{c.cardTitle}</h3>
              <p>{c.summary}</p>
              {showTags && <Tags items={c.stack.slice(0, 5)} />}
              <span className="open">
                Read case study <ArrowRightIcon />
              </span>
            </>
          );
          return (
            <Spot key={c.key} as="button" className={`case ${cellClass[c.key]}`} delay={c.key === "mdm" ? 0 : i} aria-haspopup="dialog" onClick={() => open(c)}>
              {c.key === "mdm" ? (
                <>
                  <div className="txt">{body}</div>
                  <div className="viz" aria-hidden="true"><Viz /></div>
                </>
              ) : (
                <>
                  <div className="viz" aria-hidden="true"><Viz /></div>
                  {body}
                </>
              )}
            </Spot>
          );
        })}
      </div>

      <dialog ref={dialog} aria-labelledby="dlgTitle" onClick={(e) => e.target === dialog.current && dialog.current.close()}>
        {selected && (
          <>
            <div className="dlg-head">
              <div>
                <small>{selected.meta}</small>
                <h3 id="dlgTitle">{selected.title}</h3>
              </div>
              <button className="icon-btn" onClick={() => dialog.current?.close()} aria-label="Close case study">
                <XIcon />
              </button>
            </div>
            <div className="dlg-body">
              <div>
                <h4>The problem</h4>
                <p>{selected.problem}</p>
              </div>
              <div>
                <h4>What I built</h4>
                <ul>{selected.built.map((b) => <li key={b}>{b}</li>)}</ul>
              </div>
              <div>
                <h4>Outcome</h4>
                <p>{selected.outcome}</p>
              </div>
              <div>
                <h4>Stack</h4>
                <div className="tags" style={{ marginTop: 0 }}>
                  {selected.stack.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
              </div>
              <p className="dlg-note">
                <LockSimpleIcon />
                Company code is private. Happy to walk through the details in an interview.
              </p>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}
