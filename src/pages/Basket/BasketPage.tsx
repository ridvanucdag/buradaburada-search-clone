import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/slices/cartSlice";
import { RootState } from "../../redux/store";
import { formatPrice } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";
import "./basketpage.css";

const BasketPage: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotal = () => {
    return cartItems?.reduce((total, item) => total + item?.price, 0);
  };

  const handleSellerClick = (sellerId: number) => {
    navigate(`/brand/${sellerId}`);
  };

  const shippingCost = 59.90;

  const groupedItems = cartItems?.reduce((groups, item) => {
    const seller = item?.seller;
    if (!groups[seller]) {
      groups[seller] = [];
    }
    groups[seller]?.push(item);
    return groups;
  }, {} as { [key: string]: typeof cartItems });

  return (
    <div className="basket-page">
      <div className="basket-header">
        <h1>Sepetim</h1>
        <p>({cartItems?.length} ürün)</p>
      </div>
      <div className="basket-content">
        <div className="basket-items">
          {Object.entries(groupedItems)?.map(([seller, items]) => (
            <div key={seller} className="seller-group">
              <div
                className="seller-header"
                onClick={() => handleSellerClick(items?.[0]?.sellerId)}
              >
                <p>Satıcı: {seller}</p>
              </div>
              <hr />
              {items?.map((item, index) => (
                <div key={item?.id} className="basket-item">
                  <div className="basket-item-image">
                    <img src={item?.imageUrl} alt={item?.name} />
                  </div>
                  <div className="basket-item-details">
                    <h4>{item?.name}</h4>
                    <p>Son {item?.stock} Ürün</p>
                    <p>Fiyat: {formatPrice(item?.price)}</p>
                    <button
                      className="remove-button"
                      onClick={() => handleRemove(item?.id)}
                    >
                      Sil
                    </button>
                  </div>
                  {index < items?.length - 1 && <hr className="item-separator" />}
                </div>
              ))}

            </div>
          ))}
        </div>
        <div className="basket-summary">
          <h4>SEÇİLEN ÜRÜNLER ({cartItems?.length})</h4>
          <h3>Toplam: {formatPrice(calculateTotal())}</h3>
          <button className="checkout-button">Alışverişi tamamla</button>
          <div className="premium-info">
            <p>Premium'a geç, kargo bedava ve %3 Hepsipara avantajları ile 74,90 TL tasarruf et.</p>
            <button className="premium-button">Şimdi Geç</button>
          </div>
          <div className="shipping-info">
            <p>Ürünler: {formatPrice(calculateTotal())}</p>
            <p>Kargo: {formatPrice(shippingCost)}</p>
            <p>Genel Toplam: {formatPrice(calculateTotal() + shippingCost)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
