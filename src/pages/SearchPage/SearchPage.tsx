import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import productsData from './../../data.json';
import ProductList from '../../components/ProductList/ProductList';
import { FilterOptions, Product } from '../../types/Product';
import { useDispatch, useSelector } from 'react-redux';
import { filterProducts, setProducts, setCurrentPage } from '../../redux/slices/productSlice';
import { RootState } from '../../redux/store';
import './searchPage.css';
import { formatProductCount } from '../../utils/helpers';

const ITEMS_PER_PAGE = 10;

const SearchPage: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('q') || '';

  const { filteredItems, selectedBrands, selectedSort, selectedColors, selectedCategories, currentPage } = useSelector((state: RootState) => state.products);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    colors: [],
    searchQuery: searchQuery,
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 0,
    isDiscounted: false,
    hasCoupon: false,
  });

  const [initialFilteredItems, setInitialFilteredItems] = useState<Product[]>([]);
  const [initialFilteredCount, setInitialFilteredCount] = useState<number>(0);

  const totalPages = Math.ceil(initialFilteredCount / ITEMS_PER_PAGE);

  useEffect(() => {
    dispatch(setProducts(productsData)); 
  }, [dispatch]);

  useEffect(() => {
    setFilterOptions(prev => ({ ...prev, searchQuery }));
  }, [searchQuery]);

  useEffect(() => {
    const filtered = productsData?.filter(product => {
      const searchLower = filterOptions?.searchQuery?.toLowerCase();
      return (
        product?.name?.toLowerCase()?.includes(searchLower) ||
        product?.description?.toLowerCase()?.includes(searchLower) ||
        product?.brand?.toLowerCase()?.includes(searchLower) ||
        product?.category?.toLowerCase()?.includes(searchLower) ||
        product?.color?.toLowerCase()?.includes(searchLower)
      );
    });
    setInitialFilteredItems(filtered);
    setInitialFilteredCount(filtered?.length);

    dispatch(filterProducts({
      selectedBrands,
      selectedColors,
      selectedCategories,
      isDiscounted: undefined,
      hasCoupon: undefined,
      selectedSort,
      searchTerm: filterOptions.searchQuery,
      initialProducts: productsData
    }));
  }, [selectedBrands, selectedColors, selectedCategories, selectedSort,filterOptions?.searchQuery, dispatch]);

  const currentProducts = filteredItems?.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight && currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages]);

  return (
    <div className="search-page">
      <h2>Aranan Kelime: {filterOptions?.searchQuery}</h2>
      {initialFilteredCount > 0 && (
        <p>{filterOptions?.searchQuery} ile ilgili {formatProductCount(initialFilteredCount)} ürün bulduk.</p>
      )}

      <div className="content-container">
        <div className="filter-container">
          <FilterPanel products={initialFilteredItems} />
        </div>

        <div className="product-container">
          {currentProducts?.length > 0 ? (
            <ProductList products={currentProducts} />
          ) : (
            <p>Hiç ürün bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

