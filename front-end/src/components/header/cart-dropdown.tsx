import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { CartItem, removeFromCart } from "@/lib/redux/slices/cart-slice";
import formatToIDR from "@/utils/formatToIDR";
import Link from "next/link";
import { ComponentProps } from "react";
import { IoIosClose } from "react-icons/io";
import ScrollIntoView from "react-scroll-into-view";

type CartDropdownProps = ComponentProps<"ul"> & {
  cartItems: CartItem[];
  onClickShopButton: () => void;
};

const CartDropdown = ({
  cartItems,
  onClickShopButton,
  ...props
}: CartDropdownProps) => {
  const { itemsPrice } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleRemoveCartItem = (cartItemId: number) => {
    dispatch(removeFromCart(cartItemId));
  };

  const itemList =
    cartItems.length > 0 ? (
      <>
        {cartItems.map((item) => {
          return (
            <li className="flex justify-between px-1 py-2" key={item.id}>
              <div className="flex w-full gap-2">
                <div className="h-8 w-8 shrink-0 self-center rounded bg-gray-500" />
                <div className="flex w-full items-center justify-between gap-5">
                  <p className="whitespace-nowrap text-sm font-semibold lg:text-base">
                    {item.name}
                  </p>
                  <div className="text-end text-[10px] lg:text-[12px]">
                    <p>{item.quantity}x</p>
                    <p className="mt-0.5 whitespace-nowrap">
                      {formatToIDR(item.price)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="text-lg text-gray-400 hover:text-gray-600"
                  onClick={() => handleRemoveCartItem(item.id)}
                >
                  <IoIosClose />
                </button>
              </div>
            </li>
          );
        })}
      </>
    ) : (
      <>
        <li className="w-max px-1 py-2 text-center text-sm lg:text-base">
          No item in cart.
        </li>
        <li className="flex justify-center px-1.5 py-2">
          <ScrollIntoView selector="#products">
            <button
              className="rounded bg-blue-500 px-2.5 py-1 text-sm text-white hover:opacity-90"
              onClick={onClickShopButton}
            >
              Shop
            </button>
          </ScrollIntoView>
        </li>
      </>
    );

  const checkOutButton =
    cartItems.length > 0 ? (
      <li className="flex justify-center gap-1.5 px-1.5 py-2">
        <p>Subtotal: {formatToIDR(itemsPrice)}</p>
        <div className="self-end">
          <Link href="/checkout">
            <button className="rounded bg-blue-500 px-1.5 py-1 text-white hover:opacity-90">
              Checkout
            </button>
          </Link>
        </div>
      </li>
    ) : undefined;

  return (
    <ul {...props}>
      {itemList}
      {checkOutButton}
    </ul>
  );
};

export default CartDropdown;
