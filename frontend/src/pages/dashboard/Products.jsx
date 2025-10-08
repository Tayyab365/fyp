// src/pages/dashboard/Products.jsx
import React from "react";

const Products = () => {
  const products = [
    { id: 1, name: "Laptop", category: "Electronics", price: 1200, stock: 10 },
    { id: 2, name: "Shoes", category: "Fashion", price: 60, stock: 50 },
    { id: 3, name: "Headphones", category: "Electronics", price: 150, stock: 30 },
    { id: 4, name: "Backpack", category: "Accessories", price: 45, stock: 25 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          + Add Product
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Category</th>
              <th className="py-2 px-4">Price</th>
              <th className="py-2 px-4">Stock</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{product.name}</td>
                <td className="py-2 px-4">{product.category}</td>
                <td className="py-2 px-4">${product.price}</td>
                <td className="py-2 px-4">{product.stock}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
