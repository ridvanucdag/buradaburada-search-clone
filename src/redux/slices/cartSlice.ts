import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existingItem = state?.items?.find(
        (item) => item?.id === action?.payload?.id
      );
      if (!existingItem) {
        state?.items?.push(action?.payload);
      }
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state?.items?.filter(
        (item) => item?.id !== action?.payload
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice?.actions;
export default cartSlice.reducer;
