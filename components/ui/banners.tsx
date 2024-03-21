"use client"
import {useEffect} from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { Banner } from "@/types";
import Billboard from "./billboard";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from 'embla-carousel-react'

interface BannerProps {
  data: Banner[];
}

const Banners: React.FC<BannerProps> = ({
  data
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay()])
  
  useEffect(() => {
    if (emblaApi) emblaApi?.plugins()?.autoplay?.stop();
  }, [emblaApi])

  return (
    <Carousel opts={{watchDrag:false}} ref={emblaRef} className="w-full">
      <CarouselContent>
        {data.map((banner, index) => (
          <CarouselItem key={index}>
            <Billboard data={banner} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default Banners;
