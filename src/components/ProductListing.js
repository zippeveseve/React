import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/actions/productsActions";
import ProductComponent from "./ProductComponent";
import Loader from "./Loader";

const ProductPage = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(10); // Initial limit

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products?limit=${limit}`
      );
      dispatch(setProducts(response.data));
      setLimit(limit + 10);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return loading ? (
    <div
      className="d-flex  justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Loader />
    </div>
  ) : (
    <div className="container mt-5">
      <ProductComponent />
      <button
        className="btn btn-warning my-5 mx-auto text-center"
        onClick={fetchProducts}
        disabled={loading || limit === 25}
      >
        {limit === 25 ? "No more data to show" : "Load More"}
      </button>
    </div>
  );
};

export default ProductPage;
