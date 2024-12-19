import Image from "next/image";

const BannersSection = () => {
  return (
    <div className="grid h-full w-48 grid-rows-2 gap-4 p-1">
      <div className="relative row-span-1 rounded-sm border">
        <Image
          src="/e-commerce-banner-1.jpg"
          fill
          alt="Ad banner 1"
          title="Ad banner 1"
          className="rounded-sm object-fill"
        />
      </div>
      <div className="relative row-span-1 rounded-sm border">
        <Image
          src="/e-commerce-banner-2.jpg"
          fill
          alt="Ad banner 2"
          title="Ad banner 2"
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  );
};

export default BannersSection;
