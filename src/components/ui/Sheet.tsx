"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** "bottom" on mobile becomes a right panel from md up when side="responsive" */
  side?: "bottom" | "right" | "responsive" | "full";
  tone?: "light" | "dark";
  children: React.ReactNode;
  footer?: React.ReactNode;
  hideTitle?: boolean;
  className?: string;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Accessible dialog sheet: traps focus, closes on Escape and backdrop, restores focus on close. */
export function Sheet({
  open,
  onClose,
  title,
  side = "responsive",
  tone = "light",
  children,
  footer,
  hideTitle,
  className = "",
}: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    returnTo.current = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>("[data-autofocus]") ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    (first ?? panel)?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const firstEl = items[0];
      const lastEl = items[items.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnTo.current?.focus?.();
    };
  }, [open]);

  if (!open || typeof document === "undefined") return null;

  const dark = tone === "dark";
  const position = {
    bottom: "inset-x-0 bottom-0 max-h-[88vh] rounded-t-[28px] anim-sheet-up",
    right: "inset-y-0 right-0 w-full max-w-md anim-sheet-right",
    responsive:
      "inset-x-0 bottom-0 max-h-[90vh] rounded-t-[28px] anim-sheet-up md:inset-x-auto md:inset-y-0 md:right-0 md:max-h-none md:w-full md:max-w-md md:rounded-none md:rounded-l-[28px] md:anim-sheet-right",
    full: "inset-0 anim-fade",
  }[side];

  return createPortal(
    <div className="fixed inset-0 z-[80]">
      <div
        className="anim-fade absolute inset-0 bg-primary-deep/55 backdrop-blur-[2px]"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        data-tone={dark ? "dark" : undefined}
        className={`absolute flex flex-col shadow-2xl outline-none ${position} ${
          dark ? "velvet text-surface" : "bg-surface text-ink"
        } ${className}`}
      >
        <div className={`flex items-center justify-between gap-4 px-5 pb-3 pt-4 ${hideTitle ? "" : "border-b"} ${dark ? "border-white/10" : "border-line"}`}>
          {side !== "full" && side !== "right" && (
            <span aria-hidden="true" className={`absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full md:hidden ${dark ? "bg-white/25" : "bg-line"}`} />
          )}
          <h2 className={`display text-2xl ${hideTitle ? "sr-only" : ""} ${dark ? "text-surface" : "text-primary"}`}>{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className={`ml-auto grid h-11 w-11 place-items-center rounded-full transition-colors ${
              dark ? "text-accent-light hover:bg-white/10" : "text-primary hover:bg-surface-alt"
            }`}
            aria-label={`Close ${title}`}
          >
            <X aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
        {footer && <div className={`border-t px-5 py-4 ${dark ? "border-white/10" : "border-line"}`}>{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
