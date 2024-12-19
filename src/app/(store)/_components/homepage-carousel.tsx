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

  // TODO: Properly style the carousel
  return (
    <Carousel
      plugins={[plugin.current]}
      className="relative size-full max-w-xs flex-1 bg-rose-500"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="size-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="size-full p-1">
              <Card className="size-full">
                <CardContent className="flex size-full items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute left-2">
        <CarouselPrevious />
      </div>
      <div className="absolute right-2">
        <CarouselNext />
      </div>
    </Carousel>
  );
};

export default HomePageCarousel;
