import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import { cartContext } from "../../Context/CartContext";

const ProductCard = ({ selectedCategory }) => {
  const { products, loading } = useProducts();
  const [sortOptions, setSortOptions] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);
  const { dispatch } = useContext(cartContext);

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  if (loading)
    return (
      <p className="mt-24 text-gray-600 dark:text-[#b3b3b3] text-center">
        Loading products...
      </p>
    );

  const filteredCategories =
    selectedCategory === "All"
      ? [...products]
      : products.filter(
          (item) =>
            item.category &&
            item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );

  if (sortOptions === "lowToHigh") {
    filteredCategories.sort((a, b) => a.price - b.price);
  } else if (sortOptions === "highToLow") {
    filteredCategories.sort((a, b) => b.price - a.price);
  }

  const visibleProducts = filteredCategories.slice(0, visibleCount);

  return (
    <div className="px-4 md:px-10 bg-[#F8FAFC] dark:bg-[#000000] transition-colors duration-300">
      <div className="flex flex-col md:flex-row justify-between pt-10 my-6 items-center gap-4">
        <h3 className="!text-2xl md:text-4xl font-bold text-[#1E293B] dark:text-[#ffffff] text-center md:text-left">
          Shop All Products
        </h3>
        <select
          value={sortOptions}
          onChange={(e) => setSortOptions(e.target.value)}
          className="text-sm w-full md:w-48 border border-gray-300 dark:border-[#2a2a3a] rounded-lg p-2 bg-white dark:bg-[#1a1a24] text-[#1E293B] dark:text-[#b3b3b3] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        >
          <option value="">Default</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white dark:bg-[#1a1a24] rounded-lg shadow-md dark:shadow-black/50 hover:shadow-xl dark:hover:shadow-black/70 transition-transform duration-300 hover:-translate-y-2 p-5 flex flex-col border border-[#E2E8F0] dark:border-[#2a2a3a]"
          >
            <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white dark:bg-[#1a1a24]">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-full max-w-full object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col flex-grow justify-between">
              <h3 className="text-sm md:text-base font-semibold text-[#1E293B] dark:text-[#ffffff] line-clamp-2 min-h-[44px]">
                {product.name}
              </h3>

              <p className="text-[#2563EB] font-bold !text-lg md:text-xl mt-2">
                ${product.price}
              </p>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => addToCart(product)}
                className="w-full sm:flex-1 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold text-sm md:text-md hover:bg-[#1D4ED8] transition"
              >
                Add to Cart
              </button>
              <Link
                to={`/product-details/${product._id}`}
                className="w-full sm:flex-1 py-1.5 text-center rounded-lg bg-white dark:bg-transparent border border-[#2563EB] text-[#2563EB] font-semibold text-sm md:text-md hover:bg-[#2563EB] hover:text-white transition"
              >
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < filteredCategories.length && (
        <div className="text-center my-10">
          <button
            onClick={() => setVisibleCount(visibleCount + 9)}
            className="px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1D4ED8] transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
