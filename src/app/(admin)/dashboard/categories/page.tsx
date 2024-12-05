import { DataTable } from "@/components/data-table";
import { CategoryColumns } from "@/features/categories/components/category-columns";

const CategoriesPage = () => {
  return (
    <div className="h-full">
      <div className="p-4">
        <DataTable columns={CategoryColumns} data={[]} />
      </div>
    </div>
  );
};

export default CategoriesPage;
