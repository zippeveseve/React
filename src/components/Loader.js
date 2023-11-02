import React from "react";

const Loader = ({ size = "lg" }) => {
  const sizes = {
    sm: "2rem",
    lg: "4rem",
  };

  const loaderSize = sizes[size] || sizes["lg"];

  return (
    <div
      className="spinner-border text-warning"
      style={{ width: loaderSize, height: loaderSize }}
      role="status"
    >
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};

export default Loader;
