import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-40 px-12 py-3 flex justify-between items-center">
      {/* Left Side: Website Name */}
      <NavLink to="/" className="text-2xl font-bold text-[#2563EB]">
        <span className="text-black">Shop</span>Ease
      </NavLink>

      {/* Right Side: Button */}
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
