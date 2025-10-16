import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useContext(cartContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const uniqueProducts = cartItems.length;

  // ✅ Load user from localStorage (on refresh bhi login info rahe)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="text-sm w-full fixed top-0 left-0 z-50 bg-white text-[#1E293B] shadow-sm">
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

          {/* ✅ Dashboard only for Admin */}
          {user?.role === "Admin" && (
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                    : "hover:text-[#2563EB] transition"
                }
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right Section */}
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

          {/* ✅ Show Login OR Logout */}
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
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded-lg font-semibold text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
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

          {/* ✅ Dashboard for Admin (Mobile View) */}
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
