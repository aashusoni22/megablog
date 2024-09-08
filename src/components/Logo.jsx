import React from "react";
import logo from "../assets/logo.png";

function Logo({ width = "50px", title }) {
  return (
    <div className="flex items-center justify-center p-2">
      <img src={logo} alt="logo" style={{ width }} />{" "}
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
    </div>
  );
}

export default Logo;
