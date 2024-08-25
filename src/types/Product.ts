export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  color: string;
  imageUrl: string;
  stock: number;
  category: string;
  description: string;
  discount?: number;
  hasCoupon?: boolean;
  seller: string;
  sellerId: number;
  sellerLogo: string;
}

export interface FilterOptions {
  categories: string[];
  brands: string[];
  colors: string[];
  searchQuery: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  isDiscounted: boolean;
  hasCoupon: boolean;
}

export interface Category {
  id: number;
  name: string;
}

export type FilterOptionsType = FilterOptions;
