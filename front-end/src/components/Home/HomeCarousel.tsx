"use client";

import useWindowDimensions from "@/hooks/useWindowDimensions";
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
    <div className="mb-2 flex h-96 w-full items-center justify-center rounded bg-gray-700 lg:h-[600px]">
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

  ...props
}: CardProps) => {
  const { width } = useWindowDimensions();

  return (
    <Carousel
      pt={pt}
      value={value}
      numVisible={numVisible}
      itemTemplate={itemTemplate}
      circular={circular}
      autoplayInterval={width < 640 ? 5000 : undefined}
      {...props}
    />
  );
};

export default HomeCarousel;
