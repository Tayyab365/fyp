import React from "react";
import Sidebar from "../components/Shop/Sidebar";
import ProductCard from "../components/shop/ProductCard";

const Shop = () => {
  return (
    <div className="flex">
      {/* Sidebar (fixed / sticky) */}
      <div className="w-64 h-screen sticky top-0 border-r border-gray-200 bg-white">
        <Sidebar />
      </div>

      {/* Product Grid (scrollable) */}
      <div className="flex-1 h-screen overflow-y-auto p-6">
        <ProductCard />
      </div>
    </div>
  );
};

export default Shop;
