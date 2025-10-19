import React from "react";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-screen">
      {/* 🔹 Fixed Topbar */}
      <div className="fixed top-0 left-0 w-full z-40">
        <Topbar />
      </div>

      {/* 🔹 Sidebar + Content Area */}
      <div className="flex pt-[72px]">
        {/* Sidebar (sticky like shop sidebar) */}
        <div className="hidden md:block w-64 h-[calc(100vh-72px)] sticky top-[72px]">
          <Sidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6 md:ml-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
