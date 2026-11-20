import { showDraftFlags } from "@/config/brand";

/** Visible only when NEXT_PUBLIC_SHOW_DRAFT_FLAGS === "true". Marks copy written for review. */
export function DraftBadge({ label = "Draft", className = "" }: { label?: string; className?: string }) {
  if (!showDraftFlags) return null;
  return (
    <span
      className={`inline-flex items-center rounded-full border border-dashed border-danger bg-white px-2 py-0.5 align-middle text-[11px] font-medium uppercase tracking-[0.14em] text-danger ${className}`}
    >
      {label}
    </span>
  );
}
