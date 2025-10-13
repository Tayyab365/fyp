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
      <div className="min-h-[calc(100vh-70px)] pt-[70px] flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">No recent order found.</p>
      </div>
    );
  }

  return (
    <div className="pt-[80px] min-h-[calc(100vh-70px)] flex flex-col items-center justify-center bg-gray-50 px-4 overflow-hidden">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4 animate-bounce" />

      <h1 className="text-2xl font-semibold text-[#1E293B] mb-2">
        Thank You for Your Order!
      </h1>
      <p className="text-gray-600 text-center max-w-md mb-6">
        Your order has been successfully placed.
      </p>

      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold text-[#1E293B] mb-3 border-b pb-2">
          Order Details
        </h2>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#1E293B]">Name:</span>{" "}
          {order.customer.fullName}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#1E293B]">Contact Number:</span>{" "}
          {order.customer.phone}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#1E293B]">Address:</span>{" "}
          {order.customer.address}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#1E293B]">Total:</span> $
          {order.orderSummary.total.toFixed(2)}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-medium text-[#1E293B]">Date:</span> {order.date}
        </p>

        {order.customer.paymentMethod === "Cash on Delivery" && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#1E293B]">Payment Method:</span>{" "}
            Cash on Delivery
          </p>
        )}

        {order.customer.paymentMethod === "Credit/Debit Card" && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#1E293B]">
              Bank Account Number:
            </span>{" "}
            {order.customer.cardNumber}
          </p>
        )}

        {order.customer.paymentMethod === "Easypaisa / JazzCash" && (
          <p className="text-sm text-gray-600">
            <span className="font-medium text-[#1E293B]">
              Easypaisa/Jazzcash Number:
            </span>{" "}
            {order.customer.easypaisaNumber}
          </p>
        )}
      </div>

      <button
        className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-2 rounded-md font-medium transition duration-200"
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
