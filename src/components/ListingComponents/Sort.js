import React, { useState } from "react";

const SortButton = ({ list, onSort, title }) => {
  const [isAscending, setIsAscending] = useState(true);

  const toggleSort = () => {
    const sortedList = [...list].sort((a, b) => {
      if (title === "Cart") {
        // Sort by product.title when title is "Cart"
        return isAscending
          ? a.product.title.localeCompare(b.product.title)
          : b.product.title.localeCompare(a.product.title);
      } else {
        // Sort by title for other cases
        return isAscending
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      }
    });

    onSort(sortedList);
    setIsAscending(!isAscending);
  };

  return (
    <button
      onClick={toggleSort}
      className={` btn btn${isAscending ? "-outline" : ""}-warning fs-18`}
    >
      <i
        className={`fas fa-sort-alpha-${isAscending ? "up" : "down"} mx-2`}
      ></i>
    </button>
  );
};

export default SortButton;
