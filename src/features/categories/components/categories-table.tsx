"use client";

import { DataTable } from "@/components/data-table";
import { SelectCategoryType } from "@/db/schema";
import { useFetchCategories } from "@/features/categories/api/use-fetch-categories";
import { CategoryColumns } from "@/features/categories/components/category-columns";

const CategoriesTable = () => {
  const { data, isPending, isError } = useFetchCategories();

  if (isPending) return <div>Loading...</div>;

  if (isError) return <div>Error</div>;

  return (
    <div className="h-full">
      <div className="p-4">
        <DataTable
          columns={CategoryColumns}
          data={data as SelectCategoryType[]}
        />
      </div>
    </div>
  );
};

export default CategoriesTable;
