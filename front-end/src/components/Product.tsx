import { Product } from "@/types/product-type";
import formatToIDR from "@/utils/formatToIDR";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ComponentProps } from "react";

type CardProps = ComponentProps<typeof Card>;

type Props = {
  product: Product;
} & CardProps;

const Product = ({ product, ...props }: Props) => {
  const formattedPrice = formatToIDR(product.price);

  const header = (
    <>
      <div>
        <div className="h-64 w-full bg-gray-400 lg:h-96"></div>
      </div>
      <div className="px-5 pt-5">
        <h4 className="text-2xl font-semibold">{product.name}</h4>
        <p>{formattedPrice}</p>
        {product.stock > 0 ? (
          <Tag severity={"success"}>In Stock</Tag>
        ) : (
          <Tag severity={"danger"}>Out Of Stock</Tag>
        )}
      </div>
    </>
  );

  const footer = (
    <div>
      <Button
        className="lg:scale-110"
        size="small"
        disabled={product.stock === 0}
      >
        Add to cart
      </Button>
    </div>
  );

  return (
    <Card header={header} footer={footer} {...props}>
      <p className="text-sm md:text-base">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum, ad!
      </p>
    </Card>
  );
};

export default Product;
