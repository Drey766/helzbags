import { Hero } from "@/components/home/Hero";
import { Occasions } from "@/components/home/Occasions";
import { CategoryRow } from "@/components/home/CategoryRow";
import { NewIn } from "@/components/home/NewIn";
import { FinderBand } from "@/components/home/FinderBand";
import { ZuriCollection } from "@/components/home/ZuriCollection";
import { EditorialSplit } from "@/components/home/EditorialSplit";
import { OrderingSteps } from "@/components/home/OrderingSteps";
import { ShopsBand } from "@/components/shops/ShopsBand";
import { PolicyStrip } from "@/components/home/PolicyStrip";
import { BlogPreview } from "@/components/home/BlogPreview";
import { FinalCta } from "@/components/home/FinalCta";

export default function Home() {
  return (
    <>
      <Hero />
      <Occasions />
      <CategoryRow />
      <NewIn />
      <FinderBand />
      <ZuriCollection />
      <EditorialSplit />
      <OrderingSteps />
      <ShopsBand />
      <PolicyStrip />
      <BlogPreview />
      <FinalCta />
    </>
  );
}
