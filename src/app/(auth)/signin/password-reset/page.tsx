import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PasswordResetForm from "@/features/auth/components/password-reset-form";
import { verifyResetEmail } from "@/lib/verify-reset-email";
import { TriangleAlertIcon } from "lucide-react";

type Props = {
  searchParams: {
    token?: string;
  };
};

const PasswordResetPage = async ({ searchParams }: Props) => {
  const { token } = await searchParams;

  if (!token) {
    return (
      <Card className="min-h-[200px] min-w-[400px]">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
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

  const isVerified = await verifyResetEmail(token);

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

  return <PasswordResetForm />;
};

export default PasswordResetPage;
