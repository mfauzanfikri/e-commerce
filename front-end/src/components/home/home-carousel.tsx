"use client";

import { Carousel } from "primereact/carousel";
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
];

const template = (item: { id: number }) => {
  return (
    <div className="mb-2 flex h-96 w-full items-center justify-center rounded bg-gray-700 lg:h-[600px] xl:h-[700px]">
      <p className="text-4xl font-bold text-white">{item.id}</p>
    </div>
  );
};

const HomeCarousel = ({
  pt = {
    nextButton: {
      className: "hidden md:block mx-2",
    },
    previousButton: {
      className: "hidden md:block",
    },
  },
  value = items,
  numVisible = 1,
  itemTemplate = template,
  circular = true,
  autoplayInterval = 5000,
  ...props
}: CardProps) => {
  return (
    <Carousel
      pt={pt}
      value={value}
      numVisible={numVisible}
      itemTemplate={itemTemplate}
      circular={circular}
      autoplayInterval={autoplayInterval}
      {...props}
    />
  );
};

export default HomeCarousel;
