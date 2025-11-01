import React, { useState } from "react";
import Sidebar from "../components/Shop/Sidebar";
import ProductCard from "../components/Shop/ProductCard.jsx";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div
        className="md:w-64 w-full md:h-screen sticky top-0 
                  bg-white dark:bg-[var(--bg-section-dark)] 
                  border-r border-gray-200 dark:border-[var(--border-color)]"
      >
        <Sidebar setSelectedCategory={setSelectedCategory} />
      </div>

      {/* Product Section */}
      <div className="flex-1 py-6 bg-white dark:bg-[var(--bg-page)] text-gray-900 dark:text-[var(--text-primary)]">
        <ProductCard selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Shop;
