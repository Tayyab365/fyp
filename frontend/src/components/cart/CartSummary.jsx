import React, { useContext, useMemo } from "react";
import { cartContext } from "../../Context/CartContext";
import { calculateCartTotal } from "../../utils/cartUtils";
import { Link } from "react-router-dom";

const CartSummary = () => {

  const { cartItems } = useContext(cartContext);
  const {subTotal, shipping, total} = calculateCartTotal(cartItems, false);


  return (
    <div className="bg-white rounded-lg shadow-md p-4 sticky top-28">
      <h2 className="text-lg font-bold mb-3">Cart Summary</h2>
      <div className="flex justify-between mb-1.5">
        <span>Subtotal</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-1.5">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-lg mb-3">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <Link to="/checkout" className="w-full py-2.5 bg-[#2563EB] text-white font-semibold rounded-lg hover:bg-[#1D4ED8] transition text-center inline-block">
        Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
