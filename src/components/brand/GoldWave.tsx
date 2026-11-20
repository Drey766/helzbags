"use client";

import { useId } from "react";
import { useReveal } from "@/components/ui/useReveal";

type Props = {
  /** "primary": full shine on primary; "light": thin and low-opacity on surface/surface-alt */
  tone?: "primary" | "light";
  className?: string;
  /** Flip vertically, for the top edge of a section */
  flip?: boolean;
  height?: number;
};

/** The accent ribbon from the logo artwork, drawn in when it enters the viewport. */
export function GoldWave({ tone = "light", className = "", flip, height }: Props) {
  const { ref, visible } = useReveal<SVGSVGElement>({ threshold: 0.3 });
  const gid = `wave-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const light = tone === "light";
  return (
    <svg
      ref={ref}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
      className={`wave-draw block w-full ${visible ? "is-drawn" : ""} ${className}`}
      style={{
        height: height ?? (light ? 56 : 88),
        transform: flip ? "scaleY(-1)" : undefined,
        opacity: light ? 0.55 : 1,
      }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="var(--wave-deep)" />
          <stop offset=".3" stopColor="var(--wave-gold)" />
          <stop offset=".5" stopColor="var(--wave-light)" />
          <stop offset=".72" stopColor="var(--wave-gold)" />
          <stop offset="1" stopColor="var(--wave-deep)" />
        </linearGradient>
      </defs>
      <path
        className="wave-band"
        d={
          light
            ? "M0,66 C180,22 360,26 560,60 C760,94 960,102 1200,48 L1200,53 C960,108 760,100 560,66 C360,32 180,30 0,71 Z"
            : "M0,64 C180,18 360,22 560,58 C760,94 960,104 1200,46 L1200,58 C960,118 760,106 560,72 C360,38 180,36 0,78 Z"
        }
        fill={`url(#${gid})`}
      />
      <path
        className="wave-line"
        d="M0,52 C200,10 380,14 580,48 C780,82 980,90 1200,34"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth={light ? 1.2 : 2}
        opacity=".75"
        vectorEffect="non-scaling-stroke"
      />
      <path
        className="wave-line"
        d="M0,90 C220,56 400,58 600,84 C800,110 1000,112 1200,70"
        fill="none"
        stroke={`url(#${gid})`}
        strokeWidth={light ? 0.8 : 1.2}
        opacity=".5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
