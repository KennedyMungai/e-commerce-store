"use client";

import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

const AdminTopbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex h-14 w-full items-center justify-between border-b p-4">
      <h3 className="text-2xl capitalize">
        {pathname.split("/")[2] ?? "Dashboard"}
      </h3>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};

export default AdminTopbar;
