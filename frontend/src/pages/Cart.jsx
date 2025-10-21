import React, { useContext } from "react";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { cartContext } from "../Context/CartContext";

const Cart = () => {
  const { cartItems } = useContext(cartContext);
  const isEmpty = cartItems.length === 0;
  return (
    <div className="pt-28 px-4 max-w-7xl mx-auto">
      {isEmpty ? (
        <div className="text-center py-20 text-gray-600">
          <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
          <p className="text-gray-500">
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
  );
};

export default Cart;
