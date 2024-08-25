import React, { useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import productsData from "../../data.json";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import "./homePage.css";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, setProducts, setCurrentPage } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";

const ITEMS_PER_PAGE = 16;

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const {
    filteredItems,
    selectedBrands,
    selectedColors,
    selectedCategories,
    selectedSort,
    currentPage,
  } = useSelector((state: RootState) => state.products);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    dispatch(setProducts(productsData));
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      filterProducts({
        selectedBrands,
        selectedColors,
        selectedCategories,
        priceRange: undefined,
        isDiscounted: undefined,
        hasCoupon: undefined,
        searchTerm: undefined,
        selectedSort,
        initialProducts: productsData,
      })
    );
  }, [selectedBrands, selectedColors, selectedCategories, selectedSort, dispatch]);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredItems?.length / ITEMS_PER_PAGE));
  }, [filteredItems]);

  const currentProducts = filteredItems?.slice(0, currentPage * ITEMS_PER_PAGE);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight
      ) {
        if (currentPage < totalPages) {
          dispatch(setCurrentPage(currentPage + 1));
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages, dispatch]);

  return (
    <div className="home-page">
      <div className="filter-container">
        <FilterPanel products={productsData} />
      </div>
      {currentProducts?.length > 0 ? (
        <ProductList products={currentProducts} />
      ) : (
        <p>Ürün Bulunamadı</p>
      )}
    </div>
  );
};

export default HomePage;
