import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifyEmail } from "@/lib/verify-email";
import { CheckCircleIcon, TriangleAlertIcon } from "lucide-react";
import Link from "next/link";

type Props = {
  searchParams: {
    token?: string;
  };
};

const VerifyEmail = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Card className="min-h-[200px] min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Sorry, your email could not be verified
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center">
          <TriangleAlertIcon className="size-10 text-rose-500" />
          <p className="text-muted-foreground">Email verification has failed</p>
        </CardContent>
      </Card>
    );
  }

  const isVerified = await verifyEmail(token);

  if (!isVerified) {
    return (
      <Card className="min-h-[200px] min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Email Verification</CardTitle>
          <CardDescription>
            Sorry, your email could not be verified
          </CardDescription>
        </CardHeader>
        <CardContent className="flex h-full flex-col items-center justify-center">
          <TriangleAlertIcon className="size-10 text-rose-500" />
          <p className="text-muted-foreground">Email verification has failed</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="min-h-[200px] min-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl">Email Verification</CardTitle>
        <CardDescription>Thank you for signing up</CardDescription>
      </CardHeader>
      <CardContent className="flex h-full flex-col items-center justify-center">
        <CheckCircleIcon className="size-10 text-emerald-500" />
        <p className="text-muted-foreground">Your email has been verified</p>
      </CardContent>
      <CardFooter>
        <Button variant={"link"} asChild>
          <Link href={"/signin"}>Go to login</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmail;
