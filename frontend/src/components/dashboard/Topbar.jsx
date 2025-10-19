import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center flex-wrap">
      {/* Left Side: Website name same as sidebar position */}
      <NavLink to="/" className="text-2xl font-bold text-blue-600">
        <span className="text-black">Shop</span>Ease
      </NavLink>

      {/* Right Side: Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm mt-2 sm:mt-0"
      >
        Back to Website
      </button>
    </div>
  );
};

export default Topbar;
