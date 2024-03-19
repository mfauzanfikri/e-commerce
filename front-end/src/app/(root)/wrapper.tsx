"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { hideLoading } from "@/lib/redux/slices/cart-slice";
import { useEffect } from "react";

const Wrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(hideLoading());
  }, [dispatch]);

  return <>{!loading && children}</>;
};

export default Wrapper;
