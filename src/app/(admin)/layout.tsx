import AdminSidebar from "@/components/admin-sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      {children}
    </div>
  );
};

export default DashboardLayout;
