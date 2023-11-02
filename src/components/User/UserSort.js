import React, { useState } from "react";

const SortButton = ({ list, onSort }) => {
  const [isAscending, setIsAscending] = useState(true);
  const toggleSort = () => {
    const sortedList = [...list].sort((a, b) =>
      isAscending
        ? a.username.localeCompare(b.username)
        : b.username.localeCompare(a.username)
    );
    onSort(sortedList);
    setIsAscending(!isAscending);
  };
  return (
    <button
      onClick={toggleSort}
      className={`btn btn-lg btn${isAscending ? "-outline" : ""}-warning sort-btn`}
    >
      <i
        className={`fas fa-sort-alpha-${isAscending ? "up" : "down"} mx-2`}
      ></i>
    </button>
  );
};

export default SortButton;
