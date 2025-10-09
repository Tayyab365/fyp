// src/hooks/useProducts.js
import { useEffect, useState } from "react";

const API_URL = "https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products
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

  // DELETE product function
  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts(products.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      setError("Failed to delete product");
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  return { products, loading, error, deleteProduct };
}
