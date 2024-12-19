import StoreNavbar from "@/components/store-navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const StoreLayout = ({ children }: Props) => {
  return (
    <div className="h-full">
      <StoreNavbar />
      <div className="h-[91.5vh] bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto h-full overflow-y-auto bg-white p-2 dark:bg-slate-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default StoreLayout;
