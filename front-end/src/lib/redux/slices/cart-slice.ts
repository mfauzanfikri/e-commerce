import { Product } from "@/types/product-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

type cartItem = Product & { quantity: number };

type CartState = {
  loading: boolean;
  cartItems: cartItem[];
  itemsPrice: number;
  taxRate: number;
  totalPrice: number;
};

const initialState: CartState = {
  loading: true,
  cartItems: [],
  itemsPrice: 0,
  taxRate: 0.11,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      // added item
      const item = action.payload;

      // check if item exist in state
      const itemIsExist = state.cartItems.find(
        (product) => product.id === item.id,
      );

      if (itemIsExist) {
        // if exist, add 1 to state.cartItems[id].quantity
        state.cartItems = state.cartItems.map((product) => {
          const quantity = product.quantity + 1;
          return product.id === itemIsExist.id
            ? { ...item, quantity }
            : product;
        });
      } else {
        // if not exist add it to state.cartItems
        state.cartItems = [...state.cartItems, { ...item, quantity: 1 }];
      }

      // re-calculate state.itemsPrice
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      // re-calculate state.totalPrice
      state.totalPrice = itemsPrice + state.taxRate * itemsPrice;

      // set state to cookies
      Cookie.set("cart", JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      // filtered out deleted item
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );

      // re-calculate state.itemsPrice
      const itemsPrice = state.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0,
      );

      // re-calculate state.totalPrice
      state.totalPrice = itemsPrice + state.taxRate * itemsPrice;

      // set state to cookies
      Cookie.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
  },
});

const cartSliceReducer = cartSlice.reducer;

export const { addToCart, removeFromCart, hideLoading } = cartSlice.actions;
export default cartSliceReducer;
