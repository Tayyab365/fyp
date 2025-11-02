import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const API_URL = `${import.meta.env.VITE_API_URL}/api/products`;

// ✅ Memory cache
let cachedProducts = null;

export function useProducts() {
  const [products, setProducts] = useState(cachedProducts || []);
  const [loading, setLoading] = useState(!cachedProducts);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    // ✅ Stop re-fetching if already cached
    if (cachedProducts) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.products;
      setProducts(list);
      cachedProducts = list; // ✅ store in memory cache
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct) => {
    toast.dismiss();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProduct),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      const updated = [...products, data];
      setProducts(updated);
      cachedProducts = updated; // ✅ update cache
      toast.success("Product added successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to add product");
      toast.error(err.message || "Failed to add product");
    }
  };

  const updateProduct = async (_id, updatedProduct) => {
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedProduct),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      const updated = products.map((p) => (p._id === _id ? data : p));
      setProducts(updated);
      cachedProducts = updated; // ✅ update cache
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update product");
      toast.error(err.message || "Failed to update product");
    }
  };

  const deleteProduct = async (_id) => {
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product");

      const updated = products.filter((p) => p._id !== _id);
      setProducts(updated);
      cachedProducts = updated; // ✅ update cache
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
      toast.error(err.message || "Failed to delete product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
}
