"use client";

import { ModeToggle } from "@/components/mode-toggle";
import UserButton from "@/features/auth/components/user-button";

const StoreNavbar = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b p-2">
      <div></div>
      <div></div>
      <div className="flex items-center gap-2">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default StoreNavbar;
