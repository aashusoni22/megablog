import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount({
        email: data.email,
        password: data.password,
        name: data.name,
      });

      if (userData) {
        const loggedInUserData = await authService.login({
          email: data.email,
          password: data.password,
        });
        if (loggedInUserData) {
          dispatch(login(loggedInUserData));
          navigate("/");
        }
      }
    } catch (error) {
      // Check if the error is due to an existing email
      if (error.code === 409) {
        setError("A user with this email already exists.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-44 bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 border border-gray-200">
        <div className="flex justify-center mb-6">
          <Logo width="40px" />
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
          Create Your Account
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Full name is required",
              })}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <Button
              type="submit"
              className="w-full bg-teal-500 hover:bg-teal-600 text-white"
            >
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
