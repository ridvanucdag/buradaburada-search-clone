import React, { useState } from "react";
import { Product } from "../../types/Product";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { formatPrice } from "../../utils/helpers";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaHeart } from "react-icons/fa";
import "./productList.css";

interface ProductListProps {
  products: Product[];
  showSellerInfo?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, showSellerInfo = true }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  const [favoriteProducts, setFavoriteProducts] = useState<number[]>([]);

  const handleMouseEnter = (id: number) => {
    setHoveredProductId(id);
  };

  const handleMouseLeave = () => {
    setHoveredProductId(null);
  };

  const handleAddToCart = (product: Product) => {
    const isProductInCart = cartItems?.some((item) => item?.id === product?.id);

    if (isProductInCart) {
      dispatch(removeFromCart(product.id));
    } else {
      if (product?.stock > 0) {
        dispatch(addToCart(product));
      }
    }
  };

  const handleToggleFavorite = (productId: number) => {
    setFavoriteProducts((prev) =>
      prev?.includes(productId)
        ? prev?.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div className="product-list">
      {products?.length > 0 ? (
        products?.map((product) => {
          const isInCart = cartItems?.some((item) => item?.id === product?.id);
          const isFavorite = favoriteProducts?.includes(product?.id);

          return (
            <div
              key={product?.id}
              className="product-card"
              onMouseEnter={() => handleMouseEnter(product?.id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link to={`/product/${product?.id}`} className="product-link">
                <div className="product-image">
                  <img src={product?.imageUrl} alt={product?.name} />
                </div>
                <div>
                  <h4>{product?.name}</h4>
                  <div className="product-info">
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <p className="small-text1">Marka : {product?.brand}</p>
                    <p className="small-text1">Renk : {product?.color}</p>
                  </div>

                  {showSellerInfo && ( 
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p className="small-text2">Satıcı : {product?.seller}</p>
                      {product?.sellerId === 123457779 && (
                        <div
                          className="verified-icon-product"
                          title="Onaylanmış Resmi Hesap"
                        >
                          <FaCheckCircle className="checkmark-product" />
                        </div>
                      )}
                    </div>
                  )}
</div>
                  <p>{formatPrice(product?.price)}</p>
                </div>
              </Link>
              <div className="delivery-info">
                <div className="fast-delivery">Hızlı Teslimat</div>
                <div className="free-shipping">Kargo Bedava</div>
              </div>
              {product?.stock > 0 ? (
                <button
                  className={`add-to-carts ${isInCart ? "added" : ""}`}
                  onClick={() => handleAddToCart(product)}
                  style={{
                    display: hoveredProductId === product?.id ? "block" : "none",
                  }}
                >
                  {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
                </button>
              ) : (
                <p className="out-of-stock">Stokta yok</p>
              )}
              <div
                className={`favorite-icon ${
                  hoveredProductId === product?.id ? "visible" : ""
                } ${isFavorite ? "favorited" : ""}`}
                onClick={() => handleToggleFavorite(product?.id)}
              >
                <FaHeart />
              </div>
            </div>
          );
        })
      ) : (
        <p>Ürün bulunamadı.</p>
      )}
    </div>
  );
};

export default ProductList;
