"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import UserButton from "@/features/auth/components/user-button";
import { BoxIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Categories",
    href: "/dashboard/categories",
    icon: BoxIcon,
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="flex w-32 flex-col items-center justify-between border-r px-2 py-4">
      <Link href="/dashboard">
        <div className="flex flex-col items-center gap-2 text-neutral-600">
          <Image src="/logo.svg" width={40} height={40} alt="Logo" />
        </div>
      </Link>
      <div className="flex w-full flex-col gap-2">
        {links.map((link) => (
          <Button
            key={link.href}
            className="flex w-full items-center justify-center"
            asChild
            variant={pathname === link.href ? "default" : "ghost"}
          >
            <Link href={link.href}>
              <link.icon className="mr-0.5" /> {link.name}
            </Link>
          </Button>
        ))}
      </div>
      <div className="space-y-4">
        <UserButton />
        <ModeToggle />
      </div>
    </aside>
  );
};

export default AdminSidebar;
