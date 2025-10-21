import React, { useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { Edit2, Trash2 } from "lucide-react";

const Products = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  if (loading)
    return (
      <p className="text-gray-600 text-center mt-6">Loading Products...</p>
    );
  if (error)
    return (
      <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
        {error}
      </p>
    );

  return (
    <div className="bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex sm:flex-row items-start sm:items-center justify-between gap-3 px-2">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition text-sm sm:text-base"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="w-full text-sm text-left border-collapse min-w-[700px]">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-5">#</th>
                <th className="py-3 px-5">Image</th>
                <th className="py-3 px-5">Name</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5">Price</th>
                <th className="py-3 px-5">Stock</th>
                <th className="py-3 px-5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600">
              {products.map((product, index) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-5 text-gray-800 font-medium">
                    {index + 1}
                  </td>
                  <td className="py-3 px-5">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded border"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    ) : (
                      <span className="text-gray-400 italic">No image</span>
                    )}
                  </td>
                  <td className="py-3 px-5">{product.name}</td>
                  <td className="py-3 px-5 capitalize">{product.category}</td>
                  <td className="py-3 px-5 font-semibold text-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-3 px-5">
                    {product.stock ?? (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="py-6 px-5 flex justify-center gap-3">
                    <button
                      onClick={() => setEditProduct(product)}
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition text-xs sm:text-sm"
                    >
                      <Edit2 size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 active:scale-95 shadow-sm transition text-xs sm:text-sm"
                    >
                      <Trash2 size={14} />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <AddProduct onClose={() => setShowModal(false)} />}
      {editProduct && (
        <EditProduct
          product={editProduct}
          onClose={() => setEditProduct(null)}
        />
      )}
    </div>
  );
};

export default Products;
