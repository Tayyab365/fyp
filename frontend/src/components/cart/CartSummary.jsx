import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { calculateCartTotal } from "../../utils/cartUtils";
import { Link } from "react-router-dom";

const CartSummary = () => {
  const { cartItems } = useContext(cartContext);
  const { subTotal, shipping, total } = calculateCartTotal(cartItems, false);

  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg shadow-md p-4 sticky top-28 transition-colors duration-300">
      <h2 className="text-lg font-bold mb-3 text-[var(--text-primary)]">
        Cart Summary
      </h2>

      <div className="flex justify-between mb-1.5 text-[var(--text-secondary)]">
        <span>Subtotal</span>
        <span>${subTotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-1.5 text-[var(--text-secondary)]">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>

      <div className="flex justify-between font-bold text-lg mb-3 text-[var(--text-primary)]">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className="w-full py-2.5 bg-[var(--accent-blue)] text-white font-semibold rounded-lg 
                   hover:bg-[var(--accent-hover)] transition text-center inline-block"
      >
        Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
