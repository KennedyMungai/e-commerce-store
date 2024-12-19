"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UserButton from "@/features/auth/components/user-button";
import { HeadsetIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const StoreNavbar = () => {
  const session = useSession();

  return (
    <nav className="h-14 border-b">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-2">
        <Link href="/">
          <div className="flex items-center gap-2 text-neutral-600">
            <Image src="/logo.svg" width={40} height={40} alt="Logo" />
            <p className="hidden text-lg font-semibold text-neutral-600 dark:text-neutral-400 md:flex">
              E Commerce Store
            </p>
          </div>
        </Link>
        <div className="hidden flex-1 px-8 md:flex">
          <Input
            className="w-full bg-slate-50 text-center text-neutral-400 placeholder:text-neutral-400 focus-visible:ring-0"
            placeholder="Search products"
          />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <UserButton />
          {session.data &&
            (session.data.user?.role === "admin" ||
              session.data.user?.role === "superadmin") && (
              <Button
                variant={"outline"}
                size="icon"
                title="Go to dashboard"
                asChild
              >
                <Link href="/dashboard">
                  <HeadsetIcon className="size-5" />
                </Link>
              </Button>
            )}
        </div>
      </div>
    </nav>
  );
};

export default StoreNavbar;
