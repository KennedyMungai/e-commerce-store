import NavigationMenuBar from "@/features/categories/components/navigation-menu-bar";

const HomePage = () => {
  return (
    <main className="h-[91.5vh] bg-slate-50">
      <div className="container mx-auto h-full overflow-y-auto bg-white p-2">
        <NavigationMenuBar />
      </div>
    </main>
  );
};

export default HomePage;
