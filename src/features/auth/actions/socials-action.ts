"use server";

import { signIn } from "@/auth";

export const googleAuthAction = async () => await signIn("google");

export const githubAuthAction = async () => await signIn("github");
