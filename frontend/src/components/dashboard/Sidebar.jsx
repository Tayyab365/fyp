import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  X,
  LogOut,
} from "lucide-react";

const Sidebar = ({ isOpen, onClose }) => {
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

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-[60px] left-0 w-64 h-[calc(100vh-60px)] 
        bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 
        shadow-sm z-50 transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800"
        >
          <X size={20} />
        </button>

        {/* Nav links */}
        <nav className="space-y-2 mt-8 px-2">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/dashboard"}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-700/30 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800"
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-4 px-2">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full text-red-600 dark:text-red-400 font-semibold hover:text-red-700 dark:hover:text-red-300 px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/30 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
