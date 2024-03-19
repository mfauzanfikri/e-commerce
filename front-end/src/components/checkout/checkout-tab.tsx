"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { removeFromCart } from "@/lib/redux/slices/cart-slice";
import formatToIDR from "@/utils/formatToIDR";
import Link from "next/link";
import { IoIosClose } from "react-icons/io";

const CheckoutTab = () => {
  const { cartItems, itemsPrice, taxRate, totalPrice } = useAppSelector(
    (state) => state.cart,
  );

  const dispatch = useAppDispatch();

  const handleRemoveCartItem = (cartItemId: number) => {
    dispatch(removeFromCart(cartItemId));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="mt-2 rounded bg-white p-4">
        <ul>
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((item) => {
                return (
                  <li
                    className="flex justify-between gap-1 px-1 py-2"
                    key={item.id}
                  >
                    <div className="flex w-full gap-2">
                      <div className="h-10 w-10 shrink-0 self-center rounded bg-gray-500 lg:h-12 lg:w-12" />
                      <div className="flex w-full items-center justify-between gap-5">
                        <p className="whitespace-nowrap font-semibold lg:text-xl">
                          {item.name}
                        </p>
                        <div className="text-end text-sm lg:text-lg">
                          <p>{item.quantity}x</p>
                          <p className="mt-0.5 whitespace-nowrap">
                            {formatToIDR(item.price)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <button
                        className="text-lg text-gray-400 hover:text-gray-600 lg:text-3xl"
                        onClick={() => handleRemoveCartItem(item.id)}
                      >
                        <IoIosClose />
                      </button>
                    </div>
                  </li>
                );
              })}{" "}
              <li className="flex items-center justify-between border-t border-t-gray-200 px-2 pt-2">
                <div>
                  <p>
                    Tax: <b>{taxRate * 100}%</b>
                  </p>
                  <p>
                    Total Price:{" "}
                    <b>{formatToIDR(Number.parseInt(totalPrice.toFixed(0)))}</b>
                  </p>
                </div>
                <div>
                  <button className="rounded bg-blue-400 p-3  text-white hover:opacity-90">
                    Proceed Payment
                  </button>
                </div>
              </li>
            </>
          ) : (
            <li className="text-center">
              <p>
                Cart is empty.{" "}
                <Link
                  href={"/"}
                  className="text-blue-500 underline hover:text-blue-400"
                >
                  Go back
                </Link>
              </p>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default CheckoutTab;
