import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const { cart } = useSelector((state) => state.cart);
  const [cartItem, setCartItems] = useState(0);

  useEffect(() => {
    const totalItem = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItems(totalItem);
  }, [cart]);

  if (location.pathname == "/") {
    return "";
  } else {
    return (
      <div className="container-fluid shadow-sm py-3 px-4">
        <div className=" d-flex justify-content-between">
          <h2>React Assigment</h2>
          <h4 className="cursor-pointer" onClick={() => history.push("/products")}>
            Products
          </h4>
          <h4 className="cursor-pointer" onClick={() => history.push("/user")}>
            User
          </h4>
          <div
            className="d-flex align-items-center cursor-pointer"
            onClick={() => history.push("/cart")}
          >
            <i className="fas fa-shopping-cart fa-2x position-relative">
              <span
                className="position-absolute bg-danger py-1 px-2  rounded-circle text-white"
                style={{ fontSize: "11pt", left: 20, top: -10 }}
              >
                {cartItem}
              </span>
            </i>
          </div>
        </div>
      </div>
    );
  }
};

export default Header;
