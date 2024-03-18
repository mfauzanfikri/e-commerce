import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./slices/cart-slice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export type AppStore = typeof store;
