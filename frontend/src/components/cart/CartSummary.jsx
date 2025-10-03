import React from "react";

const CartSummary = ({ subtotal, shipping, total }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-28">
      <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
      <div className="flex justify-between mb-1.5">
        <span>Subtotal</span>
        <span>${subtotal}</span>
      </div>
      <div className="flex justify-between mb-1.5">
        <span>Shipping</span>
        <span>${shipping}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-3">
        <span>Total</span>
        <span>${total}</span>
      </div>
      <button className="w-full py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;
