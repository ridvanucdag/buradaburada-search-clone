import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './searchBar.css';
import { FilterOptions } from '../../types/Product';

interface SearchBarProps {
  setFilterOptions: React.Dispatch<React.SetStateAction<FilterOptions>>;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ setFilterOptions, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e?.target?.value);
  };

  const handleSearch = () => {
    if (searchTerm?.length >= 3) {
      setFilterOptions(prev => ({
        ...prev,
        searchQuery: searchTerm,
      }));
      onSearch(searchTerm);
    }
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder="Ürün, kategori veya Marka Ara..."
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="search-bar"
      />
      <button className="search-button" onClick={handleSearch}>Ara</button>
    </div>
  );
};

export default SearchBar;
