import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
  deleteProductAction,
} from "../../redux/actions/productsActions";
import Loader from "../Loader";
import ProductEdit from "./ProductEdit";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { productId } = useParams();

  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;

  const dispatch = useDispatch();
  const history = useHistory();
  const [loader, setLoader] = useState(false);

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  const deleteProduct = async () => {
    setLoader(true);
    try {
      await axios
        .delete(`https://fakestoreapi.com/products/${productId}`)
        .then(async () => {
          dispatch(deleteProductAction(productId));
          toast.success("Product deleted!");
          history.push("/products");
        });
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="container ">
      {Object.keys(product).length === 0 ? (
        <div className="d-flex vh-100  justify-content-center align-items-center">
          <Loader />
        </div>
      ) : (
        <div className="row  mt-5 py-5 border ">
          <div className="col col-lg-6 col-md-12">
            <img className="img-fluid" src={image} alt={title} />
          </div>
          <div className="col col-lg-6 col-md-12">
            <h1>{title}</h1>
            <h2>
              <p className="">${price}</p>
            </h2>
            <h4 className="border p-2 bg-secondary-subtle rounded mt-5">
              {category}
            </h4>
            <h5 className="border p-3 rounded">{description}</h5>
            <div className="d-flex mt-5  gap-5">
              <ProductEdit />
              <button className="btn btn-danger fs-18" onClick={deleteProduct}>
                {loader ? (
                  <Loader size="sm" />
                ) : (
                  <>
                    Delete <i className="fas fa-trash"></i>
                  </>
                )}{" "}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
