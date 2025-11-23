import React from "react";

const CheckoutForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className="space-y-8 bg-white dark:bg-[var(--bg-card)] border border-gray-200 dark:border-[var(--border-color)] rounded-xl p-6 shadow-sm transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-[#1E293B] dark:text-[var(--text-primary)] border-b border-gray-200 dark:border-[var(--border-color)] pb-3">
        Billing Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[
          { label: "Full Name", name: "fullName" },
          { label: "Email", name: "email" },
          { label: "Phone", name: "phone" },
          { label: "Address", name: "address" },
          { label: "City", name: "city" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-[#1E293B] dark:text-[var(--text-secondary)] mb-1.5">
              {field.label}
            </label>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              className="w-full bg-white dark:bg-[var(--bg-elevated)] text-[#1E293B] dark:text-[var(--text-primary)] border border-gray-300 dark:border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-[#1E293B] dark:text-[var(--text-secondary)] mb-1.5">
          Payment Method
        </label>
        <select
          name="paymentMethod"
          value={formData.paymentMethod}
          onChange={handleChange}
          className="w-full bg-white dark:bg-[var(--bg-elevated)] text-[#1E293B] dark:text-[var(--text-primary)] border border-gray-300 dark:border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition"
        >
          <option>Cash on Delivery</option>
          <option>Credit/Debit Card</option>
          <option>Easypaisa / JazzCash</option>
        </select>
      </div>

      {formData.paymentMethod === "Credit/Debit Card" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 animate-fadeIn">
          {[
            { label: "Card Number", name: "cardNumber" },
            { label: "Expiry", name: "expiry" },
            { label: "CVV", name: "cvv" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-[#1E293B] dark:text-[var(--text-secondary)] mb-1.5">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.label}
                className="w-full bg-white dark:bg-[var(--bg-elevated)] text-[#1E293B] dark:text-[var(--text-primary)] border border-gray-300 dark:border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition"
              />
            </div>
          ))}
        </div>
      )}

      {formData.paymentMethod === "Easypaisa / JazzCash" && (
        <div className="animate-fadeIn">
          <label className="block text-sm font-medium text-[#1E293B] dark:text-[var(--text-secondary)] mb-1.5">
            Easypaisa / JazzCash Number
          </label>
          <input
            type="text"
            name="easypaisaNumber"
            value={formData.easypaisaNumber}
            onChange={handleChange}
            placeholder="03XXXXXXXXX"
            className="w-full bg-white dark:bg-[var(--bg-elevated)] text-[#1E293B] dark:text-[var(--text-primary)] border border-gray-300 dark:border-[var(--border-color)] rounded-lg px-4 py-2 focus:ring-2 focus:ring-[var(--accent-blue)] outline-none transition"
          />
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
