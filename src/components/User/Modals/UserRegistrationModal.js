import React from "react";

import UserForm from "../UserForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addUser } from "../../../redux/actions/userAction";

const UserRegistrationModal = ({ show, onHide }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const handleAddUser = async (formData) => {
    let payload = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      name: {
        firstname: formData.firstname,
        lastname: formData.lastname,
      },
      address: {
        city: formData.city,
        street: formData.street,
        number: formData.number,
        zipcode: formData.zipcode,
        geolocation: {
          lat: formData.lat,
          long: formData.long,
        },
      },
      phone: formData.phone,
    };

    await axios
      .post("https://fakestoreapi.com/users", JSON.stringify(payload))
      .then((response) => {
        dispatch(addUser({ id: response?.data?.id, ...payload }));

        history.push("/user");
        toast.success("User added!");
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const defaultValues = {
    email: "",
    username: "",
    phone: 0,
    firstname: "",
    password: "",
    lastname: "",
    city: "",
    street: "",
    number: "",
    zipcode: "",
    lat: "",
    long: "",
  };

  return (
    <div
      className={`modal${show ? " show" : ""}`}
      tabIndex="-1"
      role="dialog"
      style={{ display: show ? "block" : "none" }}
    >
      <div
        className="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header d-flex justify-content-center">
            <h2 className="modal-title ">User Registration</h2>
          </div>
          <div className="modal-body modal-dialog-scrollable">
            <UserForm
              onHide={onHide}
              onSubmit={handleAddUser}
              isEdit={false}
              defaultValues={defaultValues}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRegistrationModal;
