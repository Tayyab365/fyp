import React, { useState } from "react";
import Topbar from "../components/dashboard/Topbar";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      {/* Topbar */}
      <Topbar
        onMenuClick={() => setSidebarOpen(true)}
      />

      {/* Sidebar + Main Content */}
      <div className="flex pt-[72px] relative">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 ml-0 md:ml-64  p-4 transition-all duration-300 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
