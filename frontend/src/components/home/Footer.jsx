import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] ">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-[#1E293B]">Shop<span className="text-[#2563EB]">Ease</span></h2>
          <p className="mt-4 text-[#475569]">
            Your one-stop shop for premium gaming gear and accessories.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-[#2563EB] text-[#475569]">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-[#2563EB] text-[#475569]">Shop</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-[#2563EB] text-[#475569]">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-[#2563EB] text-[#475569]">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#1E293B] mb-4">Follow Us</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-[#2563EB] text-[#475569]">Facebook</a></li>
            <li><a href="#" className="hover:text-[#2563EB] text-[#475569]">Instagram</a></li>
            <li><a href="#" className="hover:text-[#2563EB] text-[#475569]">Twitter</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-[#E2E8F0] text-center py-4 text-[#475569] text-sm">
        © 2025 My Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
