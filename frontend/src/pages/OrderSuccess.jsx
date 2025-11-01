import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrder = JSON.parse(localStorage.getItem("orderData"));
    setOrder(savedOrder);
  }, []);

  if (!order) {
    return (
      <div className="min-h-[calc(100vh-70px)] pt-[70px] flex items-center justify-center bg-gray-50 dark:bg-[var(--bg-page)] px-4 transition-colors duration-300">
        <p className="text-gray-500 dark:text-[var(--text-secondary)] text-lg text-center">
          No recent order found.
        </p>
      </div>
    );
  }

  return (
    <div className="pt-[80px] min-h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-[var(--bg-page)] px-4 sm:px-6 md:px-10 overflow-hidden transition-colors duration-300">
      <CheckCircle className="text-green-500 w-16 h-16 sm:w-20 sm:h-20 mb-4 animate-bounce" />

      <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-[#1E293B] dark:text-[var(--text-primary)] mb-2 text-center">
        Thank You for Your Order!
      </h1>

      <p className="text-gray-600 dark:text-[var(--text-secondary)] text-sm sm:text-base text-center max-w-md mb-6">
        Your order has been successfully placed.
      </p>

      <div className="bg-white dark:bg-[var(--bg-card)] rounded-xl shadow-md border border-gray-100 dark:border-[var(--border-color)] p-4 sm:p-6 w-full max-w-md mb-6 transition-colors duration-300">
        <h2 className="text-base sm:text-lg font-semibold text-[#1E293B] dark:text-[var(--text-primary)] mb-3 border-b border-gray-200 dark:border-[var(--border-color)] pb-2">
          Order Details
        </h2>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
            <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
              Name:
            </span>{" "}
            {order.customer.fullName}
          </p>
          <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
            <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
              Contact Number:
            </span>{" "}
            {order.customer.phone}
          </p>
          <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
            <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
              Address:
            </span>{" "}
            {order.customer.address}
          </p>
          <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
            <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
              Total:
            </span>{" "}
            ${order.orderSummary.total.toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
            <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
              Date:
            </span>{" "}
            {order.date}
          </p>

          {order.customer.paymentMethod === "Cash on Delivery" && (
            <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)]">
              <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
                Payment Method:
              </span>{" "}
              Cash on Delivery
            </p>
          )}

          {order.customer.paymentMethod === "Credit/Debit Card" && (
            <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)] break-all">
              <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
                Bank Account Number:
              </span>{" "}
              {order.customer.cardNumber}
            </p>
          )}

          {order.customer.paymentMethod === "Easypaisa / JazzCash" && (
            <p className="text-sm text-gray-600 dark:text-[var(--text-secondary)] break-all">
              <span className="font-medium text-[#1E293B] dark:text-[var(--text-primary)]">
                Easypaisa/Jazzcash Number:
              </span>{" "}
              {order.customer.easypaisaNumber}
            </p>
          )}
        </div>
      </div>

      <button
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium text-sm sm:text-base transition duration-200"
        onClick={() => {
          localStorage.removeItem("orderData");
          navigate("/");
        }}
      >
        Back to Home
      </button>
    </div>
  );
};

export default OrderSuccess;
