import React, { useState } from "react";
import Sidebar from "../components/Shop/Sidebar";
import ProductCard from "../components/shop/ProductCard";
import { useLocation } from "react-router-dom";

const Shop = () => {
  const location = useLocation();
  const initialCategory = location.state?.category || "All";
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 w-full md:h-screen sticky top-0 bg-white border-r border-gray-200">
        <Sidebar setSelectedCategory={setSelectedCategory} />
      </div>
      <div className="flex-1 py-6">
        <ProductCard selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};

export default Shop;
