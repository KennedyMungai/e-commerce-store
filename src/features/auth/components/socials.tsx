"use client";

import { Button } from "@/components/ui/button";
import {
  githubAuthAction,
  googleAuthAction,
} from "@/features/auth/actions/socials-action";
import { useAction } from "next-safe-action/hooks";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

const Socials = () => {
  const { execute: googleExecute, isPending: isGooglePending } = useAction(
    googleAuthAction,
    {
      onError: () => toast.error("Something went wrong, please try again"),
    },
  );

  const { execute: githubExecute, isPending: isGithubPending } = useAction(
    githubAuthAction,
    {
      onError: () => toast.error("Something went wrong, please try again"),
    },
  );

  return (
    <div className="my-4 flex items-center justify-between gap-4">
      <Button
        variant={"outline"}
        onClick={googleExecute}
        disabled={isGooglePending || isGithubPending}
      >
        <FcGoogle />
        Sign in with Google
      </Button>
      <Button
        variant={"outline"}
        onClick={githubExecute}
        disabled={isGooglePending || isGithubPending}
      >
        <FaGithub />
        Sign in with Github
      </Button>
    </div>
  );
};

export default Socials;
