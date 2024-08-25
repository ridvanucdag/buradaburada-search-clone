// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BasketPage from './pages/Basket/BasketPage';
import Footer from './pages/Footer/Footer';
import Header from './pages/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFoundPage'; 
import './style/styles.css';
import SearchPage from './pages/SearchPage/SearchPage';
import BrandPage from './pages/BrandPage/BrandPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';

const App: React.FC = () => {
  return (
    <div className='appContainer'>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/basket" element={<BasketPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/brand/:id" element={<BrandPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
