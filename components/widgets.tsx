"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircleIcon, CopyIcon } from "@phosphor-icons/react/dist/ssr";

/** Copies the address to the clipboard; if the Clipboard API is blocked, the toast shows the address instead. */
export function CopyEmail({ email }: { email: string }) {
  const [toast, setToast] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setToast("Email copied");
    } catch {
      setToast(email);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 2200);
  };

  return (
    <>
      <button className="copy" onClick={copy}>
        <CopyIcon />
        Copy email
      </button>
      <div className={`toast${toast ? " show" : ""}`} role="status" aria-live="polite">
        <CheckCircleIcon />
        <span>{toast ?? ""}</span>
      </div>
    </>
  );
}

/** Live public-repo count from the GitHub API, keeping the static fallback if the request fails or is rate limited. */
export function RepoCount({ user, fallback }: { user: string; fallback: string }) {
  const [count, setCount] = useState(fallback);
  useEffect(() => {
    const ctrl = new AbortController();
    fetch(`https://api.github.com/users/${user}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d: { public_repos?: number }) => d.public_repos && setCount(String(d.public_repos)))
      .catch(() => {});
    return () => ctrl.abort();
  }, [user]);
  return <>{count}</>;
}
