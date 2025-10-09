import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingCart, Users } from "lucide-react";

const Sidebar = () => {
  const links = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
    { path: "/dashboard/products", label: "Products", icon: <Package size={18} /> },
    { path: "/dashboard/orders", label: "Orders", icon: <ShoppingCart size={18} /> },
    { path: "/dashboard/users", label: "Users", icon: <Users size={18} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-5 shadow-sm">
      <NavLink to="/" className="text-2xl px-5 font-bold text-blue-600 mb-8 block">
        <span className="text-black">Shop</span>Ease
      </NavLink>

      <nav className="space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
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
    </aside>
  );
};

export default Sidebar;
