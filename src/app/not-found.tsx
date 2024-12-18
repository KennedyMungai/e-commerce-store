import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex size-full flex-col items-center justify-center gap-6 bg-slate-50">
      <div>
        <Image src="/logo.svg" width={80} height={80} alt="Logo" />
      </div>
      <p className="text-3xl font-semibold text-neutral-600">
        404 | Page Not Found
      </p>
      <Button
        variant={"outline"}
        className="bg-transparent font-semibold text-neutral-600"
        asChild
      >
        <Link href="/">Go Back</Link>
      </Button>
    </main>
  );
};

export default NotFound;
