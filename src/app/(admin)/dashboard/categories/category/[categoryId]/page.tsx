type Props = {
  params: {
    categoryId: string;
  };
};

const CategoryPage = async ({ params }: Props) => {
  const { categoryId } = await params;

  return <div>{categoryId}</div>;
};

export default CategoryPage;
