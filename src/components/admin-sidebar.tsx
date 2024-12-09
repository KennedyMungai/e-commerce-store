"use client";

import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/user-button";
import { BoxIcon, TruckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: BoxIcon,
  },
  {
    name: "Suppliers",
    href: "/dashboard/suppliers",
    icon: TruckIcon,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-32 flex-col items-center justify-between border-r p-4">
      <Link href="/dashboard">
        <div className="flex flex-col items-center gap-2 text-neutral-600">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </div>
      </Link>
      <div className="h-full flex-1 space-y-6 px-1 py-6">
        {links.map((link) => (
          <Button
            key={link.href}
            className="flex w-full items-center justify-center"
            asChild
            variant={pathname === link.href ? "default" : "outline"}
          >
            <Link href={link.href}>
              <link.icon className="mr-0.5 md:hidden" />{" "}
              <span className="hidden md:inline">{link.name}</span>
            </Link>
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        <UserButton />
      </div>
    </aside>
  );
};

export default AdminSidebar;
