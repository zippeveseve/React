import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteCartItemAction, userCart } from "../redux/actions/cartActions";
import SortButton from "./Sort";

const Cart = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  let { cart } = useSelector((state) => state.cart);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loader, setLoader] = useState(false);


  const fetchCartItems = async (id) => {
    setLoader(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/carts`);
      const cartItems = response?.data || [];
      const productDetailsPromises = [];

      cartItems.forEach((item) => {
        productDetailsPromises.push(
          ...item.products.map(async (product, index) => {
            const productResponse = await axios.get(
              `https://fakestoreapi.com/products/${product.productId}`
            );
            return {
              id: item.id,
              dummyID: index,
              product: productResponse.data,
              quantity: product.quantity,
            };
          })
        );
      });

      const payload = await Promise.all(productDetailsPromises);

      setLoader(false);
      console.log({ payload });

      dispatch(userCart(payload));
    } catch (err) {
      setLoader(false);
      console.log("Err: ", err);
    }
  };

  console.log({ cart });

  const deleteCartItem = async (id, index) => {
    try {
      const response = await axios.delete(
        `https://fakestoreapi.com/carts/${id}`
      );
      if (response.status === 200) {
        dispatch(deleteCartItemAction(index));
      }
    } catch (err) {
      console.log("Err: ", err);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);
  useEffect(() => {
    if (cart.length > 0) {
      setFilteredItems(cart);
    }
  }, [cart]);
  const decrement = (index) => {
    const updatedItems = [...filteredItems];
    updatedItems[index].quantity -= 1;
    setFilteredItems(updatedItems);
  };
  const increment = (index) => {
    const updatedItems = [...filteredItems];
    updatedItems[index].quantity += 1;
    setFilteredItems(updatedItems);
  };

  return (
    <div className="container-fluid px-4 px-lg-5 pb-5">
      <div className="row d-flex text-center py-4 justify-content-center">
        <h4>
          <strong>Shopping Cart</strong>
        </h4>
        <button className="btn btn-primary " onClick={handleShowModal}>
          Add user
        </button>
      </div>
      <SortButton list={filteredItems} onSort={setFilteredItems} title="Cart" />
      <div className="row  d-none d-md-flex justify-content-between my-3 ">
        <div className="col col-6">
          <p className="cart_labels text-capitalize">Item</p>
        </div>
        <div className="col col-6">
          <div className="row">
            <div className="col col-4">
              <p className="cart_labels text-center text-capitalize">
                quantity
              </p>
            </div>
            <div className="col col-4">
              <p className="cart_labels text-center text-capitalize">
                price each
              </p>
            </div>
            <div className="col col-4">
              <p className="cart_labels text-center text-capitalize">
                total Price
              </p>
            </div>
          </div>
        </div>
      </div>
      {!loader ? (
        filteredItems?.map((item, index) => {
          return (
            <div className="card cart_card mb-3 px-3" key={index}>
              <div className="row d-flex flex-column flex-md-row justify-content-between my-3 align-items-center">
                <div className="col col-12 col-md-6 d-flex justify-content-between align-items-center">
                  <div className="product-image">
                    <img src={item?.product?.image} className="w-100" />
                  </div>
                  <div className="product-details mx-2">
                    <div className="product-title mb-2">
                      <strong>{item?.product?.title}</strong>
                    </div>
                    <p className="product-description">
                      {item?.product?.description}
                    </p>
                  </div>
                </div>
                <div className="col col-12 col-md-6">
                  <div className="row flex-column flex-md-row my-3 my-md-0">
                    <div className="col col-8 col-md-4 d-flex justify-content-around d-md-block">
                      <p className="cart_labels text-center text-capitalize d-md-none">
                        quantity
                      </p>
                      <p className=" text-center">
                        <span
                          className="mx-2"
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() => decrement(index)}
                        >
                          -
                        </span>
                        {item?.quantity}
                        <span
                          className="mx-2"
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                            cursor: "pointer",
                          }}
                          onClick={() => increment(index)}
                        >
                          +
                        </span>
                      </p>
                    </div>
                    <div className="col col-8 col-md-4 d-flex  justify-content-around d-md-block">
                      <p className="cart_labels text-center text-capitalize d-md-none">
                        price each
                      </p>
                      <p className=" text-center">{item?.product?.price}</p>
                    </div>
                    <div className="col col-8 col-md-4 d-flex justify-content-around d-md-block">
                      <p className="cart_labels text-center text-capitalize d-md-none">
                        Total
                      </p>
                      <p className=" text-center">
                        {item?.product?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="remove_cart_item"
                onClick={() => deleteCartItem(item?.id, index)}
              >
                &times;
              </div>
            </div>
          );
        })
      ) : (
        <div className="row justify-content-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
