"use client";

import getTailwindBreakPoint from "@/utils/getTailwindBreakPoint";
import { Carousel, CarouselResponsiveOption } from "primereact/carousel";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Carousel>;

const items = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const responsiveOpt: CarouselResponsiveOption[] = [
  {
    breakpoint: getTailwindBreakPoint("xl").toString(),
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: getTailwindBreakPoint("lg").toString(),
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: getTailwindBreakPoint("md").toString(),
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: getTailwindBreakPoint("sm").toString(),
    numVisible: 1,
    numScroll: 1,
  },
];

const template = (item: { id: number }) => {
  return (
    <div className="m-2 mx-3 max-w-md rounded-lg bg-gray-100 p-4 shadow">
      <h4 className="font-semibold xl:text-xl">Highlight {item.id}</h4>
      <p className="text-xs font-bold text-gray-500 md:text-sm xl:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, incidunt.
      </p>
    </div>
  );
};

const HighlightCarousel = ({
  className = "mt-5 lg:mt-8 lg:mx-8",
  value = items,
  showNavigators = false,
  showIndicators = false,
  itemTemplate = template,
  responsiveOptions = responsiveOpt,
  numVisible = 3,
  numScroll = 1,
  circular = true,
  autoplayInterval = 3000,
  ...props
}: CardProps) => {
  return (
    <Carousel
      className={className}
      value={value}
      showNavigators={showNavigators}
      showIndicators={showIndicators}
      itemTemplate={itemTemplate}
      responsiveOptions={responsiveOptions}
      numVisible={numVisible}
      circular={circular}
      autoplayInterval={autoplayInterval}
      {...props}
    />
  );
};

export default HighlightCarousel;
