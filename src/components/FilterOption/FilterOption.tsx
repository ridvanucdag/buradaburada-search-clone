import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { FaChevronDown } from 'react-icons/fa'; 
import './filterOption.css'; 

interface FilterOptionsProps {
  title: string;
  options: string[];
  selectedOptions: string[];
  onToggleOption: (option: string) => void;
}

const FilterOptions: React.FC<FilterOptionsProps> = ({
  title,
  options = [],
  selectedOptions = [],
  onToggleOption,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleOptions = () => {
    setIsOpen(prev => !prev);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event?.target?.value);
  };

  const filteredOptions = options?.filter(option =>
    option?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const rotation = useSpring({
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    config: { tension: 200, friction: 10 },
  });

  const showSearchInput = options?.length > 10 || searchTerm?.length > 0;

  return (
    <div className="filter-options">
      <div className="filter-title" onClick={toggleOptions}>
        <h4>{title}</h4>
        <animated.span style={{ ...rotation, display: 'inline-block', transformOrigin: 'center' }} className="icon">
          <FaChevronDown />
        </animated.span>
      </div>
      {isOpen && (
        <div className="options-dropdown">
          {showSearchInput && (
            <input
              type="text"
              placeholder="Ara..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          )}
          {filteredOptions?.length > 0 ? (
            <div className="options-list">
              {filteredOptions?.map(option => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selectedOptions?.includes(option)}
                    onChange={() => onToggleOption(option)}
                  />
                  {option}
                </label>
              ))}
            </div>
          ) : (
            <div>Seçenek yok</div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
