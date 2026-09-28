"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { FileArrowDownIcon, ListIcon, MoonIcon, SunIcon } from "@phosphor-icons/react/dist/ssr";
import { nav, profile } from "@/lib/data";
import { Monogram } from "./art";

type Theme = "light" | "dark";
const currentTheme = (): Theme =>
  (document.documentElement.dataset.theme as Theme | undefined) ?? (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

/** Theme switch with a circular View Transition reveal from the click point, falling back to an instant swap. */
function toggleTheme(e: MouseEvent) {
  const next: Theme = currentTheme() === "dark" ? "light" : "dark";
  const apply = () => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("pt-theme", next);
    } catch {}
  };
  if (!document.startViewTransition || matchMedia("(prefers-reduced-motion: reduce)").matches) return apply();
  const { clientX: x, clientY: y } = e;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  document.startViewTransition(apply).ready.then(() =>
    document.documentElement.animate(
      { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 600, easing: "cubic-bezier(.16,1,.3,1)", pseudoElement: "::view-transition-new(root)" },
    ),
  );
}

export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const top = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    top.observe(sentinel.current!);
    const spy = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), {
      rootMargin: "-45% 0px -50% 0px",
    });
    // "top" (the hero) is watched too, so no link stays highlighted after scrolling back up.
    ["top", ...nav.map((n) => n.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) spy.observe(el);
    });
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    return () => {
      top.disconnect();
      spy.disconnect();
      document.removeEventListener("keydown", esc);
    };
  }, []);

  return (
    <>
      <div id="sentinel" ref={sentinel} aria-hidden="true" />
      <header id="hdr" className={scrolled ? "scrolled" : undefined}>
        <nav className="shell nav" aria-label="Primary">
          <a className="brand" href="#top" aria-label={`${profile.name}, home`}>
            <Monogram />
            <span>{profile.name}</span>
          </a>
          <div className={`nav-links${open ? " open" : ""}`} id="navLinks">
            {nav.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className={active === id ? "active" : undefined} onClick={() => setOpen(false)}>
                {label}
              </a>
            ))}
          </div>
          <div className="nav-right">
            <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle color theme">
              <MoonIcon className="i-moon" />
              <SunIcon className="i-sun" />
            </button>
            <a className="btn btn-ghost btn-sm nav-resume" href={profile.resume} download aria-label="Download resume (PDF)">
              <FileArrowDownIcon />
              <span>Resume</span>
            </a>
            <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Open menu" aria-expanded={open} aria-controls="navLinks">
              <ListIcon />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
