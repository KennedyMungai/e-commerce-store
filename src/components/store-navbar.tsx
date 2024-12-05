"use client";

import UserButton from "@/features/auth/components/user-button";

const StoreNavbar = () => {
  return (
    <nav className="flex h-14 items-center justify-between border-b p-2">
      <div></div>
      <div></div>
      <div>
        <UserButton />
      </div>
    </nav>
  );
};

export default StoreNavbar;
