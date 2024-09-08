import React from "react";
import { Login as LoginComponent } from "../components/index";

function Login() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Login
        </h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
