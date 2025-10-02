import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(err => console.log(err));
  }, [id]);

  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-20 p-6 grid md:grid-cols-2 gap-10">
      <div className="flex items-center justify-center bg-gray-50 rounded-lg shadow-md p-6">
        <img
          src={product.image}
          alt={product.title}
          className="max-h-96 object-contain rounded-lg"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1E293B] mb-4">{product.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{product.description || "No description available."}</p>
          <p className="text-2xl font-bold text-[#2563EB] mb-6">${product.price}</p>
          <div className="flex items-center gap-4 mb-6">
            <label className="font-semibold">Quantity:</label>
            <input
              type="number"
              min="1"
              defaultValue="1"
              className="w-20 border rounded-lg px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex-1 py-3 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
            Add to Cart
          </button>
          <button className="flex-1 py-3 rounded-lg bg-gray-200 text-[#1E293B] font-semibold hover:bg-gray-300 transition">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
