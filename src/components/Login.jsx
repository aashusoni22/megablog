import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center  min-h-44 bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-8 border border-gray-200">
        <div className="flex justify-center mb-6">
          <Logo width="60px" />
        </div>
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-4">
          Sign In
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-teal-500 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit(login)}>
          <div className="space-y-4">
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
              Sign In
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
