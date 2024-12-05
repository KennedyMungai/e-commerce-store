"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Input } from "@/components/ui/input";
import UserButton from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";

const StoreNavbar = () => {
  return (
    <nav className="h-14 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-2">
        <Link href="/">
          <div className="flex items-center gap-2 text-neutral-600">
            <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            <p className="text-lg font-semibold">E Commerce Store</p>
          </div>
        </Link>
        <div className="flex-1 px-8">
          <Input
            className="w-full bg-slate-100 text-center"
            placeholder="Search products"
          />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
