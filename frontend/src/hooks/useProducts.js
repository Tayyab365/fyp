// src/hooks/useProducts.js
import { useEffect, useState } from "react";

const API_URL =
  "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      setProducts([...products, data]);
    } catch (err) {
      console.log(err);
      setError("Failed to add product");
    }
  };

  const updateProduct = async (id, updateProduct) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");
      setProducts(products.map((p) => (p.id === id ? data : p)));
    } catch (err) {
      console.log(err);
      setError("Failed to update product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, deleteProduct, addProduct, updateProduct };
}
