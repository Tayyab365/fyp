import React from "react";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full bg-white shadow-sm px-6 py-3 flex justify-between items-center">
      <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        back to Website
      </button>
    </div>
  );
};

export default Topbar;
