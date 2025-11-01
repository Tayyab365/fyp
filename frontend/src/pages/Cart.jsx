import React, { useContext } from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { cartContext } from "../Context/CartContext";

const Cart = () => {
  const { cartItems } = useContext(cartContext);
  const isEmpty = cartItems.length === 0;

  return (
    <div className="min-h-screen w-full pt-28 px-4 bg-[var(--bg-page)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {isEmpty ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-2 text-[var(--text-primary)]">
              Your Cart is Empty
            </h2>
            <p className="text-[var(--text-secondary)]">
              Add some products in your cart to continue shopping!
            </p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:gap-6">
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="md:w-80 flex-shrink-0">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
