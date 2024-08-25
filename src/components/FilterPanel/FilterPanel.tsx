import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedBrands, setSelectedColors, setSelectedCategories, setSelectedSort } from '../../redux/slices/productSlice';
import FilterOptions from '../FilterOption/FilterOption';
import './filterPanel.css';
import { Product } from '../../types/Product';

interface FilterPanelProps {
  products: Product[];
}

const FilterPanel: React.FC<FilterPanelProps> = ({ products }) => {
  const dispatch = useDispatch();
  
  const [selectedBrands, setSelectedBrandsState] = useState<string[]>([]);
  const [selectedColors, setSelectedColorsState] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategoriesState] = useState<string[]>([]);
  const [selectedSort, setSelectedSortState] = useState<"low" | "high" | "az" | "za" | "">(""); 

  const brands = Array.from(new Set(products?.map(item => item?.brand)));
  const colors = Array.from(new Set(products?.map(item => item?.color)));
  const categories = Array.from(new Set(products?.map(item => item?.category)));

  useEffect(() => {
    dispatch(setSelectedBrands(selectedBrands));
    dispatch(setSelectedColors(selectedColors));
    dispatch(setSelectedCategories(selectedCategories));
    dispatch(setSelectedSort(selectedSort)); 
  }, [selectedBrands, selectedColors, selectedCategories, selectedSort, dispatch]);

  const toggleSelection = (type: 'brand' | 'color' | 'category' | 'sort', value: string) => {
    if (type === 'brand') {
      setSelectedBrandsState(prev => 
        prev.includes(value) ? prev?.filter(b => b !== value) : [...prev, value]
      );
    } else if (type === 'color') {
      setSelectedColorsState(prev => 
        prev.includes(value) ? prev?.filter(c => c !== value) : [...prev, value]
      );
    } else if (type === 'category') {
      setSelectedCategoriesState(prev => 
        prev.includes(value) ? prev?.filter(c => c !== value) : [...prev, value]
      );
    } else if (type === 'sort') {
      setSelectedSortState(prev => (prev === value ? "" : value as "low" | "high" | "az" | "za"));
    }
  };

  const sortOptions = ['low', 'high', 'az', 'za'];

  return (
    <div className="filter-panel">
      <FilterOptions
        title="Sıralama"
        options={sortOptions}
        selectedOptions={selectedSort ? [selectedSort] : []} 
        onToggleOption={(option) => toggleSelection('sort', option)}
      />
      <FilterOptions
        title="Markalar"
        options={brands}
        selectedOptions={selectedBrands}
        onToggleOption={(brand) => toggleSelection('brand', brand)}
      />
      <FilterOptions
        title="Renkler"
        options={colors}
        selectedOptions={selectedColors}
        onToggleOption={(color) => toggleSelection('color', color)}
      />
      <FilterOptions
        title="Kategoriler"
        options={categories}
        selectedOptions={selectedCategories}
        onToggleOption={(category) => toggleSelection('category', category)}
      />
    </div>
  );
};

export default FilterPanel;
