import CategoryItems from "@/features/categories/components/category-items";

type Props = {
  params: {
    categoryId: string;
  };
};

const CategoryPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  return <CategoryItems categoryId={categoryId} />;
};

export default CategoryPage;
