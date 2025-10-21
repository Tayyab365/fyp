import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import useTheme from "../../hooks/useTheme";
import {
  CircleUserRound,
  LogOut,
  Moon,
  LayoutDashboard,
  User,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const uniqueProducts = cartItems.length;

  // ✅ Load user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="text-sm w-full fixed top-0 left-0 z-50 bg-white text-[#1E293B] shadow-sm ">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
          <NavLink
            to="/"
            className="text-2xl font-bold text-[#2563EB] hover:text-[#1D4ED8] transition"
          >
            <span className="text-black">Shop</span>Ease
          </NavLink>
        </div>

        {/* Center Links */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"
              }
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"
              }
            >
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-3 w-auto">
          {/* 🛒 Cart */}
          <NavLink
            to="/cart"
            className="relative text-2xl hover:text-[#2563EB] transition"
          >
            🛒
            {uniqueProducts > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {uniqueProducts}
              </span>
            )}
          </NavLink>

          {/* 👤 Profile / Login */}
          {!user ? (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? "bg-[#1D4ED8] px-4 py-2 rounded-lg font-semibold text-white"
                  : "bg-[#2563EB] px-4 py-2 rounded-lg font-semibold text-white hover:bg-[#1D4ED8] transition"
              }
            >
              Login
            </NavLink>
          ) : (
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <User className="w-6 h-6 text-gray-700" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg overflow-hidden z-50 border border-gray-100">
                  <ul className="text-sm text-gray-700">
                    <li
                      onClick={() => {
                        navigate("/profile");
                        setIsDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      My Profile
                    </li>

                    {/* ✅ Admin Dashboard option */}
                    {user?.role === "Admin" && (
                      <li
                        onClick={() => {
                          navigate("/dashboard");
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                      >
                        <LayoutDashboard className="w-4 h-4" /> Dashboard
                      </li>
                    )}

                    <button
                      onClick={toggleTheme}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {theme === "light" ? (
                        <span className="flex items-center gap-2">
                          <Moon size={16} /> Dark Mode
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Sun size={16} /> Light Mode
                        </span>
                      )}
                    </button>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-500 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#F8FAFC] px-4 py-4 space-y-3 border-t border-[#E2E8F0]">
          <NavLink
            to="/"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          {/* ✅ Admin Dashboard for Mobile */}
          {user?.role === "Admin" && (
            <NavLink
              to="/dashboard"
              className="block hover:text-[#2563EB] transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
