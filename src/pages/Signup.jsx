import React from "react";
import { Signup as SignupComponent } from "../components/index";

function Signup() {
  return (
    <div className="justify-center items-center flex p-6 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-5 text-gray-800">
          Sign Up
        </h1>
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
