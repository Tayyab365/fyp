import React, { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import toast from 'react-hot-toast';

const EditProduct = ({onClose, product}) => {

    const {updateProduct} = useProducts();
    const [form, setForm] = useState({
        title: product?.title || "",
        price: product?.price || "",
        category: product?.category || "",
        stock: product?.stock || "",
        image: product?.image || "",
        description: product?.description || "",
        title: product?.title || "",
    })
    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            ...form,
            price: Number(form.price),
            stock: Number(form.stock)
        }
        await updateProduct(product.id, payload);
        toast.success("Product Updated successfully")
        onClose();
    }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Edit Product
        </h2>
        <button
        onClick={onClose}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-xl">
          ×
        </button>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="price"
            placeholder="Price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="stock"
            placeholder="Stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded min-h-20"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Edit Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
