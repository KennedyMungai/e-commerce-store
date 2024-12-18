"use client";

import { useFetchCategory } from "@/features/categories/api/use-fetch-category";

type Props = {
  categoryId: string;
};

const CategoryItems = ({ categoryId }: Props) => {
  const {
    data: categoryData,
    isPending: isCategoryDataPending,
    isError: isCategoryDataError,
  } = useFetchCategory(categoryId);

  // TODO: Update the loading markup
  if (isCategoryDataPending) return <div>Loading...</div>;

  // TODO: Update the error markup
  if (isCategoryDataError) return <div>Error</div>;

  return (
    <div className="h-full overflow-y-auto p-4">
      <h3 className="text-2xl font-semibold capitalize text-neutral-700">
        {categoryData?.data.name}
      </h3>
      <p className="text-sm text-muted-foreground">
        {categoryData?.data.description}
      </p>
    </div>
  );
};

export default CategoryItems;
