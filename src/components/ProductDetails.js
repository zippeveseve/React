import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom"; // Import useHistory from react-router-dom
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productsActions";

const ProductDetails = () => {
  const { productId } = useParams();
  let product = useSelector((state) => state.product);
  const { image, title, price, category, description } = product;
  const dispatch = useDispatch();
  const history = useHistory(); // Add useHistory

  const fetchProductDetail = async (id) => {
    const response = await axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .catch((err) => {
        console.log("Err: ", err);
      });
    dispatch(selectedProduct(response.data));
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      dispatch(removeSelectedProduct());
      history.push("/"); // Redirect to the home page or any other page after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    if (productId && productId !== "") fetchProductDetail(productId);
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
        <div className="row mt-5 py-5 border ">
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
              <button className="btn btn-success fs-18">
                Edit <i className="fas fa-edit"></i>
              </button>
              <button
                className="btn btn-danger fs-18"
                onClick={deleteProduct} // Call the delete function on click
              >
                Delete <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
