"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { waUrl } from "@/lib/whatsapp";
import { brand } from "@/config/brand";

type Props = {
  message?: string;
  label?: string;
  variant?: "primary" | "gold" | "outline" | "outline-light";
  size?: "md" | "sm";
  className?: string;
  /** Show "Finish your order in WhatsApp…" after the click */
  orderHint?: boolean;
  fullWidth?: boolean;
  onOpen?: () => void;
};

export function WhatsAppButton({
  message,
  label = "Order on WhatsApp",
  variant = "primary",
  size = "md",
  className = "",
  orderHint = false,
  fullWidth,
  onOpen,
}: Props) {
  const [opened, setOpened] = useState(false);
  const cls = {
    primary: "btn-primary",
    gold: "btn-gold",
    outline: "btn-outline",
    "outline-light": "btn-outline-light",
  }[variant];

  return (
    <div className={`${fullWidth ? "w-full" : "inline-flex flex-col"} ${className}`}>
      <a
        href={waUrl(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`btn ${cls} ${size === "sm" ? "btn-sm" : ""} ${fullWidth ? "w-full" : ""}`}
        onClick={() => {
          setOpened(true);
          onOpen?.();
        }}
      >
        <MessageCircle aria-hidden="true" className="h-[18px] w-[18px]" strokeWidth={1.5} />
        {label}
        <span className="sr-only">(opens WhatsApp)</span>
      </a>
      {orderHint && (
        <p
          aria-live="polite"
          className={`mt-2 text-sm ${variant === "gold" || variant === "outline-light" ? "text-lilac-text" : "text-muted"} ${opened ? "" : "sr-only"}`}
        >
          {opened ? `Finish your order in WhatsApp. ${brand.name} will reply to confirm.` : ""}
        </p>
      )}
    </div>
  );
}
