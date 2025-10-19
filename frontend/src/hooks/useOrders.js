import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5000/api/orders";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch All Orders
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Place New Order
  const placeOrder = async (order) => {
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });

      const data = await res.json();
      if (!res.ok || !data.success)
        throw new Error(data.message || "Failed to place order");

      setOrders((prev) => [data.order, ...prev]);
      toast.success("Order placed successfully!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete Order
  const deleteOrder = async (_id) => {
    toast.dismiss();
    try {
      const res = await fetch(`${API_URL}/${_id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete order");

      setOrders((prev) => prev.filter((o) => o._id !== _id));
      toast.success("Order deleted successfully");
    } catch (err) {
      console.log(err);
      setError("Failed to delete order");
      toast.error("Failed to delete order");
    }
  };

  // ✅ Update Order Status (for Mark Completed / Cancel)
  const updateOrderStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        toast.success(data.message || `Order marked as ${status}`);
        setOrders((prev) =>
          prev.map((o) => (o._id === id ? { ...o, status } : o))
        );
      } else {
        toast.error(data.message || "Failed to update status");
      }
    } catch (err) {
      toast.error("Error updating order status");
      console.error(err);
    }
  };

  const fetchUserOrdersCount = async () => {
    try {
      const res = await fetch(`${API_URL}/user-orders-count`);
      const data = await res.json();

      if (res.ok && data.success) {
        return data.data; // [{ _id: userId, totalOrders: number }]
      } else {
        toast.error("Failed to fetch user order counts");
        return [];
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching user order counts");
      return [];
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
    loading,
    error,
    deleteOrder,
    placeOrder,
    updateOrderStatus,
    fetchUserOrdersCount,
  };
}
