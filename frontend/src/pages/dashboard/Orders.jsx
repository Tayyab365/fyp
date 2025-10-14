import React, { useState } from "react";
import { useOrders } from "../../hooks/useOrders";
import OrderModel from "./OrderModel";
import { Eye, Trash2 } from "lucide-react";

const Orders = () => {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading) return <p className="text-gray-600">Loading Orders...</p>;
  if (error)
    return (
      <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-2 rounded-lg">
        {error}
      </p>
    );

  return (
    <div className=" bg-gray-50 min-h-screen space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      </div>
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md border border-gray-200">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold tracking-wider">
            <tr>
              <th className="py-3 px-5">Order ID</th>
              <th className="py-3 px-5">Customer</th>
              <th className="py-3 px-5">Products</th>
              <th className="py-3 px-5">Amount</th>
              <th className="py-3 px-5">Status</th>
              <th className="py-3 px-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="py-3 px-5 font-medium text-gray-800">
                  {order.id}
                </td>
                <td className="py-3 px-5">{order.customer}</td>
                <td className="py-3 px-5">{order.products}</td>
                <td className="py-3 px-5 font-semibold text-gray-700">
                  ${order.amount}
                </td>
                <td
                  className={`py-3 px-5 font-semibold ${
                    order.status === "Completed"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {order.status}
                </td>
                <td className="py-3 px-5 flex justify-center gap-3">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    title="View Order"
                    className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 active:scale-95 shadow-sm transition"
                  >
                    <Eye size={15} />
                    <span>View</span>
                  </button>

                  <button
                    onClick={() => deleteOrder(order.id)}
                    title="Delete Order"
                    className="flex items-center gap-1 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 active:scale-95 shadow-sm transition"
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
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
