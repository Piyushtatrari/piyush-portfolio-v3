"use client";

import { yearsSince } from "@/lib/data";
import { createElement, useEffect, useRef, type CSSProperties, type ElementType, type PointerEvent, type ReactNode } from "react";

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => matchMedia("(pointer: fine)").matches;

/** One IntersectionObserver shared by every <Reveal>; each element unobserves itself after its first reveal. */
const callbacks = new WeakMap<Element, () => void>();
let io: IntersectionObserver | null = null;
function observeOnce(el: Element, cb: () => void) {
  io ??= new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        callbacks.get(e.target)?.();
        callbacks.delete(e.target);
        io!.unobserve(e.target);
      }),
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
  );
  callbacks.set(el, cb);
  io.observe(el);
  return () => {
    callbacks.delete(el);
    io?.unobserve(el);
  };
}

type RevealProps = { as?: ElementType; className?: string; delay?: number; style?: CSSProperties; children?: ReactNode; [attr: string]: unknown };

/** Fades and lifts its content in the first time it scrolls into view. */
export function Reveal({ as = "div", className = "", delay = 0, style, children, ...rest }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => observeOnce(ref.current!, () => ref.current?.classList.add("in")), []);
  return createElement(as, { ref, className: `reveal ${className}`.trim(), style: { ...style, "--i": delay } as CSSProperties, ...rest }, children);
}

/** Counts from 0 to `to` with an ease-out once visible. With `since` (a timestamp), counts to the whole years since then, worked out in the browser. */
export function CountUp({ to: built, since }: { to: number; since?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const to = since ? yearsSince(since) : built;
    return observeOnce(el, () => {
      if (reducedMotion()) return void (el.textContent = String(to));
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 1400, 1);
        el.textContent = String(Math.round(to * (1 - Math.pow(1 - p, 4))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, [built, since]);
  return <span ref={ref}>0</span>;
}

/** Cursor-following radial highlight. Writes CSS vars directly, so no re-renders. */
export function spotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Revealing card with the cursor spotlight. */
export function Spot({ as = "article", className = "", ...rest }: RevealProps) {
  return <Reveal as={as} className={`spot ${className}`} onPointerMove={spotlight} {...rest} />;
}

/** Link that leans toward the cursor on desktop. */
export function Magnetic({ className = "", children, ...rest }: { className?: string; children: ReactNode; href: string; download?: boolean }) {
  const move = (e: PointerEvent<HTMLAnchorElement>) => {
    if (!finePointer() || reducedMotion()) return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.22}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`;
  };
  return (
    <a className={`magnet ${className}`} onPointerMove={move} onPointerLeave={(e) => (e.currentTarget.style.transform = "")} {...rest}>
      {children}
    </a>
  );
}
