import React from "react";

const Sidebar = ({setSelectedCategory}) => {
  
  const categories = ["All", "keyboard", "Mouse", "Headset", "Laptop", "Monitors"];


  return (
    <div>
      
      <div className="hidden md:block w-64 h-screen sticky top-20 border-r border-gray-200 px-6 py-10 mt-12">
        <h2 className="text-xl font-bold text-[#1E293B] mb-6">Categories</h2>
        <ul className="space-y-3 text-[#475569] text-md">
          {categories.map((cat, i) => (
            <li
              key={i}
              className="cursor-pointer hover:text-[#2563EB]"
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:hidden bg-white px-4 py-6">
        <h2 className="text-lg font-bold text-[#1E293B] mb-4">Categories</h2>
        <div className="grid grid-cols-2 gap-3">
          {categories.map((cat, i) => (
            <button
              key={i}
              className="py-2 px-3 rounded-lg bg-gray-100 text-[#1E293B] text-sm hover:bg-[#2563EB] hover:text-white transition"
              onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
