import React, { useState } from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";

const Checkout = () => {
  const [formData, setFormData] = useState({
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
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 flex justify-center">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-8">
        <div className="md:col-span-2">
          <CheckoutForm formData={formData} setFormData={setFormData} />
        </div>

        <div className="md:col-span-1 md:w-80 flex-shrink-0">
          <div className="sticky top-20">
            <OrderSummary formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
