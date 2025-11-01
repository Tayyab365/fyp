import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Topbar = ({ onMenuClick }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-sm border-b border-transparent dark:border-[#2a2a3a] bg-white dark:bg-[#1a1a24] text-[#1E293B] dark:text-white transition-all duration-300 px-4 sm:px-6 md:px-8 py-3 flex justify-between items-center">
      {/* Left: Hamburger + Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden text-2xl hover:text-[#2563EB] dark:hover:text-[#2563EB] transition"
        >
          ☰
        </button>

        <NavLink
          to="/"
          className="text-2xl font-bold text-[#2563EB] hover:text-[#1D4ED8] transition"
        >
          <span className="text-black dark:text-white">Shop</span>Ease
        </NavLink>
      </div>

      {/* Right: Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-4 py-2 rounded-lg font-semibold text-sm transition"
      >
        Back to Website
      </button>
    </div>
  );
};

export default Topbar;
