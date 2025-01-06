"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const carouselItems: {
  category: string;
  imageUrl: string;
  categoryId: string;
}[] = [
  {
    category: "Dresses",
    imageUrl:
      "https://utfs.io/f/E3wtkNTsjDlU0AnBFTbCqEypZj3XKQhI7lb1ArPTdR4ntNHD",
    categoryId: "74db7262-0589-475f-b960-d4cbc670f7e8",
  },
  {
    category: "Shoes",
    imageUrl:
      "https://utfs.io/f/E3wtkNTsjDlUBRR1aOLD2xp7b9YJC1gVmFzy56wQOu8hGLRA",
    categoryId: "78fa7fc8-2040-4b57-b141-32b44b74523a",
  },
  {
    category: "Vehicles",
    imageUrl:
      "https://utfs.io/f/E3wtkNTsjDlUa1W2pAGlixu3tpyWdahPgDFGAvwBfEcMK2NO",
    categoryId: "a37f0ef9-14d9-4ad5-9db7-66482e2981a6",
  },
  {
    category: "Laptop and Desktop Computers",
    imageUrl:
      "https://utfs.io/f/E3wtkNTsjDlUk7lvwbRxumaVLr94p7HIn1GhE3QXJyDCqbSg",
    categoryId: "912459b4-bded-4167-8771-c3cd51ded210",
  },
  {
    category: "Kitchen Appliances",
    imageUrl:
      "https://utfs.io/f/E3wtkNTsjDlUmXhnel2EaTARzsI8uiglhOkQ7Z5HpJDFMYjU",
    categoryId: "c087a5e5-5fdb-410c-aa02-d427d7cbe000",
  },
];

const HomePageCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative mx-12 size-full flex-1"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent className="h-full rounded-sm">
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className="size-full">
            <div className="size-full">
              <Card className="aspect-[9/8] size-full rounded-sm shadow-none dark:bg-slate-800">
                <CardContent className="relative flex size-full items-center justify-center p-6">
                  <Link
                    href={`/categories/${item.categoryId}`}
                    title={item.category}
                  >
                    <Image
                      src={item.imageUrl}
                      alt={item.category}
                      fill
                      className="rounded-sm object-cover"
                    />
                  </Link>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HomePageCarousel;
