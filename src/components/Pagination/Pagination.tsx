import React from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/productSlice';
import './pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
  const dispatch = useDispatch();

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      if (currentPage < totalPages) {
        dispatch(setCurrentPage(currentPage + 1));
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentPage, totalPages]);

  return (
    <div className="pagination">
      <p>Loading more items...</p>
    </div>
  );
};

export default Pagination;
