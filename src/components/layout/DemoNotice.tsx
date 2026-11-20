import { brand, isDemoMode } from "@/config/brand";

export function DemoNotice() {
  if (!isDemoMode) return null;
  return (
    <div className="bg-primary-deep text-muted-on-dark" data-tone="dark">
      <p className="container-hz py-2 text-center text-[13px] leading-snug tracking-wide">{brand.demoNotice}</p>
    </div>
  );
}
