import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "../../data.json";
import { Product } from "../../types/Product";
import { formatPrice } from "../../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import "./productDetail.css";
import { FaCheckCircle } from "react-icons/fa";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  if (!id) {
    return <div>Ürün ID'si bulunamadı.</div>;
  }

  const product: Product | undefined = productsData?.find(
    (p) => p?.id === parseInt(id)
  );

  if (!product) {
    return <div>Ürün bulunamadı.</div>;
  }

  const isInCart = cartItems?.some((item) => item?.id === product?.id);

  const handleAddToCart = () => {
    if (isInCart) {
      dispatch(removeFromCart(product?.id));
    } else {
      if (product?.stock > 0) {
        dispatch(addToCart(product));
      }
    }
  };

  // Handle seller click to navigate to the seller's page
  const handleSellerClick = () => {
    navigate(`/brand/${product?.sellerId}`); // Navigate to seller's page
  };

  return (
    <div className="product-detail">
      <div className="breadcrumbs">
        <a href="/">Anasayfa</a> &gt; <a href="/">{product?.category}</a> &gt;{" "}
        {product?.name}
      </div>
      <div className="product-detail-container">
        <div className="product-image">
          <img src={product?.imageUrl} alt={product?.name} />
        </div>
        <div className="product-info">
          <h1>{product?.name}</h1>
          <p className="price">{formatPrice(product?.price)}</p>
          <p className="brand">Marka: {product?.brand}</p>
          <p className="color">Renk: {product?.color}</p>
          <p className="description">{product?.description}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <p className="small-text2" onClick={handleSellerClick} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
              Satıcı: {product?.seller}
            </p>
            {product?.sellerId === 123457779 && (
              <div
                className="verified-icon-product-detail"
                title="Onaylanmış Resmi Hesap"
              >
                <FaCheckCircle className="checkmark-product-detail" />
              </div>
            )}
          </div>
          {product.stock > 0 ? (
            <>
              <button
                className={`add-to-cart ${
                  isInCart ? "in-cart" : "not-in-cart"
                }`}
                onClick={handleAddToCart}
              >
                {isInCart ? "Sepetten Çıkar" : "Sepete Ekle"}
              </button>
            </>
          ) : (
            <p className="out-of-stock">Stokta Yok</p>
          )}
        </div>
        <div className="product-specifications">
          <h2>Ürün Özellikleri</h2>
          <ul>
            <li>Ölçüler: {product?.name || "Bilinmiyor"}</li>
            <li>Ağırlık: {product?.name || "Bilinmiyor"}</li>
            <li>Güç: {product?.description || "Bilinmiyor"}</li>
            <li>Diğer Özellikler: {product?.description || "Bilinmiyor"}</li>
          </ul>
        </div>
      </div>

      <div className="customer-reviews">
        <h2>Müşteri Yorumları</h2>
        <div className="review">
          <p>
            <strong>Ali K.</strong> - 5 yıldız
          </p>
          <p>
            Bu ürünü 3 aydır kullanıyorum ve gerçekten harika! Hızlı pişiriyor
            ve temizlemesi çok kolay.
          </p>
        </div>
        <div className="review">
          <p>
            <strong>Aylin D.</strong> - 4 yıldız
          </p>
          <p>
            Fiyatına göre çok iyi bir ürün, sadece biraz gürültülü çalışıyor.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
