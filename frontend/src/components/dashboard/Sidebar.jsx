import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const links = [
    {
      path: "/dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      path: "/dashboard/products",
      label: "Products",
      icon: <Package size={18} />,
    },
    {
      path: "/dashboard/orders",
      label: "Orders",
      icon: <ShoppingCart size={18} />,
    },
    { path: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
  ];

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* 🔹 Mobile Hamburger */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
      >
        <Menu size={20} />
      </button>

      {/* 🔹 Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar Container */}
      <div
        className={`bg-white border-r border-gray-200 p-5 h-full transition-transform duration-300 
        md:translate-x-0 md:static md:block
        ${
          isOpen
            ? "translate-x-0 fixed top-0 left-0 z-50 w-64 h-screen"
            : "-translate-x-full"
        } 
        md:w-64 md:h-[calc(100vh-60px)] md:fixed md:top-[60px] md:left-0 shadow-sm`}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Sidebar Links */}
        <nav className="space-y-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-blue-50 hover:text-blue-700 text-gray-700"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 🔹 Logout Button */}
        <div className="mt-8 border-t pt-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-red-600 font-semibold hover:text-red-700 px-4 py-2 rounded-lg hover:bg-red-50 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
