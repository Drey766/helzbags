import Link from "next/link";
import { MapPin } from "lucide-react";
import { brand, mapsUrl } from "@/config/brand";
import { HandleArch } from "@/components/brand/HandleArch";
import { Logo } from "@/components/brand/Logo";

export default function NotFound() {
  return (
    <section className="container-hz flex flex-col items-center py-20 text-center md:py-28">
      <HandleArch className="w-32" frameClassName="velvet aspect-[4/5] grid place-items-center">
        <Logo variant="mark" tone="dark" decorative className="h-14 w-14 opacity-80" />
      </HandleArch>
      <h1 className="display h-section mt-8 max-w-xl text-primary">
        This bag has <em className="text-primary-raised">wandered off</em>.
      </h1>
      <p className="mt-4 max-w-md text-muted">The page you were looking for is not here. Try the shop, or come and see the bags in person.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/shop" className="btn btn-primary">
          Shop the collection
        </Link>
        <Link href="/" className="btn btn-outline">
          Back home
        </Link>
      </div>
      <ul className="mt-10 flex flex-col gap-2 sm:flex-row sm:gap-6">
        {brand.shops.map((s) => (
          <li key={s.key}>
            <a href={mapsUrl(s)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-ink hover:text-primary">
              <MapPin aria-hidden="true" className="h-4 w-4 text-primary" strokeWidth={1.5} />
              {s.mall}, {s.street}
              <span className="sr-only">(opens Google Maps)</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
