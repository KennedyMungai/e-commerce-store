import CategoriesTable from "@/features/categories/components/categories-table";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories",
};

const CategoriesPage = () => {
  return <CategoriesTable />;
};

export default CategoriesPage;
