"use client";

import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useFetchCategories } from "@/features/categories/api/use-fetch-categories";
import { CategoryColumns } from "@/features/categories/components/category-columns";

const CategoriesTable = () => {
  const { data: categoriesData, isPending, isError } = useFetchCategories();

  if (isPending)
    return (
      <div className="h-90">
        <div className="space-y-8 p-4">
          <div className="max-w-28 space-y-8">
            {/* TODO: Fix loading skeleton */}
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-[480rem]" />
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="h-90">
        <div className="space-y-8 p-4">
          <div className="max-w-28 space-y-8">
            {/* TODO: Fix error markup */}
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-[480rem]" />
          </div>
        </div>
      </div>
    );

  const categories = categoriesData.data.map((category) => ({
    ...category,
    createdAt: new Date(category.createdAt),
    updatedAt: category.updatedAt ? new Date(category.updatedAt) : null,
  }));

  return (
    <div className="p-4">
      <DataTable columns={CategoryColumns} data={categories} />
    </div>
  );
};

export default CategoriesTable;
