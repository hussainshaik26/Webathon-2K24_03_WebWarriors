import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { compareSync } from "bcryptjs";
import "./Signin.css";

function Signin() {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleButton() {
    navigate("/main");
  }

  const handleFormSubmit = (userCredentialObj) => {
    fetch(`http://localhost:4000/users?userid=${userCredentialObj.userid}`)
      .then((res) => res.json())
      .then((userObj) => {
        if (
          userObj.length === 0 ||
          !compareSync(userCredentialObj.password, userObj[0].password)
        ) {
          console.error("Invalid User Id or Password");
        } else {
          // navigate(/main/${userCredentialObj.userid}, {
          //   state: userObj[0],
          // });
          navigate("/main");
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  return (
    <div className="container d-flex justify-content-center pt-5 mt-3">
      <div className="left-container1">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Your Image"
          className="image"
        />
      </div>
      <div className="right-container1">
        <div className="login-form">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-group">
              <label htmlFor="userid">User Id:</label>
              <input
                type="text"
                id="userid"
                {...register("userid", { required: true })}
                className="form-control"
                autoComplete="off"
              />
              {errors.userid && (
                <span className="error-message">User Id is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                {...register("password", { required: true })}
                className="form-control"
                autoComplete="off"
              />
              {errors.password && (
                <span className="error-message">Password is required</span>
              )}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              Login
            </button>
          </form>
        </div>
      </div>
      <button className="btn" onClick={handleButton}>
        Go to Main
      </button>
    </div>
  );
}

export default Signin;