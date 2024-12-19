import { auth } from "@/auth";
import AdminSidebar from "@/components/admin-sidebar";
import AdminTopbar from "@/components/admin-topbar";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user?.role !== "superadmin" && session?.user?.role !== "admin")
    redirect("/");

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
