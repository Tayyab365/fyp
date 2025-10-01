import React, { useEffect, useState } from "react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  const api_url = "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

  useEffect(() => {
    fetch(api_url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, 4));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="bg-[#F8FAFC] py-16 px-6">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1E293B] mb-12">
          Featured Products
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2 p-6 flex flex-col border border-[#E2E8F0]">
              <div className="h-48 w-full mb-4 flex items-center justify-center overflow-hidden rounded-lg bg-white">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-full max-w-full object-contain rounded-lg"/>
              </div>
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2 line-clamp-2">
                {product.title}
              </h3>
              <div className="mt-auto">
                <p className="text-[#2563EB] font-bold text-xl mb-4">
                  ${product.price}
                </p>
                <button className="w-full py-2 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
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
