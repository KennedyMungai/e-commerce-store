import CategoriesSidebar from "@/app/(store)/_components/categories-sidebar";

const HomePage = () => {
  return (
    <main className="h-[91.5vh] bg-slate-50">
      <div className="container mx-auto h-full overflow-y-auto bg-white p-2">
        <div className="flex h-[75vh] w-full justify-between gap-2">
          <div>
            <CategoriesSidebar />
          </div>
          <div className="flex-1 bg-rose-500">Carousel</div>
          <div className="bg-sky-500">Banner</div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
