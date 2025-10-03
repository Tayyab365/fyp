import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="text-sm w-full fixed top-0 left-0 z-50 bg-white text-[#1E293B] shadow">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        <div className="flex items-center space-x-4">
          <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
          <NavLink to="/" className="text-2xl font-bold text-[#2563EB] hover:text-[#1D4ED8] transition">
            <span className="text-black">Shop</span>Ease
          </NavLink>
        </div>
        <ul className="hidden md:flex space-x-8">
          <li>
            <NavLink to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"}>
              Contact
            </NavLink>
          </li>
          <li>
            <NavLink to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[#2563EB] font-semibold border-b-2 border-[#2563EB] pb-1"
                  : "hover:text-[#2563EB] transition"}>
              About
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center space-x-3 w-auto">
          {/* <input
            type="text"
            placeholder="Search"
            className="px-3 py-1 rounded-lg border border-[#CBD5E1] text-black max-w-[200px] md:max-w-xs focus:outline-none focus:ring-2 focus:ring-[#2563EB]"/> */}
          <NavLink
            to="/cart"
            className="relative text-2xl hover:text-[#2563EB] transition">
            🛒
          </NavLink>
          <NavLink to="/login"
            className={({ isActive }) =>
              isActive
                ? "bg-[#1D4ED8] px-4 py-2 rounded-lg font-semibold text-white"
                : "bg-[#2563EB] px-4 py-2 rounded-lg font-semibold text-white hover:bg-[#1D4ED8] transition"}>
            Login
          </NavLink>
        </div>
      </div>

      {/* Mobile View */}

      {isOpen && (
        <div className="md:hidden bg-[#F8FAFC] px-4 py-4 space-y-3 border-t border-[#E2E8F0]">
          <NavLink to="/"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/shop"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}>
            Shop
          </NavLink>
          <NavLink to="/contact"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}>
            Contact
          </NavLink>
          <NavLink to="/about"
            className="block hover:text-[#2563EB] transition"
            onClick={() => setIsOpen(false)}>
            About
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
