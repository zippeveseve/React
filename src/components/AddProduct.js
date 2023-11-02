import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

function AddProduct() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (formData) => {
    const formDataToSubmit = new FormData();
    formDataToSubmit.append("title", formData.title);
    formDataToSubmit.append("price", formData.price);
    formDataToSubmit.append("description", formData.description);
    formDataToSubmit.append("image", formData.image);
    formDataToSubmit.append("category", formData.category);

    axios
      .post("https://fakestoreapi.com/products", formDataToSubmit)
      .then((response) => {
        console.log(response.data);
        // Handle success or redirection here
      })
      .catch((error) => {
        console.error(error);
        // Handle error here
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Controller
                    name="title"
                    control={control}
                    render={({ field }) => (
                      <input type="text" className="form-control" {...field} />
                    )}
                  />
                  {errors.title && (
                    <p className="text-danger">{errors.title.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price</label>
                  <Controller
                    name="price"
                    control={control}
                    render={({ field }) => (
                      <input
                        type="number"
                        className="form-control"
                        {...field}
                      />
                    )}
                  />
                  {errors.price && (
                    <p className="text-danger">{errors.price.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <textarea className="form-control" {...field}></textarea>
                    )}
                  />
                  {errors.description && (
                    <p className="text-danger">{errors.description.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="image">Upload Product Image</label>
                  <Controller
                    name="image"
                    control={control}
                    render={({ field }) => (
                      <input type="file" className="form-control" {...field} />
                    )}
                  />
                  {errors.image && (
                    <p className="text-danger">{errors.image.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <input type="text" className="form-control" {...field} />
                    )}
                  />
                  {errors.category && (
                    <p className="text-danger">{errors.category.message}</p>
                  )}
                </div>
                <div className="d-flex w-100 justify-content-end my-3">
                  <button
                    type="button"
                    class="btn btn-secondary mx-3"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProduct;
