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
import { useRef } from "react";

const HomePageCarousel = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative mx-12 size-full flex-1"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="h-full rounded-sm">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="size-full">
            <div className="size-full">
              <Card className="aspect-[9/8] size-full rounded-sm shadow-none dark:bg-slate-800">
                <CardContent className="flex size-full items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
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
