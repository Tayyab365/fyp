// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#EFF6FF] to-[#DBEAFE]">
      <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side */}

        <div className="md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[#1E293B]">
            Build Your <span className="text-[#2563EB]">Ultimate </span>
            Gaming Setup
          </h1>
          <p className="text-lg text-[#475569] max-w-lg mx-auto md:mx-0">
            High performance gaming laptops, RGB mechanical keyboards, precision mice and pro headsets. 
            Everything a gamer needs, in one store.
          </p>
          <div className="flex justify-center md:justify-start gap-4 pt-4">
            <Link
              to="/shop"
              className="bg-[#2563EB] hover:bg-[#1D4ED8] px-6 py-3 rounded-lg font-semibold text-white shadow-md transition"
            >
              Shop Now
            </Link>
            <Link
              to="/contact"
              className="bg-white border border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white px-6 py-3 rounded-lg font-semibold shadow-sm transition"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://dummyimage.com/600x400/F8FAFC/2563EB&text=Gaming+Laptop+%2B+Gear"
            alt="Gaming Gear"
            className="rounded-lg shadow-xl border border-[#E2E8F0]"
          />
        </div>

      </div>
    </section>
  );
};

export default Hero;
