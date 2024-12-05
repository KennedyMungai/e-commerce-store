import AdminSidebar from "@/components/admin-sidebar";
import AdminTopbar from "@/components/admin-topbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <div className="flex h-full">
      <AdminSidebar />
      <div className="size-full">
        <AdminTopbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
