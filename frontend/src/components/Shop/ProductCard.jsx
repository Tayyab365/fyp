import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ProductCard = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const api_url = "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

  useEffect(() => {
    fetch(api_url)
    .then(res => res.json())
    .then(data => {
      setProducts(data)
      setLoading(false)
    })
    .catch(err => setError("Failed to load products"))
  }, [])

  if (loading) return <p className='text-center'>Loading products...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  return (
    <div className='px-10'>
      <div className='flex justify-between pt-10 items-center'>
        <h1 className='!text-3xl md:text-4xl font-bold text-[#1E293B] my-6 text-center'>Shop All Products</h1>
        <div>
          {/* <h3 className="text-lg font-semibold text-[#1E293B] mb-2">Sort By</h3> */}
          <select className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#2563EB]">
            <option value="">Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </div>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
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
              <h3 className="text-lg font-semibold text-[#1E293B] mb-2 line-clamp-2">{product.title}</h3>
              <div className="mt-auto">
                <p className="text-[#2563EB] font-bold text-xl mb-4">${product.price}</p>
                <div className='flex gap-6'>
                  <button className="flex-1 py-2 rounded-lg bg-[#2563EB] text-white font-semibold hover:bg-[#1D4ED8] transition">
                    Add to Cart
                  </button>
                  <Link to = {`/product-details/${product.id}`} className="flex-1 py-2 text-center rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] font-semibold text-white shadow-md transition">
                    View Product
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ProductCard;
