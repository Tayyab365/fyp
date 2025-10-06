import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(cartContext);

  const api_url =
    "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-12 px-4 md:px-6">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-10">
          Featured Products
        </h2>

        {/* Product Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-2 p-5 flex flex-col border border-[#E2E8F0]">
              {/* Image */}
              <div className="h-40 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              </div>

              {/* Title */}
              <h3 className="text-sm md:text-base font-semibold text-[#1E293B] mb-2 line-clamp-2">
                {product.title}
              </h3>

              {/* Price & Button */}
              <div className="mt-auto">
                <p className="text-[#2563EB] font-bold text-lg md:text-xl mb-3">
                  ${product.price}
                </p>
                <button onClick={() => dispatch({type: "ADD_ITEM", payload: product})} className="w-full py-2 text-sm md:text-base rounded-lg bg-[#2563EB] text-white font-medium hover:bg-[#1D4ED8] transition">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
