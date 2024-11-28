"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signoutAction } from "@/features/auth/actions/auth-actions";
import { LoaderIcon, UserIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

const UserButton = () => {
  const { data, status } = useSession();

  const { execute, isPending } = useAction(signoutAction, {
    onSuccess: () => toast.success("Successfully signed out"),
    onError: () => toast.error("Something went wrong, please try again"),
  });

  if (!data || !data.user || status !== "authenticated") return null;

  if (isPending)
    return (
      <div className="flex size-10 items-center justify-center">
        <LoaderIcon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={data.user.image ?? ""} />
          <AvatarFallback>
            <UserIcon className="size-5 text-muted-foreground" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={() => execute()}>
        <DropdownMenuItem>Sign Out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
