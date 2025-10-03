import React from "react";
import Sidebar from "../components/Shop/Sidebar";
import ProductCard from "../components/shop/ProductCard";

const Shop = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-64 w-full md:h-screen sticky top-0 bg-white border-r border-gray-200">
        <Sidebar />
      </div>
      <div className="flex-1 py-6">
        <ProductCard />
      </div>
    </div>
  );
};

export default Shop;
