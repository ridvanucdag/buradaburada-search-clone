import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { RootState } from '../../redux/store';
import { formatPrice } from '../../utils/helpers';
import './cart.css';

const Cart: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state?.cart?.items);
  const dispatch = useDispatch();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  console.log('cartItems', cartItems);

  return (
    <div className="cart">
      <h3>Sepet</h3>
      {cartItems?.length > 0 ? (
        cartItems?.map(item => (
          <div key={item?.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item?.imageUrl} alt={item?.name} />
            </div>
            <div className="cart-item-details">
              <h4>{item?.name}</h4>
              <p>Marka: {item?.brand}</p>
              <p>Renk: {item?.color}</p>
              <p>Fiyat: {formatPrice(item?.price)}</p>
            </div>
            <button onClick={() => handleRemove(item?.id)}>Sil</button>
          </div>
        ))
      ) : (
        <p>Sepetiniz boş.</p>
      )}
    </div>
  );
};

export default Cart;
