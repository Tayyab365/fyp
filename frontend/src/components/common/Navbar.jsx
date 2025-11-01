import React, { useContext, useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import useTheme from "../../hooks/useTheme";
import { LogOut, Moon, LayoutDashboard, User, Sun } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const { theme, toggleTheme } = useTheme();

  const uniqueProducts = cartItems.length;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    setUser(null);
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="text-sm w-full fixed top-0 left-0 z-50 bg-white dark:bg-[#1a1a24] text-[#1E293B] dark:text-white shadow-sm dark:shadow-black/50 border-b border-transparent dark:border-[#2a2a3a] transition-all duration-300">
      <div className="flex items-center justify-between px-4 py-3 md:px-4">
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
            <span className="text-black dark:text-white">Shop</span>Ease
          </NavLink>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition dark:text-[#b3b3b3] dark:hover:text-[#2563EB]"
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
                  : "hover:text-[#2563EB] transition dark:text-[#b3b3b3] dark:hover:text-[#2563EB]"
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
                  : "hover:text-[#2563EB] transition dark:text-[#b3b3b3] dark:hover:text-[#2563EB]"
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
                  : "hover:text-[#2563EB] transition dark:text-[#b3b3b3] dark:hover:text-[#2563EB]"
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center space-x-3 w-auto">
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

          {/* Profile Dropdown (Always visible) */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#252535] transition"
            >
              <User className="w-6 h-6 text-gray-700 dark:text-[#b3b3b3]" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-[#252535] shadow-lg dark:shadow-black/50 rounded-lg overflow-hidden z-50 border border-gray-100 dark:border-[#2a2a3a]">
                <ul className="text-sm text-gray-700 dark:text-[#b3b3b3]">
                  {!user ? (
                    <div>
                      <button
                        onClick={toggleTheme}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a3a] transition"
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
                      <button
                        onClick={() => {
                          navigate("/login");
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-[#2563EB] hover:bg-gray-100 dark:hover:bg-[#2a2a3a] transition flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4 rotate-180" /> Login
                      </button>
                    </div>
                  ) : (
                    <>
                      <li
                        onClick={() => {
                          navigate("/profile");
                          setIsDropdownOpen(false);
                        }}
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a3a] cursor-pointer transition"
                      >
                        My Profile
                      </li>

                      {user?.role === "Admin" && (
                        <li
                          onClick={() => {
                            navigate("/dashboard");
                            setIsDropdownOpen(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-[#2a2a3a] cursor-pointer flex items-center gap-2 transition"
                        >
                          <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </li>
                      )}

                      <button
                        onClick={toggleTheme}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-[#2a2a3a] transition"
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
                        className="px-4 py-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-[#2a2a3a] cursor-pointer flex items-center gap-2 transition"
                      >
                        <LogOut className="w-4 h-4" /> Logout
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#F8FAFC] dark:bg-[#252535] px-4 py-4 space-y-3 border-t border-[#E2E8F0] dark:border-[#2a2a3a] transition-colors duration-300">
          <NavLink
            to="/"
            className="block hover:text-[#2563EB] transition dark:text-[#b3b3b3]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="block hover:text-[#2563EB] transition dark:text-[#b3b3b3]"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className="block hover:text-[#2563EB] transition dark:text-[#b3b3b3]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className="block hover:text-[#2563EB] transition dark:text-[#b3b3b3]"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>

          {user?.role === "Admin" && (
            <NavLink
              to="/dashboard"
              className="block hover:text-[#2563EB] transition dark:text-[#b3b3b3]"
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
