import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../types/Product";

interface ProductState {
  products: Product[];
  filteredItems: Product[];
  selectedBrands: string[];
  selectedColors: string[];
  selectedCategories: string[];
  selectedSort: "low" | "high" | "az" | "za" | "";
  currentPage: number;
}

const initialState: ProductState = {
  products: [],
  filteredItems: [],
  selectedBrands: [],
  selectedColors: [],
  selectedCategories: [],
  selectedSort: "",
  currentPage: 1,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      state.filteredItems = action.payload;
    },
    setSelectedBrands(state, action: PayloadAction<string[]>) {
      state.selectedBrands = action.payload;
    },
    setSelectedColors(state, action: PayloadAction<string[]>) {
      state.selectedColors = action.payload;
    },
    setSelectedCategories(state, action: PayloadAction<string[]>) {
      state.selectedCategories = action.payload;
    },
    setSelectedSort(
      state,
      action: PayloadAction<"low" | "high" | "az" | "za" | "">
    ) {
      state.selectedSort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    filterProducts(
      state,
      action: PayloadAction<{
        selectedBrands: string[];
        selectedColors: string[];
        selectedCategories: string[];
        priceRange?: string;
        isDiscounted?: boolean;
        hasCoupon?: boolean;
        searchTerm?: string;
        selectedSort: "low" | "high" | "az" | "za" | "";
        initialProducts: Product[];
      }>
    ) {
      const {
        selectedBrands,
        selectedColors,
        selectedCategories,
        priceRange,
        hasCoupon,
        searchTerm,
        selectedSort,
        initialProducts,
      } = action.payload;

      let filtered = initialProducts;

      if (selectedBrands?.length > 0) {
        filtered = filtered?.filter((product) =>
          selectedBrands?.includes(product?.brand)
        );
      }

      if (selectedColors?.length > 0) {
        filtered = filtered?.filter((product) =>
          selectedColors?.includes(product?.color)
        );
      }

      if (selectedCategories?.length > 0) {
        filtered = filtered?.filter((product) =>
          selectedCategories?.includes(product?.category)
        );
      }

      if (hasCoupon) {
        filtered = filtered?.filter((product) => product?.hasCoupon);
      }

      if (searchTerm) {
        filtered = filtered?.filter(
          (product) =>
            product?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            product?.description
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            product?.color
              ?.toLowerCase()
              ?.includes(searchTerm?.toLowerCase()) ||
            product?.brand?.toLowerCase()?.includes(searchTerm?.toLowerCase())
        );
      }

      if (selectedSort) {
        switch (selectedSort) {
          case "low":
            filtered = [...filtered]?.sort((a, b) => a?.price - b?.price);
            break;
          case "high":
            filtered = [...filtered]?.sort((a, b) => b?.price - a?.price);
            break;
          case "az":
            filtered = [...filtered]?.sort((a, b) =>
              a?.name?.localeCompare(b?.name)
            );
            break;
          case "za":
            filtered = [...filtered]?.sort((a, b) =>
              b?.name?.localeCompare(a?.name)
            );
            break;
          default:
            break;
        }
      }
      state.filteredItems = filtered;
      state.currentPage = 1;
    },
  },
});

export const {
  setProducts,
  setSelectedBrands,
  setSelectedColors,
  setSelectedCategories,
  setSelectedSort,
  setCurrentPage,
  filterProducts,
} = productSlice.actions;

export default productSlice.reducer;
