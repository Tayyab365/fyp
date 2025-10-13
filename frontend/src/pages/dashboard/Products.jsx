import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const Products = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Product
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
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
                  <td className="py-2 px-4">{product.title}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">{product.stock ?? "N/A"}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button
                      onClick={() => setEditProduct(product)}
                      className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && <AddProduct onClose={() => setShowModal(false)} />}
          {editProduct && (
            <EditProduct
              product={editProduct}
              onClose={() => setEditProduct(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
