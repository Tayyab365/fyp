import React, { useState } from "react";

const CheckoutForm = () => {
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-semibold text-[#1E293B] border-b border-gray-200 pb-3 mb-5">
        Checkout Information
      </h2>

      <form className="space-y-6 text-sm">
        <div>
          <label className="block text-[#1E293B] font-medium mb-2">Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"/>
        </div>

        <div>
          <label className="block text-[#1E293B] font-medium mb-2">Email Address</label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"/>
        </div>

        <div>
          <label className="block text-[#1E293B] font-medium mb-2">Phone Number</label>
          <input
            type="text"
            placeholder="03XXXXXXXXX"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"/>
        </div>

        <div>
          <label className="block text-[#1E293B] font-medium mb-2">Address</label>
          <input
            type="text"
            placeholder="House no, Street no"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"/>
        </div>

        <div>
          <label className="block text-[#1E293B] font-medium mb-2">City</label>
          <input
            type="text"
            placeholder="Lahore, Karachi, etc."
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"/>
        </div>

        <div>
          <label className="block text-[#1E293B] font-medium mb-2">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none">
            <option>Cash on Delivery</option>
            <option>Credit/Debit Card</option>
            <option>Easypaisa / JazzCash</option>
          </select>
        </div>

        {paymentMethod === "Credit/Debit Card" && (
          <div className="space-y-4 animate-fadeIn">
            <div>
              <label className="block text-[#1E293B] font-medium mb-2">Card Number</label>
              <input
                type="text"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB]"/>
            </div>
            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-[#1E293B] font-medium mb-2">Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB]"/>
              </div>
              <div className="w-1/2">
                <label className="block text-[#1E293B] font-medium mb-2">CVV</label>
                <input
                  type="password"
                  placeholder="123"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB]"/>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "Easypaisa / JazzCash" && (
          <div className="animate-fadeIn">
            <label className="block text-[#1E293B] font-medium mb-2">Account / Mobile Number</label>
            <input
              type="text"
              placeholder="03XXXXXXXXX"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB]"/>
          </div>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
