import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/products";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
      const data = await res.json();

      const mockOrders = data.products.slice(0, 10).map((item, index) => ({
        id: `#${1000 + index}`,
        customer: `Customer ${index + 1}`,
        products: `${Math.floor(Math.random() * 5) + 1} items`,
        amount: `${(item.price * (Math.floor(Math.random() * 3) + 1)).toFixed(
          2
        )}`,
        status: ["Pending", "Completed", "Cancelled"][
          Math.floor(Math.random() * 3)
        ],
      }));

      setOrders(mockOrders);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    toast.dismiss();
    try {
      // const res = await fetch(`${API_URL}/${id}`, {
      //   method: "DELETE",
      // })
      // if(!res.ok) throw new Error("Failed to delete order");
      setOrders((prev) => prev.filter((o) => o.id !== id));
      toast.success("Order deleted successfully");
    } catch (err) {
      console.log(err);
      setError("Failed to delete order");
      toast.error("Failed to delete order");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return { orders, loading, error, deleteOrder };
}
