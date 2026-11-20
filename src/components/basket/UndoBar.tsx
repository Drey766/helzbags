"use client";

import { useStore } from "@/store/StoreProvider";
import { getProducts } from "@/lib/products";

/** "Removed X. Undo" — shown after a basket line is removed. */
export function UndoBar({ className = "" }: { className?: string }) {
  const { lastRemoved, undoRemove, announce } = useStore();
  const name = lastRemoved ? getProducts().find((p) => p.slug === lastRemoved.line.slug)?.name : undefined;

  if (!lastRemoved || !name) return null;
  return (
    <div className={`flex items-center justify-between gap-3 rounded-2xl bg-surface-soft px-4 py-2 text-sm text-ink ${className}`}>
      <span>
        Removed <span className="font-medium">{name}</span>.
      </span>
      <button
        type="button"
        onClick={() => {
          undoRemove();
          announce(`${name} put back in your basket`);
        }}
        className="min-h-11 rounded-full px-3 font-medium text-primary underline underline-offset-4"
      >
        Undo
      </button>
    </div>
  );
}
