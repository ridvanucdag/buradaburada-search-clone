import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorages";

const loadCartState = loadFromLocalStorage("cart");
const loadProductState = loadFromLocalStorage("products");

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartState || { items: [] },
    products: loadProductState || {
      items: [],
      filteredItems: [],
      currentPage: 1,
      totalPages: 0,
      itemsPerPage: 16,
      selectedBrands: [],
      selectedColors: [],
      selectedSort: "",
      selectedCategories: [],
    },
  },
});

store.subscribe(() => {
  saveToLocalStorage("cart", store?.getState()?.cart);
  saveToLocalStorage("products", store?.getState()?.products);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
