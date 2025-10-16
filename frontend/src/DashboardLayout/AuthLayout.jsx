import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <Outlet /> {/* yahan nested page (Login/Signup) render hota hai */}
      </div>
    </div>
  );
};

export default AuthLayout;
