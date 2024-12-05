import StoreNavbar from "@/components/store-navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StoreLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <StoreNavbar />
      {children}
    </div>
  );
};

export default StoreLayout;
