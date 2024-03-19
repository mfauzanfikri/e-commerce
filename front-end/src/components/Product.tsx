import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { addToCart, decreaseQuantity } from "@/lib/redux/slices/cart-slice";
import { ProductType } from "@/types/product-type";
import formatToIDR from "@/utils/formatToIDR";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Tag } from "primereact/tag";
import { ComponentProps } from "react";
import { useCounter } from "primereact/hooks";
import { IoAdd, IoRemove } from "react-icons/io5";

type CardProps = ComponentProps<typeof Card>;

type Props = {
  product: ProductType;
} & CardProps;

const Product = ({ product, ...props }: Props) => {
  const dispatch = useAppDispatch();
  const { cartItems } = useAppSelector((state) => state.cart);

  const itemInCart = cartItems.find((item) => item.id === product.id);
  const countItemInCart = itemInCart?.quantity;
  const { count, increment, decrement } = useCounter(countItemInCart || 0, {
    min: 0,
    max: product.stock,
    step: 1,
  });

  const formattedPrice = formatToIDR(product.price);

  const handleAddToCart = () => {
    dispatch(addToCart({ product }));
  };

  const handleRemoveOneFromCart = () => {
    dispatch(decreaseQuantity({ itemId: product.id }));
  };

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
    <div className="flex items-center justify-between">
      <div>
        <Button
          className="bg-blue-500 px-2 py-1.5 text-white hover:opacity-90 lg:scale-110"
          size="small"
          disabled={product.stock === 0}
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </div>

      {itemInCart && (
        <div className="flex items-center justify-center gap-3">
          <button onClick={handleRemoveOneFromCart}>
            <IoRemove />
          </button>
          <span>{countItemInCart}</span>
          <button onClick={handleAddToCart}>
            <IoAdd />
          </button>
        </div>
      )}
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
