import React, { useState, useRef } from "react";

const Sidebar = ({ setSelectedCategory }) => {
  const categories = [
    { label: "All", value: "All" },
    { label: "Laptop", value: "laptop" },
    { label: "Mouse", value: "mouse" },
    { label: "Keyboard", value: "keyboard" },
    { label: "Chair", value: "chair" },
    { label: "Light", value: "light" },
    { label: "Monitor", value: "monitor" },
    { label: "Console", value: "console" },
    { label: "Headset", value: "headset" },
    { label: "Graphic Card", value: "graphic-card" },
    { label: "Xbox", value: "xbox" },
  ];

  const [selected, setSelected] = useState("All");
  const detailsRef = useRef(null);

  return (
    <div className="bg-white dark:bg-[#1a1a24] md:w-64 md:sticky md:top-[60px] border-r border-gray-200 dark:border-[#2a2a3a] md:h-[calc(100vh-60px)] shadow-sm dark:shadow-black/40 px-6 pt-6 transition-colors duration-300">
      <h2 className="text-xl font-bold text-[#1E293B] dark:text-[#ffffff] mb-6">
        Categories
      </h2>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col">
        <div className="group max-h-[320px] overflow-y-auto pr-2 custom-scrollbar hover:overflow-y-auto">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelected(cat.label);
                  setSelectedCategory(cat.value);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selected === cat.label
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 dark:bg-[#252535] text-gray-700 dark:text-[#b3b3b3] hover:bg-blue-100 dark:hover:bg-[#0d0d12]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden bg-white dark:bg-[#1a1a24] px-4 py-4 border-t border-gray-200 dark:border-[#2a2a3a] transition-colors duration-300">
        <details
          ref={detailsRef}
          className="border border-gray-300 dark:border-[#2a2a3a] rounded-lg"
        >
          <summary className="p-3 font-semibold text-gray-800 dark:text-[#ffffff] cursor-pointer flex justify-between items-center">
            {selected}
            <span className="text-gray-500 dark:text-[#b3b3b3]">▼</span>
          </summary>

          <div className="flex flex-wrap gap-2 p-3 border-t border-gray-200 dark:border-[#2a2a3a]">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => {
                  setSelected(cat.label);
                  setSelectedCategory(cat.value);
                  if (detailsRef.current) detailsRef.current.open = false;
                }}
                className={`px-3 py-2 rounded-full text-sm transition-all duration-200 ${
                  selected === cat.label
                    ? "bg-[#2563EB] text-white"
                    : "bg-gray-100 dark:bg-[#252535] text-gray-700 dark:text-[#b3b3b3] hover:bg-blue-100 dark:hover:bg-[#0d0d12]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </details>
      </div>
    </div>
  );
};

export default Sidebar;
