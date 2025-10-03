import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6">
      {/* Layout */}
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left - Image */}
        <div className="flex items-center justify-center bg-white rounded-xl shadow-lg p-6">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[450px] object-contain transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right - Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.title}
            </h1>

            {/* Dummy Rating */}
            <div className="flex items-center mb-4">
              <span className="text-yellow-400">★★★★☆</span>
              <span className="ml-2 text-sm text-gray-500">(120 reviews)</span>
            </div>

            {/* Price */}
            <p className="text-3xl font-bold text-[#2563EB] mb-4">
              ${product.price}
            </p>

            {/* Features */}
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>High quality material</li>
              <li>1 Year Warranty</li>
              <li>Easy Return Policy</li>
            </ul>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <label className="font-semibold text-gray-700">Quantity:</label>
              <input
                type="number"
                min="1"
                defaultValue="1"
                className="w-20 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 py-3 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
              Add to Cart
            </button>
            <button className="flex-1 py-3 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Bottom - Description */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Product Description
        </h2>
        <p className="text-gray-600 leading-relaxed">
          {product.description || "No description available for this product."}
        </p>
      </div>
    </div>
  );
};

export default ProductDetails;
