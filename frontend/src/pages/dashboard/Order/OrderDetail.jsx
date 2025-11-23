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
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-2 sm:px-4">
      <div className="bg-[var(--bg-card)] text-[var(--text-primary)] rounded-2xl shadow-lg w-full max-w-3xl p-4 sm:p-6 relative max-h-[90vh] overflow-y-auto border border-[var(--border-color)]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[var(--border-color)] pb-3 gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--text-primary)]">
            Order #{_id.slice(-6)}
          </h2>
          <span
            className={`text-sm font-medium ${
              status === "Completed"
                ? "text-green-400"
                : status === "Pending"
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {status || "Pending"}
          </span>
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-[var(--text-muted)] hover:text-[var(--text-secondary)] text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="mt-4 border-b border-[var(--border-color)] pb-3">
          <h3 className="font-semibold mb-2 text-[var(--text-secondary)] text-sm sm:text-base">
            Customer Info
          </h3>
          <div className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-[var(--text-muted)]">
            <p>
              <span className="font-medium text-[var(--text-primary)]">
                Name:
              </span>{" "}
              {customer?.fullName || "N/A"}
            </p>
            <p>
              <span className="font-medium text-[var(--text-primary)]">
                Email:
              </span>{" "}
              {customer?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-[var(--text-primary)]">
                Phone:
              </span>{" "}
              {customer?.phone || "N/A"}
            </p>
            <p>
              <span className="font-medium text-[var(--text-primary)]">
                City:
              </span>{" "}
              {customer?.city || "N/A"}
            </p>
            <p className="sm:col-span-2">
              <span className="font-medium text-[var(--text-primary)]">
                Address:
              </span>{" "}
              {customer?.address || "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <h3 className="font-semibold mb-2 text-[var(--text-secondary)] text-sm sm:text-base">
            Products
          </h3>
          {cartItems.length > 0 ? (
            <table className="w-full text-xs sm:text-sm text-left border border-[var(--border-color)] min-w-[500px] sm:min-w-0">
              <thead className="bg-[var(--bg-section-dark)] text-[var(--text-secondary)]">
                <tr>
                  <th className="py-2 px-3">Product</th>
                  <th className="py-2 px-3">Price</th>
                  <th className="py-2 px-3">Qty</th>
                  <th className="py-2 px-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-[var(--border-color)] hover:bg-[var(--bg-elevated)] transition"
                  >
                    <td className="py-2 px-3 text-[var(--text-secondary)]">
                      {item.name}
                    </td>
                    <td className="py-2 px-3">${item.price}</td>
                    <td className="py-2 px-3">{item.quantity}</td>
                    <td className="py-2 px-3 font-medium text-[var(--text-primary)]">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-[var(--text-muted)] italic mt-2">
              No products found in this order.
            </p>
          )}
        </div>

        <div className="mt-4 border-t border-[var(--border-color)] pt-3 text-xs sm:text-sm text-[var(--text-secondary)]">
          <p>
            <span className="font-medium text-[var(--text-primary)]">
              Subtotal:
            </span>{" "}
            ${orderSummary?.subTotal?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium text-[var(--text-primary)]">
              Shipping:
            </span>{" "}
            ${orderSummary?.shipping?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium text-[var(--text-primary)]">Tax:</span>{" "}
            ${orderSummary?.tax?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium text-[var(--text-primary)]">
              Total:
            </span>{" "}
            ${orderSummary?.total?.toFixed(2) || "0.00"}
          </p>
          <p>
            <span className="font-medium text-[var(--text-primary)]">
              Date:
            </span>{" "}
            {new Date(createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap justify-end gap-2 sm:gap-3">
          <button
            onClick={() => handleStatusChange("Completed")}
            className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 text-xs sm:text-sm"
          >
            Mark Completed
          </button>
          <button
            onClick={() => handleStatusChange("Cancelled")}
            className="bg-red-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-700 text-xs sm:text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="bg-[var(--bg-elevated)] text-[var(--text-secondary)] px-3 sm:px-4 py-2 rounded-lg hover:bg-[var(--bg-section-dark)] text-xs sm:text-sm border border-[var(--border-color)]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
