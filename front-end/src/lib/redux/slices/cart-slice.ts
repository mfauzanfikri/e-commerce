import { ProductType } from "@/types/product-type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export type CartItem = ProductType & { quantity: number };

export type CartState = {
  loading: boolean;
  cartItems: CartItem[];
  itemsPrice: number;
  taxRate: number;
  totalPrice: number;
};

const cartInCookies = Cookies.get("cart");
const cartStateInCookies = cartInCookies
  ? (JSON.parse(cartInCookies) as CartState)
  : undefined;

export const initialState: CartState = cartStateInCookies
  ? { ...cartStateInCookies, loading: true }
  : {
      loading: true,
      cartItems: [],
      itemsPrice: 0,
      taxRate: 0.11,
      totalPrice: 0,
    };

// export const initialState: CartState = {
//   loading: true,
//   cartItems: [],
//   itemsPrice: 0,
//   taxRate: 0.11,
//   totalPrice: 0,
// };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: ProductType; n?: number }>,
    ) => {
      // added item
      const item = action.payload.product;
      const n = action.payload.n && action.payload.n > 0 ? action.payload.n : 1;

      // check if item exist in state
      const itemInCart = state.cartItems.find(
        (product) => product.id === item.id,
      );

      if (itemInCart) {
        // if exist, add 1 to state.cartItems[id].quantity
        state.cartItems = state.cartItems.map((product) => {
          const quantity = product.quantity + n;
          return product.id === itemInCart.id ? { ...item, quantity } : product;
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

      state.itemsPrice = itemsPrice;

      // re-calculate state.totalPrice
      state.totalPrice = itemsPrice + state.taxRate * itemsPrice;

      // set state to cookies
      Cookies.set("cart", JSON.stringify(state));
    },
    decreaseQuantity: (
      state,
      action: PayloadAction<{ itemId: number; n?: number }>,
    ) => {
      const id = action.payload.itemId;
      const n = action.payload.n || 1;

      // check if item exist in state
      const itemInCart = state.cartItems.find((product) => product.id === id);

      if (!itemInCart) return;

      if (itemInCart.quantity === 1 || itemInCart.quantity <= n) {
        // filtered out deleted item
        state.cartItems = state.cartItems.filter((item) => item.id !== id);

        // set state to cookies
        Cookies.set("cart", JSON.stringify(state));

        return;
      }

      const updatedCartItems = [...state.cartItems].map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }

        return item;
      });

      state.cartItems = updatedCartItems;

      // set state to cookies
      Cookies.set("cart", JSON.stringify(state));
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
      Cookies.set("cart", JSON.stringify(state));
    },
    hideLoading: (state) => {
      state.loading = false;
    },
    updateCartState: (state, action: PayloadAction<CartState>) => {
      state = action.payload;
    },
  },
});

const cartSliceReducer = cartSlice.reducer;

export const {
  addToCart,
  removeFromCart,
  hideLoading,
  decreaseQuantity,
  updateCartState,
} = cartSlice.actions;
export default cartSliceReducer;
