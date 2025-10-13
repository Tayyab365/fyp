import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <div className="w-64 bg-white shadow-sm sticky top-0 h-screen">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 z-10 bg-white">
          <Topbar />
        </div>

        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
