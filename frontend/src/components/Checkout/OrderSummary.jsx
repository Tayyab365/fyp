import React, { useContext } from "react";
import { cartContext } from "../../Context/CartContext";
import { calculateCartTotal } from "../../utils/cartUtils";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../../hooks/useOrders";
import toast from "react-hot-toast";

const OrderSummary = ({ formData, setFormData }) => {
  const { cartItems, clearCart } = useContext(cartContext);
  const { placeOrder } = useOrders();
  const { subTotal, shipping, total, tax } = calculateCartTotal(
    cartItems,
    true
  );
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    toast.dismiss();
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city
    ) {
      toast.error("Please fill all the fields");
      return;
    }

    if (cartItems.length === 0) {
      toast.error(
        "Your cart is empty. Please add items before placing an order."
      );
      return;
    }

    const order = {
      userId: localStorage.getItem("userId"),
      customer: formData,
      cartItems,
      orderSummary: { subTotal, shipping, total, tax },
      status: "Pending",
      date: new Date().toLocaleDateString(),
    };

    try {
      await placeOrder(order);
      localStorage.setItem("orderData", JSON.stringify(order));
      clearCart();
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        paymentMethod: "Cash on Delivery",
        cardNumber: "",
        expiry: "",
        cvv: "",
        easypaisaNumber: "",
      });
      navigate("/order-success");
    } catch (err) {
      console.error("Order placement failed", err);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 max-h-[500px] overflow-y-auto">
      <h2 className="text-lg font-semibold text-[#1E293B] border-b border-gray-200 pb-3 mb-5">
        Order Summary
      </h2>

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

      <button
        onClick={handlePlaceOrder}
        className="w-full mt-5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-medium py-2.5 rounded-md transition duration-200"
      >
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
