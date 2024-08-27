import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar/SearchBar";
import Cart from "../../components/Cart/Cart";
import "./header.css";
import { RootState } from "../../redux/store";
import AccountOptions from "../../components/Account/Account";
import {
  FaCartPlus,
  FaChevronDown,
  FaUser,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { FilterOptions } from "../../types/Product";

const Header: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isAccountOptionsOpen, setIsAccountOptionsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    brands: [],
    colors: [],
    searchQuery: "",
    categories: [],
    minPrice: 0,
    maxPrice: Infinity,
    minRating: 0,
    isDiscounted: false,
    hasCoupon: false,
  });

  const accountRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const cartItems = useSelector((state: RootState) => state?.cart?.items);

  const handleSearch = (query: string) => {
    setTimeout(() => {
      navigate(`/search?q=${query}`);
    }, 300);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountRef.current &&
        !accountRef.current.contains(event.target as Node)
      ) {
        setIsAccountOptionsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="top-bar">
        <div className="container">
          <nav className="top-nav">
            <ul>
              {[
                { path: "/orders", label: "Siparişlerim" },
                { path: "/super-prices", label: "Süper Fiyat, Süper Teklif" },
                { path: "/international", label: "Yurt Dışından" },
                { path: "/campaigns", label: "Kampanyalar" },
                { path: "/women-entrepreneurs", label: "Girişimci Kadınlar" },
                { path: "/customer-service", label: "Müşteri Hizmetleri" },
                { path: "/premium", label: "buradaburada Premium" },
                { path: "/be-seller", label: "buradaburada'da Satıcı Ol" },
              ]?.map(({ path, label }) => (
                <li key={path}>
                  <Link to={path}>{label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="header-content">
        <div className="container">
          <div className="header-inner">
            <Link to="/" className="logo-link">
              <div className="logo">buradaburada</div>
            </Link>

            <div className="search-bar">
              <SearchBar
                setFilterOptions={setFilterOptions}
                onSearch={handleSearch}
              />
            </div>

              <LocationDropdown
                isOpen={isLocationDropdownOpen}
                setIsOpen={setIsLocationDropdownOpen}
              />
              <AccountDropdown
                isOpen={isAccountOptionsOpen}
                setIsOpen={setIsAccountOptionsOpen}
                accountRef={accountRef}
              />
              <CartDropdown
                isOpen={isCartOpen}
                setIsOpen={setIsCartOpen}
                cartItems={cartItems}
              />
    
            </div>

        </div>
      </div>
    </header>
  );
};

const LocationDropdown: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}> = ({ isOpen, setIsOpen }) => (
  <div
    className="location"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    <FaMapMarkerAlt className="location-icon" />
    <div className="location-info">
      <span>Konum</span>
      <span className="sub-location">Ev</span>
    </div>
    <FaChevronDown className="dropdown-icon-location" />
    {isOpen && (
      <div className="location-dropdown">
        <p>Konumunuzu Belirleyin</p>
        <p>
          Adresinizi veya konum bilgilerinizi seçerek özel hizmetleri
          görebilirsiniz.
        </p>
        <Link to="/select-location">Yeni Konum Seç</Link>
      </div>
    )}
  </div>
);

const AccountDropdown: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  accountRef: React.RefObject<HTMLDivElement>;
}> = ({ isOpen, setIsOpen, accountRef }) => (
  <div
    className="account"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
    ref={accountRef}
    aria-expanded={isOpen}
  >
    <div className="account-header">
      <FaUser className="user-icon" />
      <div className="account-info">
        <Link to="/account" className="account-link">
          Hesabım
        </Link>
        <p className="account-name">{"Rıdvan Üçdağ"}</p>
      </div>
      <FaChevronDown className="dropdown-icon" />
    </div>
    {isOpen && <AccountOptions />}
  </div>
);

const CartDropdown: React.FC<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  cartItems: any[];
}> = ({ isOpen, setIsOpen, cartItems }) => (
  <Link
    to="/basket"
    className="basket-cart"
    onMouseEnter={() => setIsOpen(true)}
    onMouseLeave={() => setIsOpen(false)}
  >
    <div className="basket-cart-link">
      <FaCartPlus className="basket-cart-icon" />
      <div className="basket-cart-text">Sepetim</div>
      {cartItems?.length > 0 && (
        <div className="basket-cart-count">{cartItems?.length}</div>
      )}
    </div>
    {isOpen && (
      <div className="basket-cart-dropdown">
        <Cart />
      </div>
    )}
  </Link>
);

export default Header;
