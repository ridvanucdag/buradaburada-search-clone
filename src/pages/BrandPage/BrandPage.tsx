import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import ProductList from "../../components/ProductList/ProductList";
import productsData from "../../data.json";
import { Product } from "../../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, setProducts } from "../../redux/slices/productSlice";
import { RootState } from "../../redux/store";
import "./brandpage.css";

const ITEMS_PER_PAGE = 16;

const BrandPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedBrands, selectedColors, selectedCategories, selectedSort, filteredItems } = useSelector((state: RootState) => state.products);
  
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  useEffect(() => {
    const filtered = productsData?.filter((product) => product?.sellerId === parseInt(id || "0"));
    
    setInitialProducts(filtered);
    dispatch(setProducts(filtered));

    setCurrentPage(1);
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(filterProducts({
      selectedBrands,
      selectedColors,
      selectedCategories,
      selectedSort,
      isDiscounted: undefined,
      hasCoupon: undefined,
      searchTerm: undefined,
      initialProducts,
    }));
  }, [selectedBrands, selectedColors, selectedCategories, selectedSort, initialProducts, dispatch]);

  const totalPages = Math.ceil(filteredItems?.length / ITEMS_PER_PAGE);
  const currentProducts = filteredItems?.slice(0, currentPage * ITEMS_PER_PAGE);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;

    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage, totalPages]);

  const firstProduct = filteredItems[0];

  return (
    <div className="brand-page">
      <div className="bread-crumbs">
        <a href="/">Anasayfa</a> &gt; <a href="/">Mağaza</a> &gt;{" "}
        {firstProduct ? firstProduct?.seller : "Satıcı"}
      </div>
      <div className="brand-info">
        <div className="cover-image-container">
          <img
            src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgk0HJ1Yo84xMtViIlY9XCB-aZTvFg9xgN0u30ZaAoh77SdWqjsZrTqsD0evyjTtipYWzjz1t30xnFVpTbrFpXLB9ChMUnBD-qFxNPwCvrJLPfD_qMGJhv8TMRskFJBlOSRpv7cOSjo0sQ/s1600/1024_Black%2520Parquet.jpg"
            alt="cover"
            className="cover-image"
          />
          <img
            src={firstProduct?.sellerLogo}
            alt="Profile"
            className="brand-logo"
          />
        </div>
        <div className="brand-details">
          <div className="brand-name">
            <h1 className="seller-name">
              {firstProduct ? firstProduct?.seller : "Satıcı"}
            </h1>
            {firstProduct && (
              <div className="seller-verification">
                <div className="verified-icon" title="Onaylanmış Resmi Hesap">
                  <FaCheckCircle className="checkmark"  />
                </div>
                <span className="verified-text">Resmi Satıcı</span>
              </div>
            )}
            <button className="follow-button">Takip et</button>
          </div>

          <div className="brand-stats">
            <span>{firstProduct ? 4.7 : "N/A"}</span> |{" "}
            <span>{firstProduct ? `111 takipçi` : "N/A takipçi"}</span> |{" "}
            <span>
              {initialProducts ? `${initialProducts?.length} ürün` : "N/A ürün"}
            </span>{" "}
            |{" "}
            <span>
              {initialProducts ? `100 değerlendirme` : "N/A değerlendirme"}
            </span>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="filter-container">
          <FilterPanel products={initialProducts} />
        </div>
        <div className="product-container">
          {filteredItems?.length > 0 ? (
            <ProductList products={currentProducts} showSellerInfo={false} />
          ) : (
            <p>Bu satıcıya ait ürün bulunamadı.</p>
          )}
          {currentPage < totalPages && <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
};

export default BrandPage;
