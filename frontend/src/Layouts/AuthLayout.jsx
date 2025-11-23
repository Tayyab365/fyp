import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="bg-[var(--bg-card)] shadow-lg rounded-2xl p-6 sm:px-8 sm:py-6 w-full max-w-md border border-[var(--border-color)]">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
