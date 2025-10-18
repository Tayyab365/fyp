import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { useProduct } from "../../hooks/useProduct";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(cartContext);
  const { product, loading, error } = useProduct();

  const API_URL = "http://localhost:5000/api/products";

  const addToCart = (product) => {
    dispatch({ type: "ADD_ITEM", payload: product });
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        const list = Array.isArray(data) ? data : data.products;
        setProducts(list.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-12 px-4 md:px-6">
      <div className="container mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-10 text-center">
          Featured Products
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 p-5 flex flex-col border border-[#E2E8F0] h-full"
            >
              <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <h3 className="text-sm md:text-base font-semibold text-[#1E293B] line-clamp-2 min-h-[44px]">
                  {product.name}
                </h3>

                <p className="text-[#2563EB] font-bold !text-lg md:text-xl mt-2">
                  ${product.price}
                </p>
              </div>
              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => addToCart(product)}
                  className="w-full sm:flex-1 py-1.5 rounded-lg bg-[#2563EB] text-white font-semibold text-sm md:text-base hover:bg-[#1D4ED8] transition"
                >
                  Add to Cart
                </button>
                <Link
                  to={`/product-details/${product._id}`}
                  className="w-full sm:flex-1 py-1.5 text-center rounded-lg bg-white border border-[#2563EB] text-[#2563EB] font-semibold text-sm md:text-base hover:bg-[#2563EB] hover:text-white transition"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
