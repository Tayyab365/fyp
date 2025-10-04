import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { cartContext } from "../../Context/CartContext.";

const ProductCard = () => {
  const {products, loading} = useProducts();
  const { dispatch } = useContext(cartContext);

  const addToCart = (product) => {
    dispatch({type: "ADD_ITEM", payload: product})
  }

  if (loading) return <p className="font-bold text-xl mt-24 pl-24">Loading products...</p>;

  return (
    <div className="px-4 md:px-10">
      <div className="flex flex-col md:flex-row justify-between pt-10 my-6 items-center gap-4">
        <h3 className="!text-2xl md:text-4xl font-bold text-[#1E293B] text-center md:text-left">
          Shop All Products
        </h3>
        <select className="text-sm w-full md:w-48 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
          <option value="">Default</option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 p-5 flex flex-col border border-[#E2E8F0]">
            <div className="w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-gray-50 h-40 sm:h-48 md:h-56">
              <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain"/>
            </div>
            <h3 className="text-sm md:text-base font-semibold text-[#1E293B] mb-2 line-clamp-2">{product.title}</h3>
            <p className="text-[#2563EB] font-bold text-lg md:text-xl mb-4">${product.price}</p>
            <div className="flex flex-col sm:flex-row gap-2 mt-auto">
              <button onClick={() => addToCart(product)} className="w-full sm:flex-1 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold text-sm md:text-base hover:bg-[#1D4ED8] transition">
                Add to Cart
              </button>
              <Link
                to={`/product-details/${product.id}`}
                className="w-full sm:flex-1 py-1.5 text-center rounded-lg bg-white border border-[#2563EB] text-[#2563EB] font-semibold text-sm md:text-base hover:bg-[#2563EB] hover:text-white transition">
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
