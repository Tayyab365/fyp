import React, { useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
import toast from "react-hot-toast";

const EditProduct = ({ onClose, product }) => {
  const { updateProduct } = useProducts();

  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || "",
    category: product?.category || "",
    stock: product?.stock || "",
    image: product?.image || "",
    description: product?.description || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value.trimStart() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      };
      await updateProduct(product._id, payload);
      onClose();
    } catch (err) {
      console.error("Edit product failed:", err);
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4 sm:p-0">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto border border-[var(--border-color)]">
        <h2 className="text-2xl font-bold mb-4 text-center text-[var(--text-primary)]">
          Edit Product
        </h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xl"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Title"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-elevated)] text-[var(--text-primary)] p-2 rounded min-h-20"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[var(--accent-blue)] text-white py-2 rounded hover:bg-[var(--accent-hover)] transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
