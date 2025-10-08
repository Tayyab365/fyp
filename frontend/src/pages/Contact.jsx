import React from "react";

const Contact = () => {
  return (
    <div className="pt-24 min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center mb-12 px-4">
        <h1 className="!text-3xl md:text-5xl font-bold text-gray-800 mb-3">Contact Us</h1>
        <p className="text-gray-600 text-base md:text-md max-w-2xl mx-auto">
          Have questions or feedback? Fill out the form or reach us directly via email or phone.
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 px-4 items-start pb-16">
        <form className="bg-white shadow-lg rounded-2xl p-6 md:p-8 space-y-5">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
          <input
            type="text"
            placeholder="Subject"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"/>
          <textarea
            placeholder="Your Message"
            rows="2"
            className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"></textarea>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="flex flex-col justify-center space-y-6 text-gray-700 px-2">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Get in Touch</h2>
          <p className="flex items-center gap-3 text-base md:text-lg">📧 mtayyab3897@gmail.com</p>
          <p className="flex items-center gap-3 text-base md:text-lg">📞 +92 306 1822394</p>
          <p className="flex items-center gap-3 text-base md:text-lg">📍 123 Main Street, Lahore, Pakistan</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
