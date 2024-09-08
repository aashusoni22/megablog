import React from "react";
import { Login as LoginComponent } from "../components/index";

function Login() {
  return (
    <div className=" justify-center items-center flex p-6 bg-gray-100">
      <div className="w-full max-w-md p-5 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">
          Login
        </h1>
        <LoginComponent />
      </div>
    </div>
  );
}

export default Login;
