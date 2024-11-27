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
import Socials from "@/features/auth/components/socials";
import { SigninSchema, SigninType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";

const SigninForm = () => {
  const form = useForm<SigninType>({
    resolver: zodResolver(SigninSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SigninType) => console.log(values);

  return (
    <Card className="min-w-[600px]">
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
                    <Input {...field} placeholder="Email" />
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
                    <Input {...field} placeholder="Password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign In
            </Button>
          </form>
        </Form>
        <Button asChild className="mt-4" variant={"link"}>
          <Link href="/signin/forgot-password">Forgot Password?</Link>
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Socials />
        <Button variant="link" asChild>
          <Link href="/signup">Don&apos;t have an account?</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SigninForm;
