import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalCount, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          onClick={() => onPageChange(i)}
          className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
            i === currentPage ? 'bg-gray-500 text-white' : 'text-gray-300 hover:bg-gray-500'
          }`}
        >
          {i}
        </a>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <nav className="flex items-center bg-[#1d232a] justify-center px-4 py-3 sm:px-6" aria-label="Pagination">
        <div className="flex flex-1 justify-between sm:justify-end">
          <a
            href="#"
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)} 
            className={`relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
              currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-500'
            }`}
            aria-disabled={currentPage === 1}
          >
            Previous
          </a>

          <div className="ml-3 flex space-x-1">{renderPageNumbers()}</div>

          <a
            href="#"
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={`relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium ${
              currentPage === totalPages ? 'text-gray-500 cursor-not-allowed' : 'text-white hover:bg-gray-500'
            }`}
            aria-disabled={currentPage === totalPages}
          >
            Next
          </a>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
