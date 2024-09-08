import React from "react";
import { Signup as SignupComponent } from "../components/index";

function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-center text-2xl font-bold text-cyan-500 mb-6">
          Sign Up
        </h2>
        <SignupComponent />
      </div>
    </div>
  );
}

export default Signup;
