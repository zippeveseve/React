import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";
import Loader from "../Loader";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

function SignIn() {
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const fetchProducts = async (Cred) => {
    setLoading(true);
    try {
      axios
        .post("https://fakestoreapi.com/auth/login", Cred)
        .then((response) => {
          const token = response.data.token;
          toast.success("Login Sucessfully!");
          localStorage.setItem("token", token);
          history.push("/Products");
        })
        .catch((error) => {
          console.log("error: ", error);
          toast.error("User not found!");
        });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  //   fetch("https://fakestoreapi.com/auth/login", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       username: "mor_2314",
  //       password: "83r5^_",
  //     }),
  //   })
  // .then((res) => res.json())
  // .then((json) => console.log(json));

  const onSubmit = (Cred) => {
    // Handle form submission here
    console.log(Cred);
    fetchProducts(Cred);
  };

  return (
    <div className="container vh-100  my-auto d-flex justify-content-center align-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-50  border border-rounded p-3 h-75 d-flex flex-column justify-content-center "
      >
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Username
          </label>
          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                className="form-control p-3"
                id="username"
                {...field}
              />
            )}
          />
          {errors.username && (
            <p className="text-danger">{errors.username.message}</p>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <input
                type="password"
                className="form-control p-3"
                id="password"
                {...field}
              />
            )}
          />
          {errors.password && (
            <p className="text-danger ">{errors.password.message}</p>
          )}
        </div>
        <div className="w-100 d-flex justify-content-center mt-3 ">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-50 text-center p-2"
          >
            {loading ? "Loging In..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
