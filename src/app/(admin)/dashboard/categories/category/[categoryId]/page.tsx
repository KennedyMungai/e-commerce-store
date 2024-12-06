import CategoryDetails from "@/features/categories/components/category-details";

type Props = {
  params: {
    categoryId: string;
  };
};

const CategoryPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  return <CategoryDetails id={categoryId} />;
};

export default CategoryPage;
