import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components/index";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        dispatch(logout());
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, [dispatch]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        loading ? "bg-gray-100" : "bg-white"
      } transition-colors duration-300`}
    >
      {!loading && (
        <>
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
        </>
      )}
      {loading && (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <p className="loader"></p>
        </div>
      )}
    </div>
  );
}

export default App;
