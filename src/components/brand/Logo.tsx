"use client";

import { useId } from "react";

type Props = {
  /** "full" = bag + ZURI + bags; "mark" = the bag alone */
  variant?: "full" | "mark";
  /** "light" for ivory/champagne backgrounds; "dark" for plum backgrounds */
  tone?: "light" | "dark";
  className?: string;
  title?: string;
  decorative?: boolean;
};

/**
 * The Zuri Bags logo, inlined from assets/zuri-logo.svg and zuri-mark.svg.
 * Gradient ids are prefixed per instance so two logos can share a page.
 */
export function Logo({ variant = "full", tone = "light", className, title = "Zuri Bags", decorative }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const id = (n: string) => `${raw}-${n}`;
  const style =
    tone === "dark"
      ? ({ "--logo-purple": "var(--zb-ivory)" } as React.CSSProperties)
      : undefined;

  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": title };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={variant === "full" ? "90 84 436 312" : "84 82 284 312"}
      className={className}
      style={style}
      focusable="false"
      {...a11y}
    >
      <defs>
        <linearGradient id={id("panel")} gradientUnits="userSpaceOnUse" x1="186" y1="166" x2="300" y2="300">
          <stop offset="0" stopColor="var(--logo-purple)" />
          <stop offset=".5" stopColor="var(--logo-gold)" />
          <stop offset="1" stopColor="var(--logo-gold)" />
        </linearGradient>
        {variant === "full" && (
          <>
            <linearGradient id={id("word")} gradientUnits="userSpaceOnUse" x1="306" y1="0" x2="514" y2="0">
              <stop offset="0" stopColor="var(--logo-gold)" />
              <stop offset=".42" stopColor="var(--logo-gold)" />
              <stop offset=".8" stopColor="var(--logo-purple)" />
              <stop offset="1" stopColor="var(--logo-purple)" />
            </linearGradient>
            <linearGradient id={id("script")} gradientUnits="userSpaceOnUse" x1="352" y1="0" x2="464" y2="0">
              <stop offset="0" stopColor="var(--logo-gold)" />
              <stop offset=".55" stopColor="var(--logo-gold-deep)" />
              <stop offset="1" stopColor="var(--logo-purple)" />
            </linearGradient>
          </>
        )}
      </defs>
      <g>
        <path d="M150,164 C150,124 176,98 218,95" fill="none" stroke="var(--logo-gold-light)" strokeWidth="11" />
        <path d="M213,168 V142 A49,49 0 0 1 311,142 V168" fill="none" stroke="var(--logo-purple)" strokeWidth="12" />
        <path d="M130,166 H147 L131,360 L157,385 H98 Z" fill="var(--logo-purple)" />
        <path d="M161,171 L182,166 L178,385 H142 Z" fill="var(--logo-gold-light)" />
        <path
          d="M186,166 H352 L349,226 C345,252 304,262 282,284 C259,308 248,340 246,385 H181 Z"
          fill={`url(#${id("panel")})`}
        />
      </g>
      {variant === "full" && (
        <>
          <g fill={`url(#${id("word")})`} stroke={`url(#${id("word")})`}>
            <path d="M308,258 H364 V271 L326,318 H364 V331 H306 V318 L344,271 H308 Z" stroke="none" />
            <path d="M375,258 V309 A18,18 0 0 0 411,309 V258" fill="none" strokeWidth="14" />
            <path d="M437,258 V331 M430,265 H462 A17,17 0 0 1 462,299 H437 M455,299 L484,331" fill="none" strokeWidth="14" />
            <rect x="500" y="258" width="14" height="73" stroke="none" />
          </g>
          <g
            fill="none"
            stroke={`url(#${id("script")})`}
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M360,337 V372" />
            <circle cx="371" cy="362" r="10" />
            <circle cx="396" cy="362" r="10" />
            <path d="M406,352 V372" />
            <circle cx="423" cy="362" r="10" />
            <path d="M433,352 V378 Q433,389 422,389 H360" />
            <path d="M461,354 C458,350 447,350 447,356 C447,362 461,361 461,367 C461,374 450,374 446,370" />
          </g>
        </>
      )}
    </svg>
  );
}
