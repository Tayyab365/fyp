import React from "react";

const OrderModel = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3 sm:px-0">
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md relative">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-800 text-center sm:text-left">
          Order Details
        </h2>

        <div className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
          <p>
            <strong>Order ID:</strong> {order.id}
          </p>
          <p>
            <strong>Customer:</strong> {order.customer}
          </p>
          <p className="break-words">
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
          className="absolute top-2 right-3 sm:top-3 text-gray-600 hover:text-black text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default OrderModel;
