import React from "react";
import { useOrders } from "../../../hooks/useOrders";

const OrderDetail = ({ order, onClose }) => {
  const { updateOrderStatus } = useOrders();
  if (!order) return null;

  const { _id, customer, cartItems, orderSummary, status, createdAt } = order;

  const handleStatusChange = (newStatus) => {
    updateOrderStatus(_id, newStatus);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl p-6 relative max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-xl font-bold">Order #{_id.slice(-6)}</h2>
          <span
            className={`text-sm font-medium ${
              status === "Completed"
                ? "text-green-600"
                : status === "Pending"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {status || "Pending"}
          </span>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Customer Info */}
        <div className="mt-4 border-b pb-3">
          <h3 className="font-semibold mb-2 text-gray-700">Customer Info</h3>
          <div className="grid sm:grid-cols-2 gap-2 text-sm text-gray-600">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {customer?.fullName || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {customer?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {customer?.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium">City:</span>{" "}
              {customer?.city || "N/A"}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium">Address:</span>{" "}
              {customer?.address || "N/A"}
            </p>
          </div>
        </div>

        {/* Products */}
        <div className="mt-4">
          <h3 className="font-semibold mb-2 text-gray-700">Products</h3>
          {cartItems.length > 0 ? (
            <table className="w-full text-sm text-left border">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-2 px-3">Product</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Qty</th>
                  <th className="py-2 px-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">${item.price}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="py-2 px-3 font-medium">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 italic mt-2">
              No products found in this order.
            </p>
          )}
        </div>

        {/* Summary */}
        <div className="mt-4 border-t pt-3 text-sm text-gray-700">
          <p>
            <span className="font-medium">Subtotal:</span> $
            {orderSummary?.subTotal?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium">Shipping:</span> $
            {orderSummary?.shipping?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium">Tax:</span> $
            {orderSummary?.tax?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium">Total:</span> $
            {orderSummary?.total?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium">Date:</span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => handleStatusChange("Completed")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Mark Completed
          </button>
          <button
            onClick={() => handleStatusChange("Cancelled")}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
