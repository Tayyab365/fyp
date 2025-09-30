import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#0F172A] text-white shadow">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Left: Hamburger (Mobile) + Logo */}
        <div className="flex items-center space-x-4">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
          <NavLink to="/" className="text-xl font-bold">
            My Store
          </NavLink>
        </div>

        {/* Center: Nav Links (Desktop only) */}
        <ul className="hidden md:flex space-x-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#3B82F6] font-semibold"
                  : "hover:text-[#3B82F6]"
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
                  ? "text-[#3B82F6] font-semibold"
                  : "hover:text-[#3B82F6]"
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
                  ? "text-[#3B82F6] font-semibold"
                  : "hover:text-[#3B82F6]"
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
                  ? "text-[#3B82F6] font-semibold"
                  : "hover:text-[#3B82F6]"
              }
            >
              About
            </NavLink>
          </li>
        </ul>

        {/* Right: Search + Cart + Login (Always visible) */}
        <div className="flex items-center space-x-3 w-auto">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 rounded text-black max-w-[200px] md:max-w-xs"
          />
          <NavLink to="/cart" className="relative text-2xl hover:text-[#3B82F6]">
            🛒
          </NavLink>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-blue-700 px-3 py-1 rounded"
                : "bg-blue-600 px-3 py-1 rounded hover:bg-blue-700"
            }
          >
            Login
          </NavLink>
        </div>
      </div>

      {/* Mobile Menu (only nav links) */}
      {isOpen && (
        <div className="md:hidden bg-[#1E293B] px-4 py-4 space-y-3">
          <NavLink
            to="/"
            className="block hover:text-[#3B82F6]"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className="block hover:text-[#3B82F6]"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </NavLink>
          <NavLink
            to="/contact"
            className="block hover:text-[#3B82F6]"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </NavLink>
          <NavLink
            to="/about"
            className="block hover:text-[#3B82F6]"
            onClick={() => setIsOpen(false)}
          >
            About
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
