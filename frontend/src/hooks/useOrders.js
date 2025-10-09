import { useEffect, useState } from "react";

export function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        // Abhi mock data ke liye products API use kar rahe hain
        const res = await fetch("https://67ff575158f18d7209f0cc07.mockapi.io/gamingstore/products");
        if (!res.ok) throw new Error(`Failed to fetch orders: ${res.status}`);
        const data = await res.json();

        // Mock transformation: product ko order bana do
        const mockOrders = data.slice(0, 10).map((item, index) => ({
          id: `#${1000 + index}`,
          customer: `Customer ${index + 1}`,
          products: `${Math.floor(Math.random() * 5) + 1} items`,
          amount: `$${(item.price * (Math.floor(Math.random() * 3) + 1)).toFixed(2)}`,
          status: ["Pending", "Completed", "Cancelled"][Math.floor(Math.random() * 3)],
        }));

        setOrders(mockOrders);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loading, error };
}
