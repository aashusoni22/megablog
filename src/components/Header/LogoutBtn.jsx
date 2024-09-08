import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { handleLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(handleLogout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
