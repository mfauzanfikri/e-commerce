"use client";

import { FC, ReactNode } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

export const StoreProvider = ({
  children,
}: Readonly<{
  children: ReactNode;
}>) => {
  return <Provider store={store}>{children}</Provider>;
};
