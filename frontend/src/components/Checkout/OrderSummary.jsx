import React, { useContext } from "react";
import {cartContext} from "../../Context/CartContext";
import { calculateCartTotal } from "../../utils/cartUtils";


const OrderSummary = () => {
    const { cartItems } = useContext(cartContext);
    const {subTotal, shipping, total, tax} = calculateCartTotal(cartItems,true);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-h-[500px] overflow-y-auto">
      <h2 className="text-lg font-semibold text-[#1E293B] border-b border-gray-200 pb-3 mb-5">
        Order Summary
      </h2>

      {/* <div className="max-h-60 overflow-y-auto space-y-3 mb-5">
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm text-center">No items in cart</p>
      )}
    </div> */}

      <div className="space-y-3 text-[#1E293B] text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span className="font-medium">${subTotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="font-medium">${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span className="font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-base">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <button className="w-full mt-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium py-2.5 rounded-md transition duration-200">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
