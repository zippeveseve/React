import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  removeSelectedUser,
  selectedUser,
  updateUser,
} from "../../redux/actions/userAction";
import UserForm from "./UserForm";

const UserDetails = () => {
  const { userId } = useParams();
  let user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const fetchUserDetail = async (id) => {
    await axios
      .get(`https://fakestoreapi.com/users/${id}`)
      .then((response) => {
        dispatch(selectedUser(response.data));
      })
      .catch((err) => {
        console.log("Err: ", err);
      });
  };

  const handleUpdateUser = async (formData) => {
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
      .put(`https://fakestoreapi.com/users/${user.id}`, JSON.stringify(payload))
      .then((response) => {
        dispatch(updateUser({ id: user?.id, ...payload }));
        toast.success("updated successfully ");
        history.push("/user");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  useEffect(() => {
    if (userId && userId !== "") fetchUserDetail(userId);
    return () => {
      dispatch(removeSelectedUser());
    };
  }, [userId]);

  let defaultValues = {
    email: user?.email,
    username: user?.username,
    phone: user?.phone,
    firstname: user?.name?.firstname,
    lastname: user?.name?.lastname,
    password: user?.password,
    city: user?.address?.city,
    street: user?.address?.street,
    number: user?.address?.number,
    zipcode: user?.address?.zipcode,
    lat: user?.address?.geolocation?.lat,
    long: user?.address?.geolocation?.long,
  };

  return (
    <div className="ui grid container">
      {Object.keys(user).length === 0 && false ? (
        <div>...Loading</div>
      ) : (
        <div>
          {defaultValues.firstname && (
            <UserForm
              onSubmit={handleUpdateUser}
              defaultValues={defaultValues}
              isEdit={true}
              idToDeleteUser={user?.id}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDetails;
