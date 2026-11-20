"use client";

import { useId } from "react";
import { MONOGRAM_PATH } from "./monogram";

type Props = {
  /** "full" = HB monogram + HEIZ BAGS wordmark; "mark" = the monogram alone */
  variant?: "full" | "mark";
  /** "light" for surface/surface-alt backgrounds; "dark" for primary (black) backgrounds */
  tone?: "light" | "dark";
  className?: string;
  title?: string;
  decorative?: boolean;
};

// Monogram occupies 0 0 1259 934; the wordmark sits to its right in the full lock-up.
const MARK_W = 1259;
const MARK_H = 934;
const FULL_W = 4060;

/**
 * The Heiz Bags logo: the gold "HB" script monogram (traced from the client's logo) and a
 * letter-spaced wordmark. Gradient ids are prefixed per instance so two logos can share a page.
 */
export function Logo({ variant = "full", tone = "light", className, title = "Heiz Bags", decorative }: Props) {
  const raw = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const gid = `${raw}-gold`;
  const a11y = decorative ? { "aria-hidden": true as const } : { role: "img", "aria-label": title };
  // On light backgrounds the gold runs deeper so the monogram keeps its weight against ivory.
  const stops =
    tone === "dark"
      ? ["var(--logo-gold-light)", "var(--logo-gold)", "var(--logo-gold-deep)"]
      : ["var(--logo-gold)", "var(--logo-gold-deep)", "var(--hz-accent-text)"];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={variant === "full" ? `0 0 ${FULL_W} ${MARK_H}` : `0 0 ${MARK_W} ${MARK_H}`}
      className={className}
      focusable="false"
      {...a11y}
    >
      <defs>
        <linearGradient id={gid} gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={MARK_W} y2={MARK_H}>
          <stop offset="0" stopColor={stops[0]} />
          <stop offset=".55" stopColor={stops[1]} />
          <stop offset="1" stopColor={stops[2]} />
        </linearGradient>
      </defs>
      <path d={MONOGRAM_PATH} fill={`url(#${gid})`} fillRule="evenodd" />
      {variant === "full" && (
        <>
          <path d="M1450 250 V690" stroke="var(--logo-gold)" strokeWidth="10" opacity=".7" />
          <text
            x="1640"
            y="590"
            textLength={FULL_W - 1640 - 20}
            lengthAdjust="spacingAndGlyphs"
            fill={tone === "dark" ? "var(--hz-surface)" : "var(--logo-ink)"}
            style={{ fontFamily: "var(--font-sans)", fontSize: 300, fontWeight: 500, letterSpacing: "0.32em" }}
          >
            HEIZ BAGS
          </text>
        </>
      )}
    </svg>
  );
}
