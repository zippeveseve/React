import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addProducts } from "../../redux/actions/productsActions";
import ProductForm from "./ProductForm";

const ProductAdd = () => {
  const products = useSelector((state) => state.allProducts.products);

  const dispatch = useDispatch();
  const handleAddProduct = async (formData) => {
    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    await axios
      .post("https://fakestoreapi.com/products", formData)
      .then((response) => {
        let { id } = response.data;

        dispatch(addProducts({ id, ...formData }));
        toast.success("product added succesfulyy");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success btn-lg mx-4"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add New Product
      </button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product Form</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ProductForm onSubmit={handleAddProduct} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductAdd;
