import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../redux/actions/productsActions";
import Pagination from "../ListingComponents/Pagination";
import Loader from "../Loader";
import ProductComponent from "./ProductComponent";

const ProductPage = () => {
  let { products } = useSelector((state) => state.allProducts);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentList, setCurrentList] = useState([]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchProducts();
    }
  }, []);

  return loading ? (
    <div className="d-flex vh-100  justify-content-center align-items-center">
      <Loader />
    </div>
  ) : (
    <div className="container mt-5">
      <ProductComponent products={currentList} />
      <div className="d-flex w-100 justify-content-center">
        <Pagination data={products} perPage={4} onPageChange={setCurrentList} />
      </div>
    </div>
  );
};

export default ProductPage;
