// src/components/Testimonials.jsx
import React from "react";

const testimonials = [
  {
    id: 1,
    name: "Ali Raza",
    review: "The build quality is excellent, feels premium and well-made.",
    rating: 5,
  },
  {
    id: 2,
    name: "Hamza Khan",
    review: "Great design and finishing, everything looks and feels authentic.",
    rating: 4,
  },
  {
    id: 3,
    name: "Usman Ahmed",
    review: "Very durable and reliable products, truly worth the price.",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-[#F8FAFC] py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] mb-10">
          What Our Customers Say
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1"
            >
              <div className="flex justify-center mb-3 text-yellow-500 text-lg">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}
              </div>

              <p className="text-gray-600 text-sm md:text-base italic mb-4">
                "{item.review}"
              </p>

              <h3 className="font-semibold text-[#1E293B] text-sm md:text-base">
                {item.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
