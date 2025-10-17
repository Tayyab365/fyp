import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import toast from "react-hot-toast";

const AddProduct = ({ onClose }) => {
  const { addProduct } = useProducts();

  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(form);
      // reset only after successful add
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        image: "",
        description: "",
      });
      onClose();
    } catch (err) {
      // addProduct already shows a toast; still keep console for debugging
      console.error("Add product failed:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Add New Product
        </h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Title"
            value={form.name ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description ?? ""}
            onChange={handleChange}
            className="w-full border p-2 rounded min-h-20"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
