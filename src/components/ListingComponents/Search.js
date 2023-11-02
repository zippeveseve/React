import React from "react";
const Search = ({ value, onChangeData }) => {
  return (
    <form className="d-flex w-75 m-auto" role="search">
      <input
        className="form-control form-control-lg "
        type="search"
        placeholder="Enter product name"
        aria-label="Search"
        value={value}
        onChange={onChangeData}
      />
    </form>
  );
};

export default Search;
