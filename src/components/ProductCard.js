import React from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";

const ProductCard = ({ id, image, title, price, category }) => {
  return (
    <div className="ui link cards">
      <div className="card">
        <div className="image">
          <img src={image} alt={title} />
        </div>
        <div className="content">
          <div className="header">{title}</div>
          <div className="meta price">$ {price}</div>
          <div className="meta">{category}</div>
          <AddToCartBtn pid={id} />
        </div>
        
        <Link to={`/product/${id}`} class="btn btn-warning ">
          Go to Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
