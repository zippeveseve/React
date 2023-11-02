import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => (
  <div className="row my-5">
    {products.map((product) => (
      <div className="col-lg-3 col-md-4 my-5" key={product.id}>
        <ProductCard {...product} />
      </div>
    ))}
  </div>
);

export default ProductList;
