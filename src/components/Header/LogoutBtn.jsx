import React from "react";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { handleLogout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

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
      className="flex items-center gap-2 px-4 py-2 mt-1 text-sm font-medium text-coral-600 dark:text-coral-400 border border-coral-200 dark:border-coral-800 rounded-lg hover:bg-coral-50 dark:hover:bg-coral-900/20 transition-colors"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
