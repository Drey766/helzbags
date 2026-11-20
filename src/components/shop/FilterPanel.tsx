"use client";

import { Check } from "lucide-react";
import { getVisibleCategories, occasions } from "@/lib/products";
import { carryLabels, sizeLabels } from "@/lib/format";
import { carryKeys, priceRanges, sizeKeys } from "@/lib/shopParams";
import type { ShopFilters } from "@/types";

type Props = { filters: ShopFilters; onChange: (f: ShopFilters) => void; idPrefix: string };

function toggle<T>(arr: T[] | undefined, v: T): T[] {
  const a = arr ?? [];
  return a.includes(v) ? a.filter((x) => x !== v) : [...a, v];
}

export function FilterPanel({ filters: f, onChange, idPrefix }: Props) {
  const cats = getVisibleCategories();
  const activeRange = priceRanges.find(
    (r) => ("min" in r ? r.min : undefined) === f.min && ("max" in r ? r.max : undefined) === f.max,
  )?.key;

  return (
    <div className="space-y-8">
      <Group title="Category" id={`${idPrefix}-cat`}>
        <div className="flex flex-wrap gap-2">
          <Pill selected={!f.category} onClick={() => onChange({ ...f, category: undefined })}>
            All
          </Pill>
          {cats.map((c) => (
            <Pill key={c.key} selected={f.category === c.key} onClick={() => onChange({ ...f, category: f.category === c.key ? undefined : c.key })}>
              {c.name}
            </Pill>
          ))}
        </div>
      </Group>

      <Group title="Occasion" id={`${idPrefix}-occ`}>
        <div className="flex flex-wrap gap-2">
          {occasions.map((o) => (
            <Pill key={o.key} selected={f.occasion === o.key} onClick={() => onChange({ ...f, occasion: f.occasion === o.key ? undefined : o.key })}>
              {o.name}
            </Pill>
          ))}
        </div>
      </Group>

      <Group title="How you carry it" id={`${idPrefix}-carry`}>
        <div className="flex flex-wrap gap-2">
          {carryKeys.map((c) => (
            <Pill key={c} selected={!!f.carry?.includes(c)} onClick={() => onChange({ ...f, carry: toggle(f.carry, c) })} multi>
              {carryLabels[c]}
            </Pill>
          ))}
        </div>
      </Group>

      <Group title="Size" id={`${idPrefix}-size`}>
        <div className="flex flex-wrap gap-2">
          {sizeKeys.map((s) => (
            <Pill key={s} selected={!!f.size?.includes(s)} onClick={() => onChange({ ...f, size: toggle(f.size, s) })} multi>
              {sizeLabels[s]}
            </Pill>
          ))}
        </div>
      </Group>

      <Group title="Price" id={`${idPrefix}-price`}>
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((r) => (
            <Pill
              key={r.key}
              selected={activeRange === r.key}
              onClick={() =>
                activeRange === r.key
                  ? onChange({ ...f, min: undefined, max: undefined })
                  : onChange({ ...f, min: "min" in r ? r.min : undefined, max: "max" in r ? r.max : undefined })
              }
            >
              {r.label}
            </Pill>
          ))}
        </div>
      </Group>

      <label className="flex min-h-11 cursor-pointer items-center gap-3">
        <input
          type="checkbox"
          checked={!!f.isNew}
          onChange={(e) => onChange({ ...f, isNew: e.target.checked })}
          className="h-5 w-5 accent-plum"
        />
        <span>New only</span>
      </label>
    </div>
  );
}

function Group({ title, id, children }: { title: string; id: string; children: React.ReactNode }) {
  return (
    <fieldset aria-labelledby={id}>
      <legend id={id} className="eyebrow mb-3 text-gold-text">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function Pill({
  selected,
  onClick,
  children,
  multi,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
  multi?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`inline-flex min-h-11 items-center gap-1.5 rounded-full border px-4 text-sm transition-colors ${
        selected ? "border-plum bg-plum text-ivory" : "border-line bg-white text-ink hover:border-plum-soft"
      }`}
    >
      {multi && selected && <Check aria-hidden="true" className="h-3.5 w-3.5 text-gold-light" strokeWidth={2} />}
      {children}
    </button>
  );
}
