import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deleteCartItemAction } from "../../redux/actions/cartActions";
import { deleteUserAction } from "../../redux/actions/userAction";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("email is required"),
  phone: Yup.number().required("phone is required"),
  username: Yup.string().required("username is required").max(25),
  password: Yup.string().required("username is required").max(25),
  username: Yup.string().required("username is required").max(25),
  firstname: Yup.string().required("firstname is required").max(26),
  lastname: Yup.string().required("lastname is required").max(26),
  city: Yup.string().required("city is required"),
  street: Yup.string().required("street is required"),
  number: Yup.number().required("number is required"),
  zipcode: Yup.number("Enter Numbers only").required("zipcode is required"),
  lat: Yup.string().required("lat is required"),
  long: Yup.string().required("long is required"),
});

const UserForm = ({
  isEdit,
  onSubmit,
  onHide,
  defaultValues,
  idToDeleteUser,
}) => {
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const submitHandler = async (formData) => {
    onSubmit(formData);
  };
  const history = useHistory();

  const handleDelete = async (e) => {
    e.preventDefault();

    try {
      await axios
        .delete(`https://fakestoreapi.com/users/${idToDeleteUser}`)
        .then((response) => {
          dispatch(deleteUserAction(idToDeleteUser));
          history.push("/user");
          toast.success("Item deleted successfully");
        });
    } catch (error) {
      toast.error("error: ", error.message);
    }
    // onHide();
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="overflow-auto">
      <h3>{isEdit ? "Update User" : "Add User"}</h3>
      <div className="form-group my-2">
        <label htmlFor="title">Username</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <input type="text" className="form-control" {...field} />
          )}
        />
        {errors.username && (
          <p className="text-danger">{errors.username.message}</p>
        )}
      </div>
      <div className="row">
        <div className="col">
          {" "}
          <div className="form-group my-2">
            <label htmlFor="title">First Name</label>
            <Controller
              name="firstname"
              control={control}
              render={({ field }) => (
                <input type="text" className="form-control" {...field} />
              )}
            />
            {errors.firstname && (
              <p className="text-danger">{errors.firstname.message}</p>
            )}
          </div>{" "}
        </div>
        <div className="col">
          {" "}
          <div className="form-group my-2">
            <label htmlFor="title">Last Name</label>
            <Controller
              name="lastname"
              control={control}
              render={({ field }) => (
                <input type="text" className="form-control" {...field} />
              )}
            />
            {errors.lastname && (
              <p className="text-danger">{errors.lastname.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {" "}
          <div className="form-group my-2">
            <label htmlFor="price">Email</label>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <input type="email" className="form-control" {...field} />
              )}
            />
            {errors.email && (
              <p className="text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="col">
          {" "}
          <div className="form-group my-2">
            <label htmlFor="description">Phone</label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <input
                  type="number"
                  className="form-control"
                  {...field}
                ></input>
              )}
            />
            {errors.phone && (
              <p className="text-danger">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">City</label>
            <Controller
              name="city"
              control={control}
              render={({ field }) => (
                <input type="text" className="form-control" {...field} />
              )}
            />
            {errors.city && (
              <p className="text-danger">{errors.city.message}</p>
            )}
          </div>{" "}
        </div>
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">Street</label>
            <Controller
              name="street"
              control={control}
              render={({ field }) => (
                <input type="text" className="form-control" {...field} />
              )}
            />
            {errors.street && (
              <p className="text-danger">{errors.street.message}</p>
            )}
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">Number</label>
            <Controller
              name="number"
              control={control}
              render={({ field }) => (
                <input type="number" className="form-control" {...field} />
              )}
            />
            {errors.number && (
              <p className="text-danger">{errors.number.message}</p>
            )}
          </div>
        </div>
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">Post Code</label>
            <Controller
              name="zipcode"
              control={control}
              render={({ field }) => (
                <input type="number" className="form-control" {...field} />
              )}
            />
            {errors.zipcode && (
              <p className="text-danger">{errors.zipcode.message}</p>
            )}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">Lag</label>
            <Controller
              name="lat"
              control={control}
              render={({ field }) => (
                <input type="number" className="form-control" {...field} />
              )}
            />
            {errors.lat && <p className="text-danger">{errors.lat.message}</p>}
          </div>
        </div>
        <div className="col">
          <div className="form-group my-2">
            <label htmlFor="category">Lag</label>
            <Controller
              name="long"
              control={control}
              render={({ field }) => (
                <input type="number" className="form-control" {...field} />
              )}
            />
            {errors.long && (
              <p className="text-danger">{errors.long.message}</p>
            )}
          </div>{" "}
        </div>
      </div>

      {/* <div className="row"><div className="col"></div><div className="col"></div></div> */}

      <div className="form-group my-2">
        <label htmlFor="category">Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <input type="text" className="form-control" {...field} />
          )}
        />
        {errors.password && (
          <p className="text-danger">{errors.password.message}</p>
        )}
      </div>
      <div className="d-flex w-100 justify-content-end my-3">
        {!isEdit && (
          <button
            type="button"
            className="btn btn-secondary mx-3"
            onClick={onHide}
          >
            Cancel
          </button>
        )}

        {isEdit && (
          // <button
          //   type="button"
          //   className="btn btn-secondary mx-3"
          //   onClick={onHide}
          // >
          //   Delete
          // </button>
          <button
            type="button"
            className="btn btn-danger btn-lg mx-4"
            // data-bs-toggle="modal"
            // data-bs-target="#staticBackdrop"
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </button>
        )}
        {isEdit ? (
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        ) : (
          <button
            type="submit"
            data-bs-dismiss="modal"
            className="btn btn-primary"
          >
            Add
          </button>
        )}
      </div>
      {/* <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Delete Confirmation</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">Are u sure to Delete??</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger btn-lg mx-4"
                onClick={(e) => {
                  handleDelete(e);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </form>
  );
};

export default UserForm;
