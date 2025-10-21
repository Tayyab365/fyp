import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 px-4 sm:px-6 md:px-12 py-3 flex justify-between items-center">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        {/* 🔹 Same Hamburger Style as Main Navbar */}
        <button onClick={onMenuClick} className="md:hidden text-2xl">
          ☰
        </button>

        {/* 🔹 Logo */}
        <NavLink to="/" className="text-2xl font-bold text-[#2563EB]">
          <span className="text-black">Shop</span>Ease
        </NavLink>
      </div>

      {/* Right: Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#2563EB] text-white px-4 py-2 rounded-lg hover:bg-[#1D4ED8] transition text-sm"
      >
        Back to Website
      </button>
    </div>
  );
};

export default Topbar;
