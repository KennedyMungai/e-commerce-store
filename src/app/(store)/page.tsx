import BannersSection from "@/app/(store)/_components/banners-section";
import CategoriesSidebar from "@/app/(store)/_components/categories-sidebar";
import HomePageCarousel from "@/app/(store)/_components/homepage-carousel";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="flex h-[75vh] w-full justify-between gap-2">
        <div>
          <CategoriesSidebar />
        </div>
        <HomePageCarousel />
        <div>
          <BannersSection />
        </div>
      </div>
      <Separator className="my-6" />
    </main>
  );
};

export default HomePage;
