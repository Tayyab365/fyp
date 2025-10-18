import React from "react";

const OrderModel = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>

        <div className="space-y-2 text-gray-700">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p>
            <strong>Products:</strong> {order.products}
          </p>
          <p>
            <strong>Amount:</strong> {order.amount}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default OrderModel;
