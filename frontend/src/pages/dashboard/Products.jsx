import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { Edit2, Trash2 } from "lucide-react";

const Products = () => {
  const { products, loading, error, deleteProduct } = useProducts();
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  if (loading) return <p className="text-gray-600">Loading Products...</p>;
  if (error)
    return (
      <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
        {error}
      </p>
    );

  return (
    <div className=" bg-gray-50 min-h-screen space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-5 py-2.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition"
        >
          + Add Product
        </button>
      </div>
      {!loading && !error && (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
              <tr>
                <th className="py-3 px-5">#</th>
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
                  key={product.id}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="py-3 px-5 font-medium text-gray-800">
                    {index + 1}
                  </td>
                  <td className="py-3 px-5">{product.title}</td>
                  <td className="py-3 px-5">{product.category}</td>
                  <td className="py-3 px-5 font-semibold text-gray-700">
                    ${product.price}
                  </td>
                  <td className="py-3 px-5">
                    {product.stock ?? (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </td>
                  <td className="py-3 px-5 flex justify-center gap-3">
                    <button
                      onClick={() => setEditProduct(product)}
                      title="Edit Product"
                      className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition"
                    >
                      <Edit2 size={15} />
                      <span>Edit</span>
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      title="Delete Product"
                      className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 active:scale-95 shadow-sm transition"
                    >
                      <Trash2 size={15} />
                      <span>Delete</span>
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
              onClose={() => setEditProduct(null)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
