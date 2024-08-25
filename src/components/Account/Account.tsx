import React from 'react';
import { Link } from 'react-router-dom';
import './account.css';

const AccountOptions: React.FC = () => {
  return (
    <div className="account-options">
      <div className="links">
        <Link to="/orders" className="link">Siparişlerim</Link>
        <Link to="/queries" className="link">Soru ve Taleplerim</Link>
        <Link to="/special-offers" className="link">Sana Özel Fırsatlar</Link>
        <Link to="/hepsipay" className="link">Hepsipay</Link>
        <Link to="/user-info" className="link">Kullanıcı Bilgilerim</Link>
        <Link to="/reviews" className="link">Değerlendirmelerim</Link>
        <Link to="/favorites" className="link">Beğendiklerim</Link>
        <Link to="/lists" className="link">Tüm Listelerim</Link>
        <Link to="/coupons" className="link">Kuponlarım</Link>
        <Link to="/logout" className="link">Çıkış Yap</Link>
      </div>
    </div>
  );
};

export default AccountOptions;
