import { Button } from "@/components/ui/button";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex size-full flex-col gap-y-4 bg-blue-500 text-white">
      <p>
        <span className="animate-pulse">404</span> This page could not be found
      </p>
      <Button variant={"outline"} asChild>
        <Link href="/dashboard">Go back to dashboard</Link>
      </Button>
    </div>
  );
};

export default NotFound;
