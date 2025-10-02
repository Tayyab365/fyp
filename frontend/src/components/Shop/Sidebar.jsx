import React from "react";

const Sidebar = () => {
  return (
    <div className="px-10 py-20">
      <h2 className="text-xl font-bold text-[#1E293B] text-center mb-6">Categories</h2>
      <div className="mb-6">
        <ul className="space-y-2 text-[#475569] text-md">
          <li className="cursor-pointer hover:text-[#2563EB]">Keyboards</li>
          <li className="cursor-pointer hover:text-[#2563EB]">Mouse</li>
          <li className="cursor-pointer hover:text-[#2563EB]">Headsets</li>
          <li className="cursor-pointer hover:text-[#2563EB]">Laptops</li>
        </ul>
      </div>

      
    </div>
  );
};

export default Sidebar;
