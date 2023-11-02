import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  price: Yup.number().required("Price is required"),
  description: Yup.string().required("Description is required"),
  image: Yup.mixed().required("Image is required"),
  category: Yup.string().required("Category is required"),
});

const ProductForm = ({ isEdit, productData, onSubmit, image }) => {
  let defaultValues = productData || {
    title: "",
    price: 0,
    description: "",
    image: null,
    category: "",
  };
  useEffect(() => {
    if (productData) {
      defaultValues = productData;
    }
  }, [productData]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const submitHandler = (formData) => {
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      {isEdit && (
        <div className="d-flex  ">
          <img className="img-fluid border w-25 mx-auto" src={image} />
        </div>
      )}
      <div className="form-group my-4">
        <label htmlFor="title">Title</label>
        <Controller
          name="title"
          control={control}
          render={({ field }) => (
            <input type="text" className="form-control" {...field} />
          )}
        />
        {errors.title && <p className="text-danger">{errors.title.message}</p>}
      </div>

      <div className="form-group my-4">
        <label htmlFor="price">Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input type="number" className="form-control" {...field} />
          )}
        />
        {errors.price && <p className="text-danger">{errors.price.message}</p>}
      </div>

      <div className="form-group my-4">
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

      <div className="form-group my-4">
        <label htmlFor="image">Upload Product Image</label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <input type="file" className="form-control" {...field} />
          )}
        />
        {errors.image && <p className="text-danger">{errors.image.message}</p>}
      </div>

      <div className="form-group my-4">
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
        <button type="button" className="btn btn-secondary mx-3">
          Cancel
        </button>
        <button
          type="submit"
          data-bs-dismiss="modal"
          className="btn btn-primary"
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
