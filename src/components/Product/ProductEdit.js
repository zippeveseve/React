import React from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { updateProduct } from "../../redux/actions/productsActions";

const ProductEdit = () => {
  let { image, title, price, category, description, id } = useSelector(
    (state) => state.product
  );
  let productData = { title, price, category, description };

  const history = useHistory();
  const dispatch = useDispatch();
  const handleAddProduct = (formData) => {
    // const formDataToSubmit = new FormData();
    // for (const key in formData) {
    //   formDataToSubmit.append(key, formData[key]);
    // }

    axios
      .post("https://fakestoreapi.com/products", formData)
      .then((response) => {
        console.log("response: ", response);
        dispatch(updateProduct({ id: id, ...formData }));
        history.push("/products");

        toast.success("updated successfully");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-success btn-lg fs-18 "
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Edit <i className="fas fa-edit"></i>
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
              <h5 className="modal-title">Edit Product Form</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <ProductForm
                isEdit={true}
                productData={productData}
                onSubmit={handleAddProduct}
                image={image}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductEdit;
