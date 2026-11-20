"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Phase = "idle" | "running" | "finishing";

/**
 * A thin accent thread across the top of the page while moving between pages.
 * Starts on an internal link click, creeps forward, fills and fades when the URL changes.
 */
export function RouteProgress() {
  const pathname = usePathname();
  const search = useSearchParams().toString();
  const routeKey = `${pathname}?${search}`;
  const [phase, setPhase] = useState<Phase>("idle");
  const [progress, setProgress] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
  };

  // Start on clicks to internal links that will change the URL.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || /^(mailto|tel):/.test(href)) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;

      stopTimer();
      setPhase("running");
      setProgress(0.15);
      timer.current = setInterval(() => setProgress((p) => (p < 0.88 ? p + (0.92 - p) * 0.1 : p)), 200);
    }
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      stopTimer();
    };
  }, []);

  // Finish when the route changes.
  const [lastKey, setLastKey] = useState(routeKey);
  if (routeKey !== lastKey) {
    setLastKey(routeKey);
    if (phase === "running") {
      setPhase("finishing");
      setProgress(1);
    }
  }

  useEffect(() => {
    if (phase !== "finishing") return;
    stopTimer();
    const t = setTimeout(() => {
      setPhase("idle");
      setProgress(0);
    }, 700);
    return () => clearTimeout(t);
  }, [phase]);

  // Safety net: never leave the thread hanging (for example, a click that did not navigate).
  useEffect(() => {
    if (phase !== "running") return;
    const t = setTimeout(() => {
      setPhase("finishing");
      setProgress(1);
    }, 12000);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[90] h-[2px]">
      <div
        className="hz-progress h-full"
        style={{
          transform: `scaleX(${progress})`,
          opacity: phase === "running" ? 1 : 0,
          transition: phase === "idle" ? "none" : undefined,
        }}
      />
    </div>
  );
}
