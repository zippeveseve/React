import React, { useEffect, useState } from "react";

const Pagination = ({ data, perPage, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handlePageChange(1);
  }, [data]);

  const handlePageChange = (pageNumber) => {
    const indexOfLastItem = pageNumber * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    setCurrentPage(pageNumber);
    const slicedItems = data.slice(indexOfFirstItem, indexOfLastItem);
    onPageChange(slicedItems);
  };

  const totalPages = Math.ceil(data.length / perPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${number === currentPage ? "active" : ""}`}
          >
            <button
              onClick={() => handlePageChange(number)}
              className="page-link"
            >
              <span className="fs-18 px-1"> {number}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
