import React, { useState } from "react";
import { useOrders } from "../../../hooks/useOrders";
import OrderDetail from "./OrderDetail";
import { Eye, Trash2 } from "lucide-react";

const Orders = () => {
  const { orders, loading, error, deleteOrder } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  if (loading)
    return <p className="text-gray-600 text-center mt-6">Loading Orders...</p>;

  if (error)
    return (
      <p className="text-red-500 text-sm bg-red-50 border border-red-200 p-3 rounded-lg text-center mt-6">
        {error}
      </p>
    );

  return (
    <div className="bg-gray-50 min-h-screen space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
      </div>

      {/* Orders Section */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        {orders.length === 0 ? (
          <div className="py-12 text-center text-gray-500 italic">
            No orders found
          </div>
        ) : (
          <div className="overflow-x-auto">
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
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="py-3 px-5 font-medium text-gray-800">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="py-3 px-5">
                      {order.customer?.fullName || "Unknown"}
                    </td>

                    <td className="py-3 px-5">
                      {order.cartItems?.length || 0} items
                    </td>

                    <td className="py-3 px-5 font-semibold text-gray-700">
                      ${order.orderSummary?.total?.toFixed(2) || "0.00"}
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
                      {order.status || "Pending"}
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
                        onClick={() => deleteOrder(order._id)}
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
        )}
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetail
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Orders;
