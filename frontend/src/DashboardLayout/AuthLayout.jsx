import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 px-4">
      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6 sm:p-8 w-full max-w-md">
        <Outlet /> {/* Nested page (Login/Signup) renders here */}
      </div>
    </div>
  );
};

export default AuthLayout;
