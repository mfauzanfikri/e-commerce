import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { FaCartShopping } from "react-icons/fa6";
import CartDropdown from "./cart-dropdown";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  CartState,
  initialState,
  updateCartState,
} from "@/lib/redux/slices/cart-slice";

const Cart = () => {
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const cartState = useAppSelector((state) => state.cart);
  const { cartItems } = cartState;
  const cartIsEmpty = cartItems.length === 0;

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickShopButton = () => {
    setOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center">
      <button
        className="relative hover:text-gray-700 lg:text-2xl"
        onClick={handleClick}
      >
        <FaCartShopping />

        {!cartIsEmpty && (
          <div className="absolute -right-1 -top-0.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>
      {open && (
        <CartDropdown
          className="absolute right-0 top-8 z-10 flex flex-col divide-y rounded bg-white px-3 py-2 shadow"
          cartItems={cartItems}
          onClickShopButton={handleClickShopButton}
        />
      )}
    </div>
  );
};

export default Cart;
