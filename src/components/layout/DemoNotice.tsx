import { brand, isDemoMode } from "@/config/brand";

export function DemoNotice() {
  if (!isDemoMode) return null;
  return (
    <div className="bg-plum-deep text-lilac-text" data-tone="dark">
      <p className="container-zb py-2 text-center text-[13px] leading-snug tracking-wide">{brand.demoNotice}</p>
    </div>
  );
}
