import React, { useState, useEffect } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Sun,
  Moon,
  PenLine,
  Home,
  BookOpen,
  User,
  FileText,
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  // Core navigation items
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
      icon: Home,
    },
    {
      name: "Explore",
      slug: "/all-posts",
      active: true,
      icon: BookOpen,
    },
    {
      name: "My Posts",
      slug: "/my-posts",
      active: authStatus,
      icon: FileText,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
      icon: User,
    },
    {
      name: "Sign Up",
      slug: "/signup",
      active: !authStatus,
      icon: User,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-sm"
          : "bg-white dark:bg-gray-900"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Logo width="35px" />
              <span className="text-lg font-semibold bg-gradient-to-r from-coral-500 to-coral-600 bg-clip-text text-transparent dark:from-coral-400 dark:to-coral-500">
                MegaBlog
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {/* Navigation Items */}
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-coral-600 dark:hover:text-coral-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  >
                    {item.icon && <item.icon size={18} />}
                    {item.name}
                  </button>
                )
            )}

            {/* Add Post Button - Made prominent */}
            {authStatus && (
              <button
                onClick={() => navigate("/add-post")}
                className="flex items-center gap-2 px-4 py-2 ml-2 text-sm font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 dark:from-coral-400 dark:to-coral-500 rounded-lg transition-all duration-200 shadow-sm hover:shadow focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                <PenLine size={18} />
                Write
              </button>
            )}

            {/* Logout Button */}
            {authStatus && <LogoutBtn />}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 py-2">
            <Container>
              <div className="flex flex-col gap-1 p-2">
                {navItems.map(
                  (item) =>
                    item.active && (
                      <button
                        key={item.name}
                        onClick={() => {
                          navigate(item.slug);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-coral-600 dark:hover:text-coral-400 transition-colors rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      >
                        {item.icon && <item.icon size={18} />}
                        {item.name}
                      </button>
                    )
                )}

                {authStatus && (
                  <>
                    <button
                      onClick={() => {
                        navigate("/add-post");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-4 py-2 mt-2 text-sm font-medium text-white bg-gradient-to-r from-coral-500 to-coral-600 hover:from-coral-600 hover:to-coral-700 dark:from-coral-400 dark:to-coral-500 rounded-lg transition-colors"
                    >
                      <PenLine size={18} />
                      Write a Post
                    </button>

                    <LogoutBtn />
                  </>
                )}
              </div>
            </Container>
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
