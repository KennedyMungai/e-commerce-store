"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { ForgotPasswordSchema, ForgotPasswordType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { forgotPasswordAction } from "../actions/auth-actions";

const ForgotPasswordForm = () => {
  const { execute, isPending } = useAction(forgotPasswordAction, {
    onSuccess: () => toast.success("Reset password link sent"),
    onError: () => toast.error("Something happened. Please try again"),
  });

  const form = useForm<ForgotPasswordType>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: ForgotPasswordType) => {
    execute(values);

    form.reset();
  };

  return (
    <Card className="min-w-[600px]">
      <CardHeader>
        <CardTitle className="text-3xl">Forgot Password?</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add your email to the field below
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
                      disabled={form.formState.isSubmitting || isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting || isPending}
            >
              Send Confirmation Email
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
