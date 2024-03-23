import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let navigate = useNavigate();
  let [err, setErr] = useState("");
  async function handleFormSubmit(userObj) {
    // console.log(userObj);
    // make http post request
    let res = await axios.post("http://localhost:4000/user-api/user", userObj);
    console.log(res);
    console.log(res.data.message);
    if (res.data.message === "user created") {
      //navigate to login
      navigate("/signin");
    } else {
      setErr(res.data.message);
    }
  }
  return (
    <div className="top">
      <div className="d-flex cols-2" style={{ minWidth: "100%" }}>
        {/* Left Column */}
        <div style={{ minWidth: "35%", height: "100vh" }}>
          {/* Add your image here */}
          <img
            src="https://www.thimble.com/wp-content/uploads/2021/09/market-yourself-as-a-writer.jpg"
            alt="Your Image"
            style={{
              height: "100%",
              width: "100%",
              display: "block",
              margin: "auto",
            }}
            className="signup-image"
          />
        </div>
        {/* Right Column */}
        <div className=" sec" style={{ minWidth: "60%" }}>
          <div
            className="p-4 container cont d-flex justify-content-center align-items-center"
            style={{ height: "100vh" }}
          >
            <div style={{ width: "80%" }}>
              {" "}
              {/* Adjusted width */}
              <h1 className="mb-5">Create Account</h1>
              <form className="form" onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="d-flex justify-content-between cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="k form-control p-2 mb-3 m-2 highlighted-input"
                    style={{ fontSize: "1.1rem", width: "50%" }}
                    {...register("firstname", { required: true })}
                  />{" "}
                  {/* Adjusted width */}
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="k form-control p-2 mb-3  m-2 highlighted-input"
                    style={{ fontSize: "1.1rem", width: "55%" }}
                    {...register("lastname", { required: true })}
                  />{" "}
                  {/* Adjusted width */}
                </div>
                <div className="d-flex justify-content-start cols-2 mt-0">
                  {errors.firstname?.type === "required" && (
                    <p className="mx-2 text-danger">First name is required</p>
                  )}
                  {errors.lastname?.type === "required" && (
                    <p className="abc text-danger">Lastname is required</p>
                  )}
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  className="k form-control p-2 mx-2 mb-3 highlighted-input"
                  style={{ fontSize: "1.1rem", width: "98%" }}
                  {...register("username", { required: true })}
                />{" "}
                {/* Adjusted width */}
                {errors.username?.type === "required" && (
                  <p className="text-danger mx-2">Username is required</p>
                )}
                <input
                  type="email"
                  placeholder="Email"
                  className="k form-control p-2 mx-2 mb-3 highlighted-input"
                  style={{ fontSize: "1.1rem", width: "98%" }}
                  {...register("email", { required: true })}
                />{" "}
                {/* Adjusted width */}
                {errors.email?.type === "required" && (
                  <p className="text-danger mx-2">Email is required</p>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  className="k form-control p-2 mx-2 mb-3 highlighted-input"
                  style={{ fontSize: "1.1rem", width: "98%" }}
                  {...register("password", { required: true })}
                />{" "}
                {/* Adjusted width */}
                {errors.password?.type === "required" && (
                  <p className="text-danger mx-2">Password is required</p>
                )}
                {/* Add button to submit form */}
                <button
                  type="submit"
                  className="btn btn-dark p-2 m-2 mt-4"
                  style={{ fontSize: "1.1rem", width: "98%" }}
                >
                  Submit
                </button>{" "}
                {/* Adjusted width */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;