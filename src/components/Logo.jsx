import React from "react";
import logo from "../assets/logo.png";

function Logo({ width = "50px" }) {
  return (
    <div className="flex items-center justify-center p-2">
      <img src={logo} alt="logo" style={{ width }} />
    </div>
  );
}

export default Logo;
