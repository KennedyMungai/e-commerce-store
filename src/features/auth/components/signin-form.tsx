"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { credentialsSigninAction } from "@/features/auth/actions/auth-actions";
import Socials from "@/features/auth/components/socials";
import { SigninSchema, SigninType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  error?: string;
};

const SigninForm = ({ error }: Props) => {
  const { execute, isPending } = useAction(credentialsSigninAction, {
    onSuccess: () => toast.success("Sign in successful"),
    onError: () => toast.error("Something went wrong, please try again"),
  });

  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (error) {
    toast.error(error);
    window.location.href = "/signin";
  }

  const onSubmit = (values: SigninType) => {
    execute(values);

    form.reset();
  };

  if (!isMounted) return null;

  return (
    <Card className="max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-3xl">Sign in</CardTitle>
        <CardDescription className="text-muted-foreground">
          Use the form below to sign in
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Email"
                      type="email"
                      disabled={isPending || form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Password"
                      type="password"
                      disabled={isPending || form.formState.isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={isPending || form.formState.isSubmitting}
            >
              Sign In
            </Button>
          </form>
        </Form>
        <Button
          asChild
          className="mt-4"
          variant={"link"}
          disabled={isPending || form.formState.isSubmitting}
        >
          <Link href="/signin/forgot-password">Forgot Password?</Link>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Socials />
        <Button
          variant="link"
          asChild
          disabled={isPending || form.formState.isSubmitting}
        >
          <Link href="/signup">Don&apos;t have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
