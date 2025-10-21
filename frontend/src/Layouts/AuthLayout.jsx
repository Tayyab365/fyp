import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <Outlet /> {/* Nested page (Login/Signup) renders here */}
      </div>
    </div>
  );
};

export default AuthLayout;
