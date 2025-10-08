import React from "react";

const About = () => {
  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Heading */}
      <div className="text-center mb-12 px-4">
        <h1 className="!text-4xl md:text-5xl font-bold text-gray-800 mb-3">About Us</h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          ShopEase is dedicated to providing the best shopping experience for our customers. Learn more about our mission, values, and team below.
        </p>
      </div>

      {/* About Content */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 px-4 items-center mb-16">
        {/* Left Text */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          <p className="text-gray-600 text-base md:text-lg">
            We aim to simplify online shopping by offering a wide range of products at competitive prices with excellent customer service. Our goal is to make shopping convenient, enjoyable, and trustworthy for everyone.
          </p>

          <h2 className="text-3xl font-bold text-gray-800 mt-6">Our Values</h2>
          <p className="text-gray-600 text-base md:text-lg">
            Customer-first approach, quality assurance, integrity in business, and innovation in everything we do. These values guide our daily operations and decision-making.
          </p>
        </div>

        {/* Right Image / Illustration */}
        <div className="flex justify-center">
          <img 
            src="https://images.unsplash.com/photo-1605902711622-cfb43c44311d?auto=format&fit=crop&w=500&q=60" 
            alt="About Illustration" 
            className="rounded-2xl shadow-lg w-full md:w-96"
          />
        </div>
      </div>

      {/* Team / Features Section */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 px-4 pb-16">
        {[
          { title: "Fast Delivery", desc: "Quick and reliable shipping for all orders." },
          { title: "Secure Payment", desc: "Safe and convenient payment methods." },
          { title: "Customer Support", desc: "24/7 support for all your needs." }
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-lg rounded-2xl p-6 text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm md:text-base">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
