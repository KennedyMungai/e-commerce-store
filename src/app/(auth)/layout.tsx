import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <div className="grid h-full grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-4 bg-blue-300">
        <Image src="/logo.svg" alt="Logo" width={200} height={200} />
        <p className="text-3xl font-semibold text-white">E Commerce Store</p>
      </div>
      <div className="flex items-center justify-center bg-white">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
