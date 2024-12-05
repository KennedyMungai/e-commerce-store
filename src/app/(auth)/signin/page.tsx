import SigninForm from "@/features/auth/components/signin-form";

type Props = {
  searchParams: {
    error?: string;
  };
};

const SigninPage = async ({ searchParams }: Props) => {
  const { error } = await searchParams;

  return <SigninForm error={error} />;
};

export default SigninPage;
