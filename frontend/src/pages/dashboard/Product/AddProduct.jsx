import React, { useState } from "react";
import { useProducts } from "../../../hooks/useProducts";
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
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value.trimStart() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct(form);
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
      console.error("Add product failed:", err);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 px-3 sm:px-0">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative max-h-[90vh] overflow-y-auto border border-[var(--border-color)]">
        <h2 className="text-lg sm:text-2xl font-bold mb-4 text-center">
          Add New Product
        </h2>

        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-xl"
        >
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Title"
            value={form.name ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description ?? ""}
            onChange={handleChange}
            className="w-full border border-[var(--border-color)] bg-[var(--bg-section-dark)] text-[var(--text-primary)] p-2 sm:p-2.5 rounded min-h-20 text-sm sm:text-base placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-blue)]"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[var(--accent-blue)] hover:bg-[var(--accent-hover)] text-white py-2 sm:py-2.5 rounded transition text-sm sm:text-base"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
