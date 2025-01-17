import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../appwrite/auth";
import { User, Mail, Lock, AlertCircle } from "lucide-react";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [error, setError] = useState("");

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
      if (error.code === 409) {
        setError("A user with this email already exists.");
      } else {
        setError("An error occurred during signup. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 transition-all duration-300">
        {/* Logo and Title Section */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Link to="/" className="flex items-center gap-2">
              <Logo width="45px" />
              <span className="text-xl font-semibold bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent dark:from-coral-400 dark:to-coral-500">
                MegaBlog
              </span>
            </Link>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Create Your Account
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 p-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/10 rounded-lg">
            <AlertCircle size={18} />
            <p>{error}</p>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit(create)} className="space-y-6">
          <div className="space-y-4">
            {/* Full Name Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("name", {
                    required: "Full name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className="block w-full pl-10 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 dark:focus:ring-coral-400 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="email"
                  className="block w-full pl-10 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 dark:focus:ring-coral-400 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  type="password"
                  className="block w-full pl-10 px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-coral-500 dark:focus:ring-coral-400 focus:border-transparent dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Create a password"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 dark:from-coral-400 dark:to-coral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-coral-500 dark:focus:ring-offset-gray-900 transition-all duration-200"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Terms of Service */}
        <p className="text-xs text-center text-gray-600 dark:text-gray-400">
          By creating an account, you agree to our{" "}
          <Link
            to="/terms"
            className="text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            to="/privacy"
            className="text-coral-600 hover:text-coral-500 dark:text-coral-400 dark:hover:text-coral-300"
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
