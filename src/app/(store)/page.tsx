import BannersSection from "@/app/(store)/_components/banners-section";
import CategoriesSidebar from "@/app/(store)/_components/categories-sidebar";
import HomePageCarousel from "@/app/(store)/_components/homepage-carousel";

const HomePage = () => {
  return (
    <main className="h-full overflow-y-auto">
      <div className="flex h-[75vh] w-full justify-between gap-2">
        <div>
          <CategoriesSidebar />
        </div>
        <div className="flex flex-1 items-center justify-center rounded-sm border p-1">
          <HomePageCarousel />
        </div>
        <div>
          <BannersSection />
        </div>
      </div>
    </main>
  );
};

export default HomePage;
