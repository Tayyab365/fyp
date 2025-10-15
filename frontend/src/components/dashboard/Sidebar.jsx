import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {/* 🔹 Hamburger (Left side of ShopEase, visible only on mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-2 rounded-md"
      >
        <Menu size={20} />
      </button>

      {/* 🔹 Overlay (when sidebar opens) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* 🔹 Sidebar */}
      <div
        className={`fixed top-[60px] left-0 h-[calc(100vh-60px)] w-64 bg-white border-r border-gray-200 p-5 z-50 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:block`}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-gray-600 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Sidebar Links */}
        <nav className="space-y-2 mt-5">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              onClick={() => setIsOpen(false)} // close sidebar when navigating (mobile)
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "hover:bg-blue-50 hover:text-blue-700"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
