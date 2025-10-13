import React, { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrderModel from "./OrderModel";

const Orders = () => {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-600">Orders</h1>

      {loading && <p className="text-gray-500">Loading products...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4">Order ID</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Products</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">{order.products}</td>
                <td className="py-2 px-4">{order.amount}</td>
                <td
                  className={`py-2 px-4 font-medium ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <OrderModel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
