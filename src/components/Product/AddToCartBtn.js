import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartActions";

const AddToCartBtn = ({ pid }) => {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const quantity = (id) => {
    let quantity = cart.find((product) => product.productId == id)?.quantity;
    return quantity ? quantity : 0;
  };

  return (
    <div className="mt-4 mb-2 w-100">
      <div className="float-right">
        {quantity(pid) !== 0 ? (
          <div className="d-flex align-items-center">
            <button
              onClick={() => dispatch(addToCart(pid))}
              className="btn btn-danger"
            >
              <i className="fas fa-plus"></i>
            </button>
            <h5 className="px-3 pt-2">{quantity(pid)}</h5>
            <button
              onClick={() => dispatch(removeFromCart(pid))}
              className="btn btn-danger"
            >
              <i className="fas fa-minus"></i>
            </button>
          </div>
        ) : (
          <button
            onClick={() => dispatch(addToCart(pid))}
            className="btn btn-danger"
          >
            Add to cart <i className="fas fa-shopping-cart"></i>{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default AddToCartBtn;
