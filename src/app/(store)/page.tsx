import BannersSection from "@/app/(store)/_components/banners-section";
import CategoriesSidebar from "@/app/(store)/_components/categories-sidebar";
import HomePageCarousel from "@/app/(store)/_components/homepage-carousel";
import { Separator } from "@/components/ui/separator";
import ProductsSlider from "@/features/products/components/products-slider";
import { ArrowDownIcon } from "lucide-react";

const HomePage = () => {
  return (
    <main className="h-full overflow-y-auto scrollbar-none">
      <div className="mb-20 flex h-[75vh] w-full justify-between gap-2">
        <div>
          <CategoriesSidebar />
        </div>
        <HomePageCarousel />
        <div>
          <BannersSection />
        </div>
      </div>
      <Separator className="relative my-8">
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs text-muted-foreground dark:bg-slate-800">
          <span className="animate-pulse">Browse our products</span>
          <ArrowDownIcon className="size-3 animate-bounce" />
        </div>
      </Separator>
      <div className="max-h-72 w-full overflow-x-auto scrollbar-none">
        <ProductsSlider />
      </div>
    </main>
  );
};

export default HomePage;
