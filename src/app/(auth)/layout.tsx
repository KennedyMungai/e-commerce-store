import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="h-full md:grid md:grid-cols-2">
      <div className="hidden flex-col items-center justify-center gap-4 bg-blue-300 md:flex">
        <Image src="/logo.svg" alt="Logo" width={200} height={200} />
        <p className="text-3xl font-semibold text-white">E Commerce Store</p>
      </div>
      <div className="flex h-full items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
