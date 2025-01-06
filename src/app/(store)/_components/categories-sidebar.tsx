"use client";

import { useFetchCategories } from "@/features/categories/api/use-fetch-categories";
import { useRouter } from "next/navigation";

const CategoriesSidebar = () => {
  const {
    data: categoriesData,
    isPending: isCategoriesDataPending,
    isError: isCategoriesDataError,
  } = useFetchCategories();

  const router = useRouter();

  // TODO: Update the loading markup
  if (isCategoriesDataPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isCategoriesDataError) return <div>Error</div>;

  const categories = categoriesData.data.map((category) => ({
    ...category,
    createdAt: new Date(category.createdAt),
    updatedAt: category.updatedAt ? new Date(category.updatedAt) : null,
  }));

  return (
    <div className="flex h-full w-36 flex-col items-center overflow-y-auto rounded-md border-2 border-neutral-400 p-1 dark:border-neutral-300">
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category.id}
            className="cursor-pointer rounded-sm border-2 border-neutral-400 p-0.5 text-sm font-semibold capitalize text-neutral-400 transition-opacity hover:opacity-80 dark:border-neutral-300 dark:text-neutral-400"
            onClick={() => router.push(`/categories/${category.id}`)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
